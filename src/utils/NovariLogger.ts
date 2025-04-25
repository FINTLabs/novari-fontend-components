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

    private formatMessage(level: LogLevel, message: string): [string, ...string[]] {
        const timestamp = `[${this.getTimestamp()}]`;
        const levelLabel = `[${level.toUpperCase()}]`;
        
        const styles = {
            error: ['color: #666666', 'color: #ff0000', 'color: inherit'],
            info: ['color: #666666', 'color: #0066cc', 'color: inherit'],
            debug: ['color: #666666', 'color: #ccaa00', 'color: inherit'],
            crazy: ['color: #666666', 'color: #cc00cc', 'color: inherit']
        };
        
        return [
            `%c${timestamp} %c${levelLabel} %c${message}`,
            ...styles[level]
        ];
    }

    public updateLevel(level: LogLevel): void {
        this.currentLevel = level;
    }

    public getCurrentLevel(): LogLevel {
        return this.currentLevel;
    }

    public error(message: string, ...args: any[]): void {
        if (!this.shouldLog('error')) return;
        const [formatString, ...styles] = this.formatMessage('error', message);
        console.error(formatString, ...styles, ...args);
    }

    public info(message: string, ...args: any[]): void {
        if (!this.shouldLog('info')) return;
        const [formatString, ...styles] = this.formatMessage('info', message);
        console.log(formatString, ...styles, ...args);
    }

    public debug(message: string, ...args: any[]): void {
        if (!this.shouldLog('debug')) return;
        const [formatString, ...styles] = this.formatMessage('debug', message);
        console.log(formatString, ...styles, ...args);
    }

    public crazy(message: string, ...args: any[]): void {
        if (!this.shouldLog('crazy')) return;
        const [formatString, ...styles] = this.formatMessage('crazy', message);
        console.log(formatString, ...styles, ...args);
    }
}

export const logger = NovariLogger.getInstance();