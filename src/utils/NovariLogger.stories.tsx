import type { Meta, StoryObj } from '@storybook/react';
import React, { useState, useEffect } from 'react';
import { logger, LOG_LEVELS, LogLevel } from './NovariLogger';
import { Button, HStack } from '@navikt/ds-react';

interface LoggerDemoProps {
  logLevel: LogLevel;
}

// Example component demonstrating logger usage
const ExampleUserList: React.FC = () => {
  const [users] = useState([
    { id: 1, name: 'John Doe' },
    { id: 2, name: 'Jane Smith' }
  ]);

  useEffect(() => {
    logger.info('UserList component mounted', { component: 'ExampleUserList' });
    return () => logger.debug('UserList component unmounted', { component: 'ExampleUserList' });
  }, []);

  const handleUserClick = (userId: number) => {
    logger.debug('User clicked', { 
      component: 'ExampleUserList', 
      userId,
      action: 'userClick'
    });

    logger.crazy('Detailed click event data', {
      component: 'ExampleUserList',
      userId,
      timestamp: new Date().toISOString(),
      domEvent: 'click',
      userAgent: navigator.userAgent
    });
  };

  return (
    <div style={{ border: '1px solid #ccc', padding: '10px', marginBottom: '20px' }}>
      <h4>Example User List Component</h4>
      <ul>
        {users.map(user => (
          <li key={user.id} onClick={() => handleUserClick(user.id)} style={{ cursor: 'pointer' }}>
            {user.name}
          </li>
        ))}
      </ul>
    </div>
  );
};

const LoggerDemo: React.FC<LoggerDemoProps> = ({ logLevel }) => {
  const [logs, setLogs] = useState<string[]>([]);

  useEffect(() => {
    // Capture both console.log and console.debug outputs
    const originalLog = console.log;
    const originalDebug = console.debug;
    
    const logCapture = (...args: any[]) => {
      setLogs(prev => [...prev, args.join(' ')]);
      originalLog.apply(console, args);
    };

    console.log = logCapture;
    console.debug = logCapture;

    // Update logger level whenever it changes
    logger.updateLevel(logLevel);

    return () => {
      console.log = originalLog;
      console.debug = originalDebug;
    };
  }, [logLevel]);

  const handleLogExample = (type: LogLevel) => {
    // Force logger to use the selected level temporarily
    const currentLevel = logger.getCurrentLevel();
    logger.updateLevel(type);

    switch (type) {
      case 'info':
        logger.info('User authentication successful', { 
          component: 'LoggerDemo',
          userId: '123',
          role: 'admin',
          timestamp: new Date().toISOString()
        });
        break;
      case 'debug':
        logger.debug('API request details', { 
          component: 'LoggerDemo',
          endpoint: '/api/users',
          method: 'GET',
          duration: '235ms',
          timestamp: new Date().toISOString()
        });
        break;
      case 'crazy':
        logger.crazy('Component render performance', { 
          component: 'LoggerDemo',
          renderTime: '150ms',
          memoryUsage: '25MB',
          props: { rowCount: 1000 },
          timestamp: new Date().toISOString()
        });
        break;
    }

    // Restore the original level
    logger.updateLevel(currentLevel);
  };

  const clearLogs = () => setLogs([]);

  return (
    <div style={{ padding: '20px', maxWidth: '800px' }}>
      <div style={{ marginBottom: '20px' }}>
        <h3>Logger Configuration</h3>
        <div>Current Log Level: <strong>{logLevel}</strong></div>
        <p>Active log levels: {
          Object.keys(LOG_LEVELS)
            .filter(level => LOG_LEVELS[level as LogLevel] <= LOG_LEVELS[logLevel])
            .join(', ')
        }</p>
      </div>

      <div style={{ marginBottom: '20px' }}>
        <h3>Live Example</h3>
        <ExampleUserList />
      </div>

      <div style={{ marginBottom: '20px' }}>
        <h3>Test Different Log Levels</h3>
        <HStack gap="4" style={{ marginBottom: '10px' }}>
          <Button 
            variant="primary"
            onClick={() => handleLogExample('info')}
          >
            Log Info Example
          </Button>
          <Button 
            variant="secondary"
            onClick={() => handleLogExample('debug')}
          >
            Log Debug Example
          </Button>
          <Button 
            variant="tertiary"
            onClick={() => handleLogExample('crazy')}
          >
            Log Crazy Example
          </Button>
          <Button 
            variant="danger"
            onClick={clearLogs}
          >
            Clear Logs
          </Button>
        </HStack>
      </div>

      <div>
        <h3>Log Output</h3>
        <pre style={{
          background: '#f5f5f5',
          padding: '15px',
          borderRadius: '4px',
          maxHeight: '300px',
          overflow: 'auto',
          fontSize: '0.9em',
          fontFamily: 'monospace'
        }}>
          {logs.length === 0 ? 
            'No logs yet. Try clicking the buttons above or interacting with the UserList component.' :
            logs.map((log, index) => (
              <div key={index} style={{ marginBottom: '5px' }}>{log}</div>
            ))
          }
        </pre>
      </div>
    </div>
  );
};

const meta = {
  title: 'Novari/Utils/Logger', // Changed from 'Utils/Logger' to match the expected path
  component: LoggerDemo,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
# NovariLogger

Built-in logging utility with three levels of detail and structured output.

## Log Levels

1. **info** (default): Regular operational information
   \`\`\`typescript
   logger.info('User logged in', { userId: '123' });
   \`\`\`

2. **debug**: Detailed debugging information
   \`\`\`typescript
   logger.debug('API request failed', { 
     status: 404,
     endpoint: '/users'
   });
   \`\`\`

3. **crazy**: Very detailed diagnostic information
   \`\`\`typescript
   logger.crazy('Render performance', { 
     component: 'DataGrid',
     renderTime: '150ms',
     memoryUsage: '25MB'
   });
   \`\`\`

## Configuration

Set the log level using environment variable:
\`\`\`
VITE_NOVARI_LOGGER_LEVEL=info|debug|crazy
\`\`\`
        `
      }
    }
  },
  argTypes: {
    logLevel: {
      control: 'select',
      options: ['info', 'debug', 'crazy'],
      description: 'Current logging level'
    }
  }
} satisfies Meta<typeof LoggerDemo>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    logLevel: 'info'
  }
};

export const DebugLevel: Story = {
  args: {
    logLevel: 'debug'
  }
};

export const CrazyLevel: Story = {
  args: {
    logLevel: 'crazy'
  }
};