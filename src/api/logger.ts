export type LogLevel = 'error' | 'warn' | 'info' | 'debug';

const colors = {
    red: '\x1b[31m',
    green: '\x1b[32m',
    yellow: '\x1b[33m',
    blue: '\x1b[34m',
    brown: '\x1b[38;5;136m',
    reset: '\x1b[0m',
};

const levelColors: Record<LogLevel, string> = {
    error: colors.red,
    warn: colors.yellow,
    info: colors.green,
    debug: colors.brown,
};

const levelSeverity: Record<LogLevel, number> = {
    error: 0,
    warn: 1,
    info: 2,
    debug: 3,
};

export interface LoggerConfig {
    level: LogLevel;
}

export class Logger {
    private currentLogLevel: LogLevel;

    constructor(config: LoggerConfig) {
        this.currentLogLevel = config.level;
    }

    private shouldLog(level: LogLevel): boolean {
        return levelSeverity[level] <= levelSeverity[this.currentLogLevel];
    }

    private getColor(level: LogLevel): string {
        return levelColors[level] || colors.blue;
    }

    private format(level: LogLevel, message: string, ...args: any[]): void {
        if (!this.shouldLog(level)) return;
        const timestamp = new Date().toISOString();
        console.log(
            `[${timestamp}] ${this.getColor(level)}${level}:${colors.reset}`,
            message,
            ...args
        );
    }

    error(message: string, ...args: any[]): void {
        this.format('error', message, ...args);
    }

    warn(message: string, ...args: any[]): void {
        this.format('warn', message, ...args);
    }

    info(message: string, ...args: any[]): void {
        this.format('info', message, ...args);
    }

    debug(message: string, ...args: any[]): void {
        this.format('debug', message, ...args);
    }
}