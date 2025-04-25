import chalk from 'chalk';

export type LogLevel = 'info' | 'debug' | 'crazy';

export const LOG_LEVELS: Record<LogLevel, number> = {
    info: 0,
    debug: 1,
    crazy: 2
};

export class NovariLogger {
    private static instance: NovariLogger;
    private currentLevel: LogLevel;

    private constructor() {
        this.currentLevel = (process.env?.NOVARI_LOGGER_LEVEL as LogLevel) || 
                          (import.meta.env?.VITE_NOVARI_LOGGER_LEVEL as LogLevel) || 
                          'info';
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
        return LOG_LEVELS[level] <= LOG_LEVELS[this.currentLevel];
    }

    private formatMessage(level: LogLevel, message: string): string {
        const timestamp = chalk.gray(`[${this.getTimestamp()}]`);
        const levelColor = {
            info: chalk.blue('[INFO]'),
            debug: chalk.yellow('[DEBUG]'),
            crazy: chalk.magenta('[CRAZY]')
        };
        
        return `${timestamp} ${levelColor[level]} ${message}`;
    }

    public updateLevel(level: LogLevel): void {
        this.currentLevel = level;
    }

    public getCurrentLevel(): LogLevel {
        return this.currentLevel;
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

export const logger = NovariLogger.getInstance();