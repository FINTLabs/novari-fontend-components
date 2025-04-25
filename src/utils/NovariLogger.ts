export type LogLevel = 'error' | 'info' | 'debug' | 'crazy';

export const LOG_LEVELS: Record<LogLevel, number> = {
    error: 0,
    info: 1,
    debug: 2,
    crazy: 3
};

export class NovariLogger {
    private static instance: NovariLogger;
    private currentLevel: LogLevel;
    private enabled: boolean;
    private isServer: boolean;

    private constructor() {
        const envLevel = this.getEnvironmentLogLevel();
        this.currentLevel = envLevel || 'error';
        this.enabled = true;
        // Check if we're in a browser environment
        this.isServer = typeof window === 'undefined';
    }

    private getEnvironmentLogLevel(): LogLevel | null {
        if (typeof window !== 'undefined') {
            return (import.meta.env?.VITE_NOVARI_LOGGER_LEVEL as LogLevel) || 'debug';
        }
        return process?.env?.NOVARI_LOGGER_LEVEL as LogLevel || 'debug';
    }

    public static getInstance(): NovariLogger {
        if (!NovariLogger.instance) {
            NovariLogger.instance = new NovariLogger();
        }
        return NovariLogger.instance;
    }

    private getTimestamp(): string {
        return new Date().toISOString();
    }

    private shouldLog(level: LogLevel): boolean {
        return this.enabled && LOG_LEVELS[this.currentLevel] >= LOG_LEVELS[level];
    }

    private formatServerMessage(level: LogLevel, message: string): string {
        const timestamp = this.getTimestamp();
        const colors = {
            error: '\x1b[31m', // Red
            info: '\x1b[36m',  // Cyan
            debug: '\x1b[33m', // Yellow
            crazy: '\x1b[35m'  // Magenta
        };
        const reset = '\x1b[0m';
        const gray = '\x1b[90m';
        
        return `${gray}[${timestamp}]${reset} ${colors[level]}[${level.toUpperCase()}]${reset} ${message}`;
    }


    private formatBrowserMessage(level: LogLevel, message: string): string {
        const timestamp = this.getTimestamp();
        return `[${timestamp}] [${level.toUpperCase()}] ${message}`;
    }

    public enable(): void {
        this.enabled = true;
    }

    public disable(): void {
        this.enabled = false;
    }

    public updateLevel(level: LogLevel): void {
        this.currentLevel = level;
    }

    public getCurrentLevel(): LogLevel {
        return this.currentLevel;
    }

    public error(message: string, ...args: any[]): void {
        if (!this.shouldLog('error')) return;
        if (this.isServer) {
            console.error(this.formatServerMessage('error', message), ...args);
        } else {
            console.error(this.formatBrowserMessage('error', message), ...args);
        }
    }

    public info(message: string, ...args: any[]): void {
        if (!this.shouldLog('info')) return;
        if (this.isServer) {
            console.log(this.formatServerMessage('info', message), ...args);
        } else {
            console.log(this.formatBrowserMessage('info', message), ...args);
        }
    }

    public debug(message: string, ...args: any[]): void {
        if (!this.shouldLog('debug')) return;
        if (this.isServer) {
            console.log(this.formatServerMessage('debug', message), ...args);
        } else {
            console.log(this.formatBrowserMessage('debug', message), ...args);
        }
    }

    public crazy(message: string, ...args: any[]): void {
        if (!this.shouldLog('crazy')) return;
        if (this.isServer) {
            console.log(this.formatServerMessage('crazy', message), ...args);
        } else {
            console.log(this.formatBrowserMessage('crazy', message), ...args);
        }
    }
}

export const logger = NovariLogger.getInstance();

// Enable logging by default in development
if (import.meta.env.DEV) {
    logger.enable();
    logger.updateLevel('debug');
}
