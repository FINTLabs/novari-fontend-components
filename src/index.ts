import { NovariIKS } from "./logo/NovariIKS";
import "./styles/novari-theme.css";
import { NovariApiManager } from './api/NovariApiManager';
import { NovariAlertManager } from './components/NovariAlertManager';

export { default as NovariHeader } from "./components/NovariHeader";
export { default as NovariFooter } from "./components/NovariFooter";
export { default as NovariInternalHeader} from "./components/NovariInternalHeader";
export { NovariIKS };
export { NovariAlertManager };

// API exports
export { NovariApiManager };
export type {
  NovariApiConfig,
  ApiCallOptions,
  ApiResponse,
  HttpMethod
} from './api/NovariApiManager';

// Alert exports
export type {
    AlertType,
    AlertManagerProps
} from './components/NovariAlertManager';
// export { defaultLogger } from './utils/logger';
// export type { Logger } from './utils/logger';
