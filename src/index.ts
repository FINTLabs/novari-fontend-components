import { NovariIKS } from "./logo/NovariIKS";
import "./styles/novari-theme.css";
import { NovariApiManager } from './api/NovariApiManager';
import { NovariAlertManager } from './components/NovariAlertManager';

export { default as NovariHeader } from "./components/NovariHeader";
export { default as NovariFooter } from "./components/NovariFooter";
export { default as NovariInternalHeader} from "./components/NovariInternalHeader";
export { NovariIKS };
export { NovariAlertManager };
export {NovariCircularProgressBar} from "./components/NovariCircularProgressBar";

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

export { default as NovariCookieConsent } from "./components/NovariCookieConsent";
export type { CookieConsentProps, CookiePreferences } from "./components/NovariCookieConsent";

export { default as NovariConfirmAction } from "./components/NovariConfirmAction";
export type { NovariConfirmActionProps } from "./components/NovariConfirmAction";

