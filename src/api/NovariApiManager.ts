
const colors = {
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  brown: '\x1b[38;5;136m',
  reset: '\x1b[0m'
};

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

    console.log(`${colors.green}[${new Date().toISOString()}] Starting function:${colors.reset}`, functionName);
    console.log(`${colors.brown}[${new Date().toISOString()}] Headers being sent:${colors.reset}`, {
      'Content-Type': contentType,
      ...this.config.defaultHeaders,
      ...additionalHeaders,
    });

    //TODO: Create levels of log lines based on environment
    // const isDevelopment = import.meta.env.DEV;
    // console.log(`${colors.brown}[${new Date().toISOString()}] DEV ENV:${colors.reset}`, isDevelopment);

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

    // logger.info(`${method} API URL: ${url}`);
    console.log(`${colors.brown}[${new Date().toISOString()}] ${method} API URL: ${colors.reset}${url}`);
    if (requestBody) {
      console.log(`${colors.brown}[${new Date().toISOString()}] Request body:${colors.reset}`, requestBody);
    }

    try {
      const response = await fetch(url, requestOptions);

      if (!response.ok) {
        const errorMessage = await response.text();
        console.log(`${colors.red}[${new Date().toISOString()}] [ERROR] Response from ${functionName}: ${errorMessage}${colors.reset}`);
        
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
          console.log(`${colors.red}[${new Date().toISOString()}] [ERROR] Response parsing error for ${functionName}:${colors.reset}`, err);
        }
      }
      console.log(`${colors.green}[${new Date().toISOString()}] ${method} Finished with success: ${colors.reset}${functionName}`);
      return {
        success: true,
        message: customSuccessMessage || responseMessage || response.statusText,
        variant: 'success',
        data,
        status: response.status,
        body:  response.body || requestBody,  // Include the request body in the response
      };
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Unknown error occurred';
      console.log(`${colors.red}[${new Date().toISOString()}] [ERROR] API call error: ${errorMessage}${colors.reset}`);
      
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