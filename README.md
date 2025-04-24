# Novari Frontend Components

Frontend component library for React.js applications using NAV Aksel design system. This package provides pre-styled UI components with consistent colors and layouts, making it easier to build modern, accessible applications.

## Installation

```bash
npm install novari-frontend-components
```

## Usage

```typescript
import { NovariHeader, NovariFooter, NovariApiManager } from 'novari-frontend-components';
import 'novari-frontend-components/lib/index.css';

// Example using NovariApiManager
const api = new NovariApiManager({
  baseUrl: 'https://api.example.com',
  defaultHeaders: {
    'Authorization': 'Bearer your-token'
  }
});

// Example using NovariHeader
function App() {
  return (
    <NovariHeader 
      appName="My App"
      isLoggedIn={true}
      displayName="John Doe"
    />
  );
}
```

## Available Components

- `NovariHeader` - Main application header with navigation and user menu
- `NovariFooter` - Application footer with customizable links
- `NovariApiManager` - HTTP client for API interactions
- `NovariInternalHeader` - Internal page header component

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
npm version patch  # For backwards-compatible bug fixes
npm version minor  # For new features
npm version major  # For breaking changes
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

