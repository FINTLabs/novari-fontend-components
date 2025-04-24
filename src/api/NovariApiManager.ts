// import { Logger, defaultLogger } from '../utils/logger';

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
}

export interface ApiResponse<T> {
  success: boolean;
  message: string;
  variant: 'success' | 'error' | 'warning';
  data?: T;
  status?: number;
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
    body,
    contentType = 'application/json',
    functionName,
    additionalHeaders = {},
  }: ApiCallOptions): Promise<ApiResponse<T>> {
    const url = `${this.config.baseUrl}${endpoint}`;
    const headers: Record<string, string> = {
      'Content-Type': contentType,
      ...this.config.defaultHeaders,
      ...additionalHeaders,
    };

    const requestOptions: RequestInit = {
      method,
      headers,
    };

    if (body && method !== 'GET') {
      requestOptions.body = typeof body === 'string' ? body : JSON.stringify(body);
    }

    // this.logger.info(`${method} API URL: ${url}`);
    console.log(`${method} API URL: ${url}`);

    try {
      const response = await fetch(url, requestOptions);
      // this.logger.info(`API Response ${functionName}: ${response.status}`);

      if (!response.ok) {
        const errorMessage = await response.text();
        // this.logger.error(`Request body: ${requestOptions.body}`);
        // this.logger.error(`Response from ${functionName}: ${errorMessage}`);
        console.error(`Request body: ${requestOptions.body}`);
        console.error(`Response from ${functionName}: ${errorMessage}`);
        
        return {
          success: false,
          message: errorMessage,
          variant: 'error',
          status: response.status,
        };
      }

      let data: T | undefined;
      if (response.status !== 204) {
        const contentType = response.headers.get('Content-Type');
        try {
          if (contentType?.includes('application/json')) {
            data = await response.json();
          } else if (contentType?.includes('text/plain')) {
            const text = await response.text();
            data = text as unknown as T;
          }
        } catch (err) {
          // this.logger.warn(`Response parsing error for ${functionName}`);
          console.warn(`Response parsing error for ${functionName}`);
        }
      }

      return {
        success: true,
        message: response.statusText,
        variant: 'success',
        data,
        status: response.status,
      };
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Unknown error occurred';
      // this.logger.error('API call error:', errorMessage);
      console.error('API call error:', errorMessage);
      
      return {
        success: false,
        message: errorMessage,
        variant: 'error',
        status: 500,
      };
    }
  }
}