import { reporter as consoleReporter } from './reporters/console-reporter.js';

export const createReporter = (name) => {
  return {
    ...consoleReporter,
    fail: (errorMessage) => {
      consoleReporter.newLine();
      consoleReporter.log(errorMessage);
      consoleReporter.newLine();
    }
  };
};