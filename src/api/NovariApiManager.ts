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
  message?: any;
  contentType?: string;
  functionName?: string;
  additionalHeaders?: Record<string, string>;
  customErrorMessage?: string;
  customSuccessMessage?: string;
}

export interface ApiResponse<T> {
  success: boolean;
  body: string;
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
    message,
    contentType = 'application/json',
    functionName,
    additionalHeaders = {},
    customErrorMessage,
    customSuccessMessage,
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

    if (message && method !== 'GET') {
      requestOptions.body = typeof message === 'string' ? message : JSON.stringify(message);
    }

    console.log(`${method} API URL: ${url}`);

    try {
      const response = await fetch(url, requestOptions);

      if (!response.ok) {
        const errorMessage = await response.text();
        console.error(`Request body: ${requestOptions.body}`);
        console.error(`Response from ${functionName}: ${errorMessage}`);
        
        return {
          success: false,
          body: customErrorMessage || errorMessage,
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
          console.warn(`Response parsing error for ${functionName}`);
        }
      }

      return {
        success: true,
        body: customSuccessMessage || response.statusText,
        variant: 'success',
        data,
        status: response.status,
      };
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Unknown error occurred';
      console.error('API call error:', errorMessage);
      
      return {
        success: false,
        body: customErrorMessage || errorMessage,
        variant: 'error',
        status: 500,
      };
    }
  }
}