const colors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  dim: '\x1b[2m',
  underscore: '\x1b[4m',
  blink: '\x1b[5m',
  reverse: '\x1b[7m',
  hidden: '\x1b[8m',

  fg: {
    black: '\x1b[30m',
    red: '\x1b[31m',
    green: '\x1b[32m',
    yellow: '\x1b[33m',
    blue: '\x1b[34m',
    magenta: '\x1b[35m',
    cyan: '\x1b[36m',
    white: '\x1b[37m',
    crimson: '\x1b[38m', // Scarlet
  },
  bg: {
    black: '\x1b[40m',
    red: '\x1b[41m',
    green: '\x1b[42m',
    yellow: '\x1b[43m',
    blue: '\x1b[44m',
    magenta: '\x1b[45m',
    cyan: '\x1b[46m',
    white: '\x1b[47m',
    crimson: '\x1b[48m',
  },
};

const LOG_LEVEL = {
  default: {
    level: -1,
    color: colors.fg.white,
  },
  error: {
    level: 0,
    color: colors.fg.red,
  },
  info: {
    level: 0,
    color: colors.fg.blue,
  },
  warn: {
    level: 0,
    color: colors.fg.yellow,
  },
  log: {
    level: 0,
    color: colors.fg.green,
  },
};

// simple logger
// preferred for DEV environment
// PROD logger could be more verbose

// using closures concept
function logger(date) {
  return function (label) {
    return function (message) {
      const reset = colors.reset,
        prop = label ? label.toLowerCase() : 'default',
        color = LOG_LEVEL[prop].color;

      console.log(
        `${date.toLocaleString()}\t${color}${label}${reset}\t${JSON.stringify(
          message
        )}`
      );
    };
  };
}

// using currying concept
const bindDateWith = logger(new Date());

const infoLogger = bindDateWith('INFO');
const warnLogger = bindDateWith('WARN');
const logLogger = bindDateWith('LOG');
const errorLogger = bindDateWith('ERROR');

export { logger as default, infoLogger, warnLogger, logLogger, errorLogger };
