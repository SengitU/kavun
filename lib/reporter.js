import { reporter as consoleReporter } from './reporters/console-reporter.js';

export const createReporter = (name) => {
  return {
    ...consoleReporter,
    fail: (errorMessage) => {
      consoleReporter.newLine();
      consoleReporter.log(errorMessage);
      consoleReporter.newLine();
    },
    final: (failures, passes, elapsedTime) => {
      consoleReporter.newLine();
      consoleReporter.result(failures, passes, elapsedTime);
      consoleReporter.newLine();
    }
  };
};