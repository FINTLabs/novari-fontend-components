# Novari Frontend Components

Frontend component library for React.js applications using NAV Aksel design system. This package provides pre-styled UI components with consistent colors and layouts, making it easier to build modern, accessible applications.

## Installation

```bash
npm install novari-frontend-components
```

## Usage

```tsx
import React, { useState } from 'react';
import { 
  NovariHeader, 
  NovariFooter, 
  NovariApiManager, 
  NovariAlertManager,
  AlertType 
} from 'novari-frontend-components';
import 'novari-frontend-components/lib/index.css';

// Example using NovariApiManager
const api = new NovariApiManager({
  baseUrl: 'https://api.example.com',
  defaultHeaders: {
    'Authorization': 'Bearer your-token'
  }
});

// Example using NovariAlertManager
function App(): JSX.Element {
  const [alerts, setAlerts] = useState<AlertType[]>([]);

  const addAlert = (message: string, variant: AlertType['variant']): void => {
    setAlerts(prev => [...prev, {
      id: Date.now(),
      message,
      variant,
      header: variant.charAt(0).toUpperCase() + variant.slice(1)
    }]);
  };

  return (
    <>
      <NovariHeader 
        appName="My App"
        isLoggedIn={true}
        displayName="John Doe"
      />
      <NovariAlertManager
        alerts={alerts}
        maxAlerts={3}
        autoRemoveDelay={5000}
        position={{ top: '5rem', right: '1rem' }}
      />
    </>
  );
}

export default App;
```

## Available Components

- `NovariHeader` - Main application header with navigation and user menu
- `NovariFooter` - Application footer with customizable links
- `NovariApiManager` - HTTP client for API interactions
- `NovariInternalHeader` - Internal page header component
- `NovariAlertManager` - Toast notification system for displaying alerts

## Component Documentation

### NovariAlertManager

A flexible alert management system for displaying toast notifications.

#### Types

```tsx
interface AlertType {
    id: number;
    message: string;
    header?: string;
    variant: 'error' | 'info' | 'warning' | 'success';
}

interface AlertManagerProps {
    alerts: AlertType[];
    maxAlerts?: number;         // Default: 3
    autoRemoveDelay?: number;   // Default: 10000 (10 seconds)
    position?: {
        top?: string;
        right?: string;
        bottom?: string;
        left?: string;
    };                          // Default: { top: '5rem', right: '1rem' }
}
```

#### Example Usage

```tsx
import React, { useState } from 'react';
import { NovariAlertManager, AlertType } from 'novari-frontend-components';

function MyComponent(): JSX.Element {
  const [alerts, setAlerts] = useState<AlertType[]>([]);

  const showSuccessAlert = (): void => {
    setAlerts(prev => [...prev, {
      id: Date.now(),
      message: 'Operation completed successfully',
      header: 'Success',
      variant: 'success'
    }]);
  };

  return (
    <NovariAlertManager
      alerts={alerts}
      maxAlerts={3}
      autoRemoveDelay={5000}
      position={{ top: '5rem', right: '1rem' }}
    />
  );
}

export default MyComponent;
```

## Logging

The library includes a built-in logger that can be used in your application:

```typescript
import { logger } from 'novari-frontend-components';

// Different log levels
logger.info('Normal operation information');
logger.debug('Detailed debugging information');
logger.crazy('Very detailed diagnostic information');

// Enable Novari Logger by setting environment variables:
// NOVARI_LOGGER_ENABLED=true
// NOVARI_LOGGER_LEVEL=debug  // 'info' | 'debug' | 'crazy'

// Example usage in a component:
function MyComponent() {
  const handleClick = () => {
    logger.debug('Button clicked');
    // Do something
  };

  useEffect(() => {
    logger.info('Component mounted');
    return () => logger.debug('Component unmounted');
  }, []);

  return <button onClick={handleClick}>Click me</button>;
}
```

The logger provides:
- Three logging levels: info, debug, and crazy
- Colored output with timestamps
- Environment variable control
- Fallback to console.log when disabled

### Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| NOVARI_LOGGER_ENABLED | Enable/disable Novari Logger | false |
| NOVARI_LOGGER_LEVEL | Set logging level | 'info' |


## Development

### Prerequisites

- Node.js (v18 or higher)
- npm (v9 or higher)

### Local Development

1. Clone the repository:
```bash
git clone https://github.com/FINTLabs/novari-fontend-components.git
cd novari-fontend-components
```

2. Install dependencies:
```bash
npm install
```

3. Start Storybook for component development:
```bash
npm run storybook
```

### Building

```bash
npm run build
```

This will:
- Run TypeScript compilation
- Generate rollup bundle
- Create distribution files in `lib/` directory

### Publishing

1. Update version:
```bash
npm version patch
npm version minor
npm version major
```

2. Publish to npm:
```bash
npm publish --access public
```

## Testing Components

Run Storybook to test and develop components in isolation:

```bash
npm run storybook
```

Visit `http://localhost:6006` to view the Storybook interface.

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Support

For support, please create an issue in the GitHub repository or contact the maintainers.

## Built With

- [React](https://reactjs.org/)
- [NAV Aksel Design System](https://aksel.nav.no/)
- [TypeScript](https://www.typescriptlang.org/)
- [Storybook](https://storybook.js.org/)
- [Rollup](https://rollupjs.org/)

## Project Status

Active development - This project is actively maintained and accepting contributions.

