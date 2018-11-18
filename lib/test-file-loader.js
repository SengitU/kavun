import * as fs from './utils/find-files-in-directory';

const productionDeps = {
  findFilesInDirectory: fs.findFilesInDirectory,
  isFile: fs.isFile,
};
const defaultFilesFilter = (fileName) => fileName.indexOf('.spec') > -1;

export const loadTestFiles = (loader, fileNames, { findFilesInDirectory, isFile } = productionDeps) => {
  const loadOneFileWithLoader = (fileName) => loader(fileName);  
  const loadFiles = () => fileNames.forEach(loadOneFileWithLoader);
  loadFiles();
};
