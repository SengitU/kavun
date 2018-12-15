import { Console } from './reporters/console.js';
import { MinimalConsole } from './reporters/minimal-console.js';

export const createReporter = (name) => {
  if (name === 'minimal') return new MinimalConsole();
  return new Console();
};