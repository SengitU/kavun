const findFilesInDirectory = require('./utils/find-files-in-directory');

const fileLoader = (loader) => {

  const loadFiles = (pathToTheFiles) => pathToTheFiles.forEach(loader);

  const load = (path) => {
    const files = findFilesInDirectory(path);
    const specFiles = files.filter(file => file.indexOf('.spec') > -1);

    loadFiles(specFiles);
  };

return {
    load
  };
};

module.exports = fileLoader;