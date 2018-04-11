const fileLoader = (loader = require) => {

  const loadPaths = (paths) => paths.forEach(loader);

  return {
    loadPaths
  }
};

module.exports = fileLoader;