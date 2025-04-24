import type { Meta, StoryObj } from '@storybook/react';
import React, { useState } from 'react';
import { NovariApiManager } from '../api/NovariApiManager.ts';

// Example component to demonstrate API usage
const ApiDemo: React.FC<{
  baseUrl: string;
  endpoint: string;
  method: 'GET' | 'POST' | 'PUT' | 'DELETE';
  body?: any;
}> = ({ baseUrl, endpoint, method, body }) => {
  const [result, setResult] = useState<string>('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const api = new NovariApiManager({
    baseUrl,
    // logger: {
    //   info: (msg) => console.log(`[Demo] ${msg}`),
    //   warn: (msg) => console.warn(`[Demo] ${msg}`),
    //   error: (msg) => console.error(`[Demo] ${msg}`),
    // },

  });

  const handleApiCall = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await api.call({
        method,
        endpoint,
        body,
        functionName: 'storybook-demo',
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

\`\`\`typescript
const api = new NovariApiManager({
  baseUrl: 'https://api.example.com',
  defaultHeaders: {
    'x-api-key': 'your-api-key'
  }
});

const response = await api.call({
  method: 'GET',
  endpoint: '/users/123',
  functionName: 'getUser'
});
\`\`\`
        `,
      },
    },
  },
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
  },
} satisfies Meta<typeof ApiDemo>;

export default meta;
type Story = StoryObj<typeof meta>;

// GET example
export const GetExample: Story = {
  args: {
    baseUrl: 'https://jsonplaceholder.typicode.com',
    endpoint: '/todos/1',
    method: "POST",
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
  },
};

// Error example
export const ErrorExample: Story = {
  args: {
    baseUrl: 'https://jsonplaceholder.typicode.com',
    endpoint: '/invalid-endpoint',
    method: 'GET',
  },
};