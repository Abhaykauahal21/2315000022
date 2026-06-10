type LogLevel = 'INFO' | 'WARN' | 'ERROR' | 'DEBUG';

const timestamp = (): string => new Date().toISOString();

const format = (level: LogLevel, msg: string): string =>
  `[${timestamp()}] [${level}] ${msg}`;

export const logInfo = (msg: string): void => {
  process.stdout.write(format('INFO', msg) + '\n');
};

export const logWarn = (msg: string): void => {
  process.stdout.write(format('WARN', msg) + '\n');
};

export const logError = (msg: string): void => {
  process.stderr.write(format('ERROR', msg) + '\n');
};
