import { reporter as consoleReporter } from './reporters/console-reporter.js';

export const createReporter = (name) => {
  return {
    fail: (errorMessage) => {
      consoleReporter.newLine();
      consoleReporter.log(errorMessage);
      consoleReporter.newLine();
    },
    final: (failures, passes, elapsedTime) => {
      consoleReporter.newLine();
      consoleReporter.result(failures, passes, elapsedTime);
      consoleReporter.newLine();
    },
    oneStep: (specs, description, result, elapsedTime) => {
      const allSpecs = specs.join(' ');
      const testDesc = (allSpecs ? allSpecs + ' ' : allSpecs) + description;
      consoleReporter.step(testDesc, result, elapsedTime);
    }
  };
};