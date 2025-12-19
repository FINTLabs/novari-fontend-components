import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import NovariSnackbar from './NovariSnackbar';
import { sampleAlerts, sampleAlertsNoHeadings } from '../StoryBookMockData/snackbarData.tsx';
import NovariSnackbarItem from './SnackbarItem.tsx';
import { Heading, Button } from '@navikt/ds-react';
import { NovariSnackbarItem as SnackbarItemType, NovariSnackbarPosition } from './NovariSnackbar';

const meta = {
    title: 'Components/NovariSnackbar',
    component: NovariSnackbar,
    subcomponents: { NovariSnackbarItem },
    tags: ['autodocs'],
    decorators: [
        (Story) => (
            <div style={{ padding: '2rem', minHeight: '100vh' }}>
                <Heading size={'small'} style={{ marginBottom: '1rem' }}>
                    Interactive Examples - Refresh page to see snackbars in action
                </Heading>
                <Story />
            </div>
        ),
    ],
    parameters: {
        layout: 'fullscreen',
        docs: {
            description: {
                component: `


A flexible notification system for displaying alerts, messages, and feedback to users. The component automatically manages a queue of notifications and displays them in a fixed position on the screen.

## Key Features

- **Auto-queue management**: Automatically handles multiple notifications
- **Flexible positioning**: 6 different screen positions
- **Auto-hide**: Configurable auto-close duration
- **Multiple variants**: Success, info, warning, and error styles
- **Accessibility**: Built with ARIA live regions for screen readers

## Basic Usage

\`\`\`tsx
import { useState } from 'react';
import { NovariSnackbar, NovariSnackbarItem } from '@novari/components';

function MyComponent() {
  const [alerts, setAlerts] = useState<NovariSnackbarItem[]>([]);

  const showSuccess = () => {
    setAlerts(prev => [...prev, {
      id: Date.now().toString(),
      variant: 'success',
      message: 'Operation completed successfully!',
      header: 'Success'
    }]);
  };

  return (
    <>
      <button onClick={showSuccess}>Show Success</button>
      <NovariSnackbar items={alerts} />
    </>
  );
}
\`\`\`
                `,
            },
        },
    },
} satisfies Meta<typeof NovariSnackbar>;

export default meta;

type Story = StoryObj<typeof meta>;

// Basic Usage Example
export const BasicUsage: Story = {
    args: {
        items: [],
        autoHideDuration: 4000,
        position: 'top-right',
        size: 'small',
    },
    render: () => {
        const [alerts, setAlerts] = useState<SnackbarItemType[]>([]);

        const addAlert = (variant: SnackbarItemType['variant'], message: string, header?: string) => {
            const newAlert: SnackbarItemType = {
                id: Date.now().toString(),
                variant,
                message,
                header,
            };
            setAlerts(prev => [...prev, newAlert]);
        };

        const clearAll = () => setAlerts([]);

        return (
            <div>
                <div style={{ marginBottom: '2rem' }}>
                    <Heading size="medium" style={{ marginBottom: '1rem' }}>
                        Basic Usage Example
                    </Heading>
                    <p style={{ marginBottom: '1rem' }}>
                        Copy this code to get started with NovariSnackbar:
                    </p>
                    <pre style={{ 
                        backgroundColor: '#f5f5f5', 
                        padding: '1rem', 
                        borderRadius: '4px',
                        fontSize: '14px',
                        overflow: 'auto',
                        marginBottom: '1rem'
                    }}>
{`import { useState } from 'react';
import { NovariSnackbar, NovariSnackbarItem } from '@novari/components';

function MyComponent() {
  const [alerts, setAlerts] = useState<NovariSnackbarItem[]>([]);

  const addAlert = (variant, message, header) => {
    const newAlert = {
      id: Date.now().toString(),
      variant,
      message,
      header,
    };
    setAlerts(prev => [...prev, newAlert]);
  };

  return (
    <>
      <button onClick={() => addAlert('success', 'Success message!', 'Success')}>
        Show Success
      </button>
      <NovariSnackbar items={alerts} />
    </>
  );
}`}
                    </pre>
                </div>

                <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                    <Button onClick={() => addAlert('success', 'Operation completed successfully!', 'Success')}>
                        Success
                    </Button>
                    <Button onClick={() => addAlert('info', 'Here is some useful information.', 'Info')}>
                        Info
                    </Button>
                    <Button onClick={() => addAlert('warning', 'Please check your input.', 'Warning')}>
                        Warning
                    </Button>
                    <Button onClick={() => addAlert('error', 'Something went wrong!', 'Error')}>
                        Error
                    </Button>
                    <Button variant="secondary" onClick={clearAll}>
                        Clear All
                    </Button>
                </div>

                <NovariSnackbar items={alerts} />
            </div>
        );
    },
    parameters: {
        docs: {
            story: {
                height: '60vh',
            },
        },
    },
};

// Different Positions
export const DifferentPositions: Story = {
    args: {
        items: [],
        autoHideDuration: 4000,
        position: 'top-right',
        size: 'small',
    },
    render: () => {
        const [alerts, setAlerts] = useState<SnackbarItemType[]>([]);
        const [position, setPosition] = useState<NovariSnackbarPosition>('top-right');

        const positions: Array<{ value: NovariSnackbarPosition, label: string }> = [
            { value: 'top-left', label: 'Top Left' },
            { value: 'top-right', label: 'Top Right' },
            { value: 'top-center', label: 'Top Center' },
            { value: 'bottom-left', label: 'Bottom Left' },
            { value: 'bottom-right', label: 'Bottom Right' },
            { value: 'bottom-center', label: 'Bottom Center' },
        ];

        const addAlert = () => {
            const newAlert: SnackbarItemType = {
                id: Date.now().toString(),
                variant: 'info',
                message: `Alert positioned at ${position}`,
                header: 'Position Demo',
            };
            setAlerts(prev => [...prev, newAlert]);
        };

        return (
            <div>
                <div style={{ marginBottom: '2rem' }}>
                    <Heading size="medium" style={{ marginBottom: '1rem' }}>
                        Different Positions
                    </Heading>
                    <p style={{ marginBottom: '1rem' }}>
                        Configure the position of snackbars on the screen:
                    </p>
                    <pre style={{ 
                        backgroundColor: '#f5f5f5', 
                        padding: '1rem', 
                        borderRadius: '4px',
                        fontSize: '14px',
                        overflow: 'auto',
                        marginBottom: '1rem'
                    }}>
{`<NovariSnackbar 
  items={alerts} 
  position="top-left"  // or top-right, top-center, bottom-left, bottom-right, bottom-center
/>`}
                    </pre>
                </div>

                <div style={{ marginBottom: '1rem' }}>
                    <label style={{ marginRight: '1rem' }}>Position:</label>
                    <select 
                        value={position} 
                        onChange={(e) => setPosition(e.target.value as NovariSnackbarPosition)}
                        style={{ marginRight: '1rem', padding: '0.5rem' }}
                    >
                        {positions.map(pos => (
                            <option key={pos.value} value={pos.value}>{pos.label}</option>
                        ))}
                    </select>
                    <Button onClick={addAlert}>Add Alert</Button>
                </div>

                <NovariSnackbar items={alerts} position={position} />
            </div>
        );
    },
    parameters: {
        docs: {
            story: {
                height: '60vh',
            },
        },
    },
};

// Form Validation Example
export const FormValidationExample: Story = {
    args: {
        items: [],
        autoHideDuration: 4000,
        position: 'top-right',
        size: 'small',
    },
    render: () => {
        const [alerts, setAlerts] = useState<SnackbarItemType[]>([]);
        const [formData, setFormData] = useState({ name: '', email: '' });

        const validateForm = () => {
            const newAlerts: SnackbarItemType[] = [];
            
            if (!formData.name.trim()) {
                newAlerts.push({
                    id: 'name-error',
                    variant: 'error',
                    message: 'Name is required',
                    header: 'Validation Error',
                });
            }
            
            if (!formData.email.trim()) {
                newAlerts.push({
                    id: 'email-error',
                    variant: 'error',
                    message: 'Email is required',
                    header: 'Validation Error',
                });
            } else if (!formData.email.includes('@')) {
                newAlerts.push({
                    id: 'email-format-error',
                    variant: 'error',
                    message: 'Please enter a valid email address',
                    header: 'Validation Error',
                });
            }

            if (newAlerts.length === 0) {
                newAlerts.push({
                    id: 'success',
                    variant: 'success',
                    message: 'Form submitted successfully!',
                    header: 'Success',
                });
            }

            setAlerts(prev => [...prev, ...newAlerts]);
        };

        return (
            <div>
                <div style={{ marginBottom: '2rem' }}>
                    <Heading size="medium" style={{ marginBottom: '1rem' }}>
                        Form Validation Example
                    </Heading>
                    <p style={{ marginBottom: '1rem' }}>
                        Real-world example of using snackbars for form validation:
                    </p>
                    <pre style={{ 
                        backgroundColor: '#f5f5f5', 
                        padding: '1rem', 
                        borderRadius: '4px',
                        fontSize: '14px',
                        overflow: 'auto',
                        marginBottom: '1rem'
                    }}>
{`const validateForm = () => {
  const newAlerts = [];
  
  if (!formData.name.trim()) {
    newAlerts.push({
      id: 'name-error',
      variant: 'error',
      message: 'Name is required',
      header: 'Validation Error',
    });
  }
  
  if (newAlerts.length === 0) {
    newAlerts.push({
      id: 'success',
      variant: 'success',
      message: 'Form submitted successfully!',
      header: 'Success',
    });
  }

  setAlerts(prev => [...prev, ...newAlerts]);
};`}
                    </pre>
                </div>

                <div style={{ maxWidth: '400px' }}>
                    <div style={{ marginBottom: '1rem' }}>
                        <label style={{ display: 'block', marginBottom: '0.5rem' }}>Name:</label>
                        <input
                            type="text"
                            value={formData.name}
                            onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                            style={{ width: '100%', padding: '0.5rem', border: '1px solid #ccc', borderRadius: '4px' }}
                        />
                    </div>
                    <div style={{ marginBottom: '1rem' }}>
                        <label style={{ display: 'block', marginBottom: '0.5rem' }}>Email:</label>
                        <input
                            type="email"
                            value={formData.email}
                            onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                            style={{ width: '100%', padding: '0.5rem', border: '1px solid #ccc', borderRadius: '4px' }}
                        />
                    </div>
                    <Button onClick={validateForm}>Submit Form</Button>
                </div>

                <NovariSnackbar items={alerts} />
            </div>
        );
    },
    parameters: {
        docs: {
            story: {
                height: '60vh',
            },
        },
    },
};

// API Response Example
export const ApiResponseExample: Story = {
    args: {
        items: [],
        autoHideDuration: 4000,
        position: 'top-right',
        size: 'small',
    },
    render: () => {
        const [alerts, setAlerts] = useState<SnackbarItemType[]>([]);
        const [loading, setLoading] = useState(false);

        const simulateApiCall = async (success: boolean) => {
            setLoading(true);
            
            // Simulate API delay
            await new Promise(resolve => setTimeout(resolve, 1500));
            
            const newAlert: SnackbarItemType = {
                id: Date.now().toString(),
                variant: success ? 'success' : 'error',
                message: success 
                    ? 'Data saved successfully!' 
                    : 'Failed to save data. Please try again.',
                header: success ? 'Success' : 'Error',
            };
            
            setAlerts(prev => [...prev, newAlert]);
            setLoading(false);
        };

        return (
            <div>
                <div style={{ marginBottom: '2rem' }}>
                    <Heading size="medium" style={{ marginBottom: '1rem' }}>
                        API Response Example
                    </Heading>
                    <p style={{ marginBottom: '1rem' }}>
                        Example of handling API responses with snackbars:
                    </p>
                    <pre style={{ 
                        backgroundColor: '#f5f5f5', 
                        padding: '1rem', 
                        borderRadius: '4px',
                        fontSize: '14px',
                        overflow: 'auto',
                        marginBottom: '1rem'
                    }}>
{`const handleApiResponse = async () => {
  setLoading(true);
  
  try {
    const response = await fetch('/api/data');
    const result = await response.json();
    
    setAlerts(prev => [...prev, {
      id: Date.now().toString(),
      variant: 'success',
      message: 'Data saved successfully!',
      header: 'Success',
    }]);
  } catch (error) {
    setAlerts(prev => [...prev, {
      id: Date.now().toString(),
      variant: 'error',
      message: 'Failed to save data. Please try again.',
      header: 'Error',
    }]);
  }
  
  setLoading(false);
};`}
                    </pre>
                </div>

                <div style={{ display: 'flex', gap: '0.5rem' }}>
                    <Button 
                        onClick={() => simulateApiCall(true)}
                        loading={loading}
                        disabled={loading}
                    >
                        Simulate Success
                    </Button>
                    <Button 
                        variant="danger"
                        onClick={() => simulateApiCall(false)}
                        loading={loading}
                        disabled={loading}
                    >
                        Simulate Error
                    </Button>
                </div>

                <NovariSnackbar items={alerts} />
            </div>
        );
    },
    parameters: {
        docs: {
            story: {
                height: '60vh',
            },
        },
    },
};

// Configuration Options
export const ConfigurationOptions: Story = {
    args: {
        items: [],
        autoHideDuration: 4000,
        position: 'top-right',
        size: 'small',
    },
    render: () => {
        const [alerts, setAlerts] = useState<SnackbarItemType[]>([]);
        const [autoHideDuration, setAutoHideDuration] = useState(4000);
        const [maxVisible, setMaxVisible] = useState(3);
        const [size, setSize] = useState<'small' | 'medium'>('small');

        const addMultipleAlerts = () => {
            const newAlerts: SnackbarItemType[] = Array.from({ length: 5 }, (_, i) => ({
                id: `alert-${Date.now()}-${i}`,
                variant: ['success', 'info', 'warning', 'error'][i % 4] as SnackbarItemType['variant'],
                message: `Alert number ${i + 1}`,
                header: `Alert ${i + 1}`,
            }));
            setAlerts(prev => [...prev, ...newAlerts]);
        };

        return (
            <div>
                <div style={{ marginBottom: '2rem' }}>
                    <Heading size="medium" style={{ marginBottom: '1rem' }}>
                        Configuration Options
                    </Heading>
                    <p style={{ marginBottom: '1rem' }}>
                        Customize the snackbar behavior with various options:
                    </p>
                    <pre style={{ 
                        backgroundColor: '#f5f5f5', 
                        padding: '1rem', 
                        borderRadius: '4px',
                        fontSize: '14px',
                        overflow: 'auto',
                        marginBottom: '1rem'
                    }}>
{`<NovariSnackbar 
  items={alerts}
  autoHideDuration={4000}  // Auto-close after 4 seconds
  maxVisible={3}           // Show max 3 alerts at once
  size="small"             // or "medium"
  position="top-right"     // Screen position
/>`}
                    </pre>
                </div>

                <div style={{ marginBottom: '1rem' }}>
                    <div style={{ marginBottom: '1rem' }}>
                        <label style={{ marginRight: '1rem' }}>Auto-hide duration (ms):</label>
                        <input
                            type="number"
                            value={autoHideDuration}
                            onChange={(e) => setAutoHideDuration(Number(e.target.value))}
                            style={{ padding: '0.5rem', border: '1px solid #ccc', borderRadius: '4px' }}
                        />
                    </div>
                    <div style={{ marginBottom: '1rem' }}>
                        <label style={{ marginRight: '1rem' }}>Max visible:</label>
                        <input
                            type="number"
                            value={maxVisible}
                            onChange={(e) => setMaxVisible(Number(e.target.value))}
                            style={{ padding: '0.5rem', border: '1px solid #ccc', borderRadius: '4px' }}
                        />
                    </div>
                    <div style={{ marginBottom: '1rem' }}>
                        <label style={{ marginRight: '1rem' }}>Size:</label>
                        <select 
                            value={size} 
                            onChange={(e) => setSize(e.target.value as 'small' | 'medium')}
                            style={{ padding: '0.5rem', border: '1px solid #ccc', borderRadius: '4px' }}
                        >
                            <option value="small">Small</option>
                            <option value="medium">Medium</option>
                        </select>
                    </div>
                    <Button onClick={addMultipleAlerts}>Add 5 Alerts</Button>
                </div>

                <NovariSnackbar 
                    items={alerts} 
                    autoHideDuration={autoHideDuration}
                    maxVisible={maxVisible}
                    size={size}
                />
            </div>
        );
    },
    parameters: {
        docs: {
            story: {
                height: '60vh',
            },
        },
    },
};

// Legacy examples for backward compatibility
export const Default: Story = {
    args: {
        items: sampleAlerts,
        autoHideDuration: 4000,
        position: 'top-right',
        size: 'small',
    },
    parameters: {
        docs: {
            story: {
                height: '40vh',
            },
        },
    },
};

export const NoHeadings: Story = {
    args: {
        items: sampleAlertsNoHeadings,
        autoHideDuration: 4000,
        position: 'top-right',
        size: 'small',
    },
    parameters: {
        docs: {
            story: {
                height: '40vh',
            },
        },
    },
};
