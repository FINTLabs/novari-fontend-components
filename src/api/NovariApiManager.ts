
const colors = {
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  brown: '\x1b[38;5;136m',
  reset: '\x1b[0m'
};


// Log level colors mapping
const levelColors = {
  error: colors.red,
  warn: colors.yellow,
  info: colors.green,
  debug: colors.brown
};

type LogLevel = 'error' | 'warn' | 'info' | 'debug';
const levelSeverity: Record<LogLevel, number> = {
  error: 0,
  warn:  1,
  info:  2,
  debug: 3,
};


const CURRENT_LOG_LEVEL: LogLevel = typeof import.meta !== 'undefined' ?
    (import.meta.env.LOG_LEVEL as LogLevel):'info';

// helper: should I log this level?
function shouldLog(level: LogLevel): boolean {
  return levelSeverity[level] <= levelSeverity[CURRENT_LOG_LEVEL];
}

// Helper function to write formatted log lines
function writeLogLine(level: 'error' | 'warn' | 'info' | 'debug', message: string, ...args: any[]): void {
  if (!shouldLog(level)) return;
  const timestamp = new Date().toISOString();
  const color = levelColors[level] || colors.blue;
  console.log(`[${timestamp}] ${color}${level}:${colors.reset}`, message, ...args);
}

export type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE';

export interface NovariApiConfig {
  baseUrl: string;
  defaultHeaders?: Record<string, string>;
}

export interface ApiCallOptions {
  method: HttpMethod;
  endpoint: string;
  body?: any;
  contentType?: string;
  functionName?: string;
  additionalHeaders?: Record<string, string>;
  customErrorMessage?: string;
  customSuccessMessage?: string;
}

export interface ApiResponse<T> {
  success: boolean;
  message: string;
  variant: 'success' | 'error' | 'warning';
  data?: T;
  status?: number;
  body?: any;  // Add body to include the request payload in the response
}

export class NovariApiManager {
  private config: NovariApiConfig;
  // private logger: Logger;

  constructor(config: NovariApiConfig) {
    this.config = config;
  }

  async call<T>({
    method,
    endpoint,
    body,
    contentType = 'application/json',
    functionName,
    additionalHeaders = {},
    customErrorMessage,
    customSuccessMessage,
  }: ApiCallOptions): Promise<ApiResponse<T>> {
    const url = `${this.config.baseUrl}${endpoint}`;

    writeLogLine('info', 'Starting function:', functionName);
    writeLogLine('debug', 'Headers being sent:', {
      'Content-Type': contentType,
      ...this.config.defaultHeaders,
      ...additionalHeaders,
    });



    const headers: Record<string, string> = {
      'Content-Type': contentType,
      ...this.config.defaultHeaders,
      ...additionalHeaders,
    };

    const requestOptions: RequestInit = {
      method,
      headers,
    };

    // Use body for the request payload, fallback to message for backward compatibility
    const requestBody = body;
    if (requestBody && method !== 'GET') {
      requestOptions.body = typeof requestBody === 'string' 
        ? requestBody 
        : JSON.stringify(requestBody);
    }

    writeLogLine('info', `${method} API URL: ${url}`);
    if (requestBody) {
      writeLogLine('debug', 'Request body:', requestBody);
    }

    try {
      const response = await fetch(url, requestOptions);

      if (!response.ok) {
        const errorMessage = await response.text();
        writeLogLine('error', `Response from ${functionName}: ${errorMessage}`);
        
        return {
          success: false,
          message: customErrorMessage || errorMessage,
          variant: 'error',
          status: response.status,
          body: requestBody,  // Include the request body in the response
        };
      }

      let data: T | undefined;
      let responseMessage: string = '';

      if (response.status !== 204) {
        const contentType = response.headers.get('Content-Type');
        try {
          if (contentType?.includes('application/json')) {
            const jsonResponse = await response.json();
            // Check if the response has a message property
            if (jsonResponse?.message) {
              responseMessage = jsonResponse.message;
              // If the response has both message and data properties
              if (jsonResponse?.data) {
                data = jsonResponse.data;
              } else {
                data = undefined
              }
            } else {
              // If no message property, use the whole response as data
              data = jsonResponse as T;
            }
          } else if (contentType?.includes('text/plain')) {
            responseMessage = await response.text();
            data = responseMessage as unknown as T;
          }
        } catch (err) {
          writeLogLine('error', `Response parsing error for ${functionName}:`, err);
        }
      }
      writeLogLine('info', `${method} Finished with success: ${functionName}:${response.status}`);
      return {
        success: true,
        message: customSuccessMessage || responseMessage || response.statusText,
        variant: 'success',
        data,
        status: response.status,
        body: response.body || requestBody,  // Include the request body in the response
      };
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Unknown error occurred';
      writeLogLine('error', 'API call error:', errorMessage);
      
      return {
        success: false,
        message: customErrorMessage || errorMessage,
        variant: 'error',
        status: 500,
        body: requestBody,  // Include the request body in the response
      };
    }
  }
}