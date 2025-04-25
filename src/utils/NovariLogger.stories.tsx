import type { Meta } from '@storybook/react';
import React from 'react';

const LogExample: React.FC<{ level: string; code: string; output: string }> = ({ level, code, output }) => (
  <div style={{ 
    border: '1px solid #e0e0e0', 
    borderRadius: '4px', 
    padding: '20px',
    marginBottom: '20px' 
  }}>
    <h4 style={{ margin: '0 0 10px 0' }}>{level} Level Example</h4>
    <div style={{ 
      background: '#f5f5f5',
      padding: '15px',
      borderRadius: '4px',
      marginBottom: '10px',
      fontFamily: 'monospace',
      fontSize: '14px'
    }}>
      {code}
    </div>
    <div style={{ 
      background: '#f8f8f8',
      padding: '15px',
      borderRadius: '4px',
      fontFamily: 'monospace',
      fontSize: '14px',
      color: '#666'
    }}>
      Output: {output}
    </div>
  </div>
);

const UsageGuide = () => (
  <div style={{ 
    border: '1px solid #e0e0e0',
    borderRadius: '4px',
    padding: '20px',
    marginBottom: '30px',
    background: '#f8f8f8'
  }}>
    <h3 style={{ marginTop: 0 }}>Usage in Components</h3>
    <div style={{ 
      background: '#fff',
      padding: '15px',
      borderRadius: '4px',
      fontFamily: 'monospace',
      fontSize: '14px'
    }}>

      {`import { logger } from 'novari-frontend-components';

// Optional: Set log level (default is 'error')
// Available levels: 'error' | 'info' | 'debug' | 'crazy'
logger.updateLevel('debug');

// In your component:
const MyComponent = () => {
  useEffect(() => {
    logger.info('Component mounted');
    return () => logger.debug('Component unmounted');
  }, []);

  return <div>My Component</div>;
};`}
    </div>
  </div>
);

const meta = {
  title: 'Novari/Logger',
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'Built-in logging utility for Novari components with different logging levels and formatted output.'
      }
    }
  }
} satisfies Meta;

export default meta;

export const Documentation = () => (
  <div style={{ maxWidth: '800px' }}>
    <UsageGuide />
    
    <LogExample 
      level="Info"
      code={`logger.info('User authentication successful', { 
  userId: '123',
  role: 'admin'
});`}
      output="[2024-01-20T10:30:15.000Z] [INFO] User authentication successful { userId: '123', role: 'admin' }"
    />

    <LogExample 
      level="Debug"
      code={`logger.debug('API request details', { 
  endpoint: '/api/users',
  method: 'GET',
  duration: '235ms'
});`}
      output="[2024-01-20T10:30:15.000Z] [DEBUG] API request details { endpoint: '/api/users', method: 'GET', duration: '235ms' }"
    />

    <LogExample 
      level="Crazy"
      code={`logger.crazy('Component render metrics', { 
  component: 'DataGrid',
  renderTime: '150ms',
  memoryUsage: '25MB',
  props: { rowCount: 1000 }
});`}
      output="[2024-01-20T10:30:15.000Z] [CRAZY] Component render metrics { component: 'DataGrid', renderTime: '150ms', memoryUsage: '25MB', props: { rowCount: 1000 } }"
    />
  </div>
);