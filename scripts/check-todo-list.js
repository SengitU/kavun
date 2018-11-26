const fs = require('fs');
const path = require('path');

const LINE_START_FOR_NEW_VERSION = '# version ';
const LINE_START_FOR_TODO = '- [ ]';
const CHANGELOG_FILENAME = path.join(__dirname, '../CHANGELOG.md');

const changelog = fs.readFileSync(CHANGELOG_FILENAME, 'utf-8');
const lines = changelog.split('\n');
let latestVersionStartsAtLine = -1;
let nextVersionStartsAtLine = -1;
lines.forEach((line, lineNumber) => {
  const isFirstVersion = latestVersionStartsAtLine===-1;
  if (!isFirstVersion && nextVersionStartsAtLine===-1) 
    nextVersionStartsAtLine = lineNumber;
  if (isFirstVersion && line.startsWith(LINE_START_FOR_NEW_VERSION)) 
    latestVersionStartsAtLine = lineNumber;
});

const items = lines.slice(latestVersionStartsAtLine, nextVersionStartsAtLine + 1);
const versionName = items[0];
const notYetDone = items.slice(1).filter(line => line.startsWith(LINE_START_FOR_TODO));
if (notYetDone.length === 0) {
  process.exit(0);
}
console.log(`+----------------------   ${versionName}   ----------------------`);
console.log(`+-------  You have stuff to do. NOT ready to release yet!  -----`);
console.log(`|`);
console.log(`|  ${notYetDone.length} items marked as TODO (in ${versionName})`);
console.log('|    ' + (notYetDone.join('\n|    ')));
console.log(`|`);
console.log('+---------------------- Get it done, first! ---------------------\n');

process.exit(-1);
