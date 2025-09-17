import type { Meta, StoryObj } from '@storybook/react';
import React, { useState } from 'react';
import { Button } from '@navikt/ds-react';
import { NovariApiManager } from '../api/NovariApiManager.ts';

// Example interfaces for documentation
// interface IContact {
//   id: string;
//   name: string;
//   email: string;
// }
//
// interface IUser {
//   id: number;
//   username: string;
//   email: string;
// }

/**
 * The NovariApiManager provides a standardized way to make API calls with consistent error handling and response formatting.
 *
 * @example
 * ```typescript
 * // Initialize the API manager
 * const apiManager = new NovariApiManager({
 *   baseUrl: 'https://api.example.com',
 *   defaultHeaders: {
 *     "x-nin": "10137329263",
 *     "Authorization": "Bearer your-token"
 *   },
 * });
 *
 * // GET request with type safety
 * const response = await apiManager.call<IContact>({
 *   method: "GET",
 *   endpoint: "contacts",
 *   functionName: "getContacts",
 *   customErrorMessage: "Failed to get contacts",
 *   customSuccessMessage: "Successfully got contacts",
 * });
 *
 * // POST request with body and message
 * const createResponse = await apiManager.call<IUser>({
 *   method: "POST",
 *   endpoint: "users",
 *   body: {
 *     username: "john.doe",
 *     email: "john@example.com"
 *   },
 *   message: "Creating new user account",
 *   functionName: "createUser",
 *   customErrorMessage: "Failed to create user",
 *   customSuccessMessage: "User created successfully",
 * });
 * ```
 */

// Update the interface to mark required props
interface ApiDemoProps {
    /** Base URL for the API @required */
    baseUrl: string;
    /** API endpoint path @required */
    endpoint: string;
    /** HTTP method @required */
    method: 'GET' | 'POST' | 'PUT' | 'DELETE';
    /** Request body (for POST/PUT) */
    body?: unknown;
    /** Message to override response message */
    message?: string;
    /** Custom error message to override default */
    customErrorMessage?: string;
    /** Custom success message to override default */
    customSuccessMessage?: string;
}

// Example component to demonstrate API usage
const ApiDemo: React.FC<ApiDemoProps> = ({
    baseUrl,
    endpoint,
    method,
    body,
    // message,
    customErrorMessage,
    customSuccessMessage,
}) => {
    const [result, setResult] = useState<string>('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const api = new NovariApiManager({ baseUrl });

    const handleApiCall = async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await api.call({
                method,
                endpoint,
                body,
                // message,
                functionName: 'storybook-demo',
                customErrorMessage,
                customSuccessMessage,
            });
            setResult(JSON.stringify(response, null, 2));
        } catch (err) {
            setError(err instanceof Error ? err.message : 'An error occurred');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{ padding: '20px' }}>
            <div style={{ marginBottom: '20px' }}>
                <strong>Configuration:</strong>
                <pre
                    style={{
                        marginTop: '8px',
                        background: '#f5f5f5',
                        padding: '12px',
                        borderRadius: '4px',
                    }}>
                    {`const api = new NovariApiManager({ 
  baseUrl: '${baseUrl}'
});

const response = await api.call<IUser>({
  method: "${method}",
  endpoint: "${endpoint}",
  functionName: "getUsers",
  customErrorMessage: "${customErrorMessage || 'Get users failed'}", 
  customSuccessMessage: "${customSuccessMessage || 'Get users successful'}"
});`}
                </pre>
            </div>
            <Button
                variant="primary"
                loading={loading}
                onClick={handleApiCall}
                style={{ marginBottom: '16px' }}>
                {loading ? 'Loading...' : 'Make API Call'}
            </Button>
            {error && <div style={{ color: 'red', marginBottom: '16px' }}>Error: {error}</div>}
            {result && (
                <div>
                    <strong>Response:</strong>
                    <pre
                        style={{
                            background: '#f5f5f5',
                            padding: '16px',
                            borderRadius: '4px',
                            overflow: 'auto',
                        }}>
                        {result}
                    </pre>
                </div>
            )}
        </div>
    );
};

const meta = {
    title: 'Utils/NovariApiManager',
    component: ApiDemo,

    parameters: {
        layout: 'centered',
        docs: {
            canvas: {
                // This will remove the "show code" button
                // https://storybook.js.org/docs/api/doc-blocks/doc-block-canvas#sourcestate
                sourceState: 'none',
            },

            description: {
                component: `
### Usage Examples

1. GET Request with Data:

\`\`\`typescript
const response = new NovariApiManager({ 
  baseUrl: 'https://api.example.com', 
  defaultHeaders: { "x-nin": "9999999999" } 
});

const response = await apiManager.call<IUser>({
  method: "GET",
  endpoint: "users/list",
  functionName: "getUsers",
  customErrorMessage: "Get users failed", // Optional
  customSuccessMessage: "Get users successfull", // Optional
});

// Response Success:
{
  "success": true,
  "message": "Get users successful",
  "variant": "success",
  "status": 200
  "data": [
    {
      "id": 1,
      "name": "John Doe",
      "email": "john@example.com"
    },
    {
      "id": 1,
      "name": "John Doe",
      "email": "john@example.com"
    }
  ],
}

// Response Error:
{
  "success": false,
  "message": "Get users failed",
  "variant": "error",
  "status": 200
}
\`\`\`

2. POST Request with Body and Message:

\`\`\`typescript
const response = new NovariApiManager({ 
  baseUrl: 'https://api.example.com', 
  defaultHeaders: { "x-nin": "9999999999" } 
});

const response = await apiManager.call({
  method: "POST",
  endpoint: "users/create",
  functionName: "createUser",
  customErrorMessage: "Create user failed",
  customSuccessMessage: "Create user successful",
  body:
    {
      "id": 1,
      "name": "John Doe",
      "email": "john@example.com"
    }
});

// Response Success:
{
  "success": true,
  "message": "Create user successful",
  "variant": "success",
  "status": 200
}

// Response Error:
{
  "success": false,
  "message": "Create user failed",
  "variant": "error",
  "status": 500
}
\`\`\`


        `,
            },
        },
    },
    tags: ['autodocs'],
    argTypes: {
        baseUrl: {
            control: 'text',
            description: 'Base URL for the API',
        },
        endpoint: {
            control: 'text',
            description: 'API endpoint path',
        },
        method: {
            control: 'select',
            options: ['GET', 'POST', 'PUT', 'DELETE'],
            description: 'HTTP method',
        },
        body: {
            control: 'object',
            description: 'Request body (for POST/PUT)',
        },
        message: {
            control: 'text',
            description: 'Message to override response message',
        },
        customErrorMessage: {
            control: 'text',
            description: 'Custom error message to override default',
        },
        customSuccessMessage: {
            control: 'text',
            description: 'Custom success message to override default',
        },
    },
} satisfies Meta<typeof ApiDemo>;

export default meta;
type Story = StoryObj<typeof meta>;

// GET example
export const GetExample: Story = {
    args: {
        baseUrl: 'https://jsonplaceholder.typicode.com',
        endpoint: '/todos/1',
        method: 'GET',
        customSuccessMessage: 'Successfully retrieved todo',
        customErrorMessage: 'Failed to get todo',
    },
};

// POST example with both body and message
export const PostExample: Story = {
    args: {
        baseUrl: 'https://jsonplaceholder.typicode.com',
        endpoint: '/posts',
        method: 'POST',
        body: {
            title: 'foo',
            body: 'bar',
            userId: 1,
        },
        message: 'Custom message for the response',
        customSuccessMessage: 'Post created successfully',
        customErrorMessage: 'Failed to create post',
    },
};

// PUT example
export const PutExample: Story = {
    args: {
        baseUrl: 'https://jsonplaceholder.typicode.com',
        endpoint: '/posts/1',
        method: 'PUT',
        body: {
            id: 1,
            title: 'Updated title',
            body: 'Updated content',
            userId: 1,
        },
        customSuccessMessage: 'Post updated successfully',
        customErrorMessage: 'Failed to update post',
    },
};

// DELETE example
export const DeleteExample: Story = {
    args: {
        baseUrl: 'https://jsonplaceholder.typicode.com',
        endpoint: '/posts/1',
        method: 'DELETE',
        customSuccessMessage: 'Post deleted successfully',
        customErrorMessage: 'Failed to delete post',
    },
};
