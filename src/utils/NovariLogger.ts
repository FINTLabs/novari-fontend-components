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

    private constructor() {
        this.currentLevel = (import.meta.env?.VITE_NOVARI_LOGGER_LEVEL as LogLevel) || 'error';
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
        return LOG_LEVELS[this.currentLevel] >= LOG_LEVELS[level];
    }

    private formatMessage(level: LogLevel, message: string): string {
        const timestamp = `[${this.getTimestamp()}]`;
        return `${timestamp} [${level.toUpperCase()}] ${message}`;
    }

    public updateLevel(level: LogLevel): void {
        this.currentLevel = level;
    }

    public getCurrentLevel(): LogLevel {
        return this.currentLevel;
    }

    public error(message: string, ...args: any[]): void {
        if (!this.shouldLog('error')) return;
        console.error(this.formatMessage('error', message), ...args);
    }

    public info(message: string, ...args: any[]): void {
        if (!this.shouldLog('info')) return;
        console.log(this.formatMessage('info', message), ...args);
    }

    public debug(message: string, ...args: any[]): void {
        if (!this.shouldLog('debug')) return;
        console.log(this.formatMessage('debug', message), ...args);
    }

    public crazy(message: string, ...args: any[]): void {
        if (!this.shouldLog('crazy')) return;
        console.log(this.formatMessage('crazy', message), ...args);
    }
}

// Export a singleton instance
export const logger = NovariLogger.getInstance();
