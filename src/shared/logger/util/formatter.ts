import { blue, type Color, cyan, green, magenta, red, yellow } from 'colorette';
import { format } from 'winston';
import { inspect } from 'util';
import safeStringify from 'fast-safe-stringify';

const colors: Record<string, Color> = {
  error: red,
  info: blue,
  warn: yellow,
};

export type FormatterOptions = {
  label?: string;
  level: string;
  message: string;
} & Record<string, string>;

export const formatterFn = ({
  context,
  level,
  label,
  timestamp,
  message,
  ms,
  ...meta
}: FormatterOptions) => {
  if (typeof message === 'object') {
    message = inspect(message, { colors: true });
  }

  if ('undefined' !== typeof timestamp) {
    // Only format the timestamp to a locale representation if it's ISO 8601 format. Any format
    // that is not a valid date string will throw, just ignore it (it will be printed as-is).
    try {
      if (timestamp === new Date(timestamp).toISOString()) {
        timestamp = new Date(timestamp).toLocaleString();
      }
    } catch (error) {
      // eslint-disable-next-line no-empty
    }
  }

  // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
  const color = colors[level] ?? green;
  if (label) label = cyan(label);
  level = color(level);
  const tag = label ? `${label} | ${level}` : level;

  const stringifiedMeta = safeStringify(meta);
  const formattedMeta = inspect(JSON.parse(stringifiedMeta), {
    colors: true,
    depth: null,
  });

  return (
    ('undefined' !== typeof timestamp
      ? `[${magenta(timestamp ?? new Date().toISOString())}] `
      : '') +
    `${tag} ` +
    ('undefined' !== typeof context ? `${yellow('[' + context + ']')}  ` : '') +
    `${color(message)} - ` +
    `${formattedMeta}` +
    ('undefined' !== typeof ms ? ` ${yellow(ms)}` : '')
  );
};

export const formatter = format.printf(formatterFn);
