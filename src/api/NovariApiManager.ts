import { Logger, LogLevel } from './logger';

export interface NovariApiConfig {
    baseUrl: string;
    defaultHeaders?: Record<string, string>;
    logLevel?: LogLevel | 'info';
}

export type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';

export interface NovariApiConfig {
    baseUrl: string;
    defaultHeaders?: Record<string, string>;
    logLevel?: LogLevel | 'info';
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
    customSuccessVariant?: 'success' | 'error' | 'warning' | 'info';
}

export interface ApiResponse<T> {
    success: boolean;
    message: string;
    variant: 'success' | 'error' | 'warning' | 'info';
    data?: T;
    status?: number;
    body?: any; // Add body to include the request payload in the response
}

export class NovariApiManager {
    private config: NovariApiConfig;
    private logger: Logger;

    constructor(config: NovariApiConfig) {
        this.config = config;
        const level = config.logLevel ?? 'info';
        this.logger = new Logger({ level: level as LogLevel });
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
        customSuccessVariant = 'success',
    }: ApiCallOptions): Promise<ApiResponse<T>> {
        const url = `${this.config.baseUrl}${endpoint}`;

        this.logger.info('Starting function:', functionName);
        this.logger.debug('Headers being sent:', {
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
            requestOptions.body =
                typeof requestBody === 'string' ? requestBody : JSON.stringify(requestBody);
        }

        this.logger.info(`${method} API URL: ${url}`);
        if (requestBody) {
            this.logger.debug('Request body:', requestBody);
        }

        try {
            const response = await fetch(url, requestOptions);

            if (!response.ok) {
                const errorMessage = await response.text();
                this.logger.error(`Response from ${functionName}: ${errorMessage}`);

                return {
                    success: false,
                    message: customErrorMessage || errorMessage,
                    variant: 'error',
                    status: response.status,
                    body: requestBody, // Include the request body in the response
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
                                data = undefined;
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
                    this.logger.error(`Response parsing error for ${functionName}:`, err);
                }
            }
            this.logger.info(`${method} Finished with success: ${functionName}:${response.status}`);
            return {
                success: true,
                message: customSuccessMessage || responseMessage || response.statusText,
                variant: customSuccessVariant || 'success',
                data,
                status: response.status,
                body: response.body || requestBody, // Include the request body in the response
            };
        } catch (err) {
            const errorMessage = err instanceof Error ? err.message : 'Unknown error occurred';
            this.logger.error('API call error:', errorMessage);

            return {
                success: false,
                message: customErrorMessage || errorMessage,
                variant: 'error',
                status: 500,
                body: requestBody, // Include the request body in the response
            };
        }
    }
}
