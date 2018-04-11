const findFilesInDirectory = require('./utils/find-files-in-directory');

const fileLoader = (loader = require) => {

  const loadFiles = (pathToTheFiles) => pathToTheFiles.forEach(loader);

  const loadAll = (path) => {
    const files = findFilesInDirectory(path);
    const specFiles = files.filter(file => file.indexOf('.spec') > -1);

    loadFiles(specFiles);
  };

return {
    loadFiles,
    loadAll
  };
};

module.exports = fileLoader;