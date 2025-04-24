import type { Meta, StoryObj } from '@storybook/react';
import React, { useState } from 'react';
import { NovariApiManager } from '../api/NovariApiManager.ts';

// Update the interface to mark required props
interface ApiDemoProps {
  /** Base URL for the API @required */
  baseUrl: string;
  /** API endpoint path @required */
  endpoint: string;
  /** HTTP method @required */
  method: 'GET' | 'POST' | 'PUT' | 'DELETE';
  /** Request body (for POST/PUT) */
  body?: any;
  /** Custom error message to override default */
  customErrorMessage?: string;
  /** Custom success message to override default */
  customSuccessMessage?: string;
}

// Example component to demonstrate API usage
const ApiDemo: React.FC<ApiDemoProps> = ({ baseUrl, endpoint, method, body, customErrorMessage, customSuccessMessage }) => {
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
        message: body,
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
    <div style={{ fontFamily: 'monospace' }}>
      <div style={{ marginBottom: '1rem' }}>
        <button 
          onClick={handleApiCall}
          disabled={loading}
          style={{ padding: '0.5rem 1rem', marginRight: '1rem' }}
        >
          {loading ? 'Loading...' : 'Make API Call'}
        </button>
        <span>{`${method} ${baseUrl}${endpoint}`}</span>
      </div>

      <div style={{ marginBottom: '1rem' }}>
        <strong>Code Example:</strong>
        <pre style={{ background: '#f5f5f5', padding: '1rem', borderRadius: '4px' }}>
{`const api = new NovariApiManager({
  baseUrl: '${baseUrl}'
});

const response = await api.call({
  method: '${method}',
  endpoint: '${endpoint}',${body ? `\n  body: ${JSON.stringify(body, null, 2)},` : ''}${customSuccessMessage ? `\n  customSuccessMessage: '${customSuccessMessage}',` : ''}${customErrorMessage ? `\n  customErrorMessage: '${customErrorMessage}',` : ''}
  functionName: 'demo'
});`}
        </pre>
      </div>
      
      <div style={{ marginBottom: '1rem' }}>
        <strong>Expected Response Type:</strong>
        <pre style={{ background: '#f5f5f5', padding: '1rem', borderRadius: '4px' }}>
{`interface ApiResponse<T> {
  success: boolean;
  body: string;
  variant: 'success' | 'error' | 'warning';
  data?: T;
  status?: number;
}`}
        </pre>
      </div>
      
      {body && (
        <div style={{ marginBottom: '1rem' }}>
          <strong>Request Body:</strong>
          <pre style={{ background: '#f5f5f5', padding: '0.5rem' }}>
            {JSON.stringify(body, null, 2)}
          </pre>
        </div>
      )}

      {error && (
        <div style={{ color: 'red', marginBottom: '1rem' }}>
          Error: {error}
        </div>
      )}

      {result && (
        <div>
          <strong>Response:</strong>
          <pre style={{ background: '#f5f5f5', padding: '0.5rem' }}>
            {result}
          </pre>
        </div>
      )}
    </div>
  );
};

const meta = {
  title: 'API/NovariApiManager',
  component: ApiDemo,
  parameters: {
    docs: {
      description: {
        component: `
A flexible API manager for making HTTP requests with built-in error handling and logging.

## Features
- Custom success and error messages
- Type-safe responses
- Built-in error handling
- Response formatting
`,
      },
    },
  },
  argTypes: {
    baseUrl: {
      control: 'text',
      description: 'Base URL for the API',
      required: true,
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'undefined' },
      },
    },
    endpoint: {
      control: 'text',
      description: 'API endpoint path',
      required: true,
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'undefined' },
      },
    },
    method: {
      control: 'select',
      options: ['GET', 'POST', 'PUT', 'DELETE'],
      description: 'HTTP method',
      required: true,
      table: {
        type: { summary: "'GET' | 'POST' | 'PUT' | 'DELETE'" },
        defaultValue: { summary: 'undefined' },
      },
    },
    body: {
      control: 'object',
      description: 'Request body (for POST/PUT)',
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
    baseUrl: "localhost:8080",
    endpoint: '/todos/1',
    method: 'GET',
    customSuccessMessage: 'Successfully retrieved todo',
    customErrorMessage: 'Failed to get todo',

    body: {
      "firstname": "jennifer"
    }
  },
};

// POST example
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
    customSuccessMessage: 'Post created successfully',
    customErrorMessage: 'Failed to create post',
  },
};

// Error example
export const ErrorExample: Story = {
  args: {
    baseUrl: 'https://jsonplaceholder.typicode.com',
    endpoint: '/invalid-endpoint',
    method: 'GET',
    customErrorMessage: 'This endpoint does not exist',
  },
};