import { NovariIKS } from "./logo/NovariIKS";
import "./styles/novari-theme.css";
import { NovariApiManager } from './api/NovariApiManager';

export { default as NovariHeader } from "./components/NovariHeader";
export { default as NovariFooter } from "./components/NovariFooter";
export { default as NovariInternalHeader} from "./components/NovariInternalHeader";
export { NovariIKS };

// API exports
export { NovariApiManager };
export type {
  NovariApiConfig,
  ApiCallOptions,
  ApiResponse,
  HttpMethod
} from './api/NovariApiManager';
// export { defaultLogger } from './utils/logger';
// export type { Logger } from './utils/logger';
