import { logger } from '../utils/NovariLogger';

export type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE';

export interface NovariApiConfig {
  baseUrl: string;
  defaultHeaders?: Record<string, string>;
  // logger?: Logger;
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
    // this.logger = config.logger || defaultLogger;
  }

  async call<T>({
    method,
    endpoint,
    body,          // New body parameter
    contentType = 'application/json',
    functionName,
    additionalHeaders = {},
    customErrorMessage,
    customSuccessMessage,
  }: ApiCallOptions): Promise<ApiResponse<T>> {
    const url = `${this.config.baseUrl}${endpoint}`;

    // Replace console.log with logger
    logger.debug('Full URL:', url);
    logger.debug('Headers being sent:', {
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

    logger.info(`${method} API URL: ${url}`);
    if (requestBody) {
      logger.crazy('Request body:', requestBody);
    }

    try {
      const response = await fetch(url, requestOptions);

      if (!response.ok) {
        const errorMessage = await response.text();
        logger.info(`Request body:`, requestBody);
        logger.info(`Response from ${functionName}: ${errorMessage}`);
        
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
          logger.debug(`Response parsing error for ${functionName}:`, err);
        }
      }

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
      logger.info('API call error:', errorMessage);
      
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