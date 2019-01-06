# 1. Pass each test file by filename

## Status

Accepted

## Context

Many nodejs tools allow to pass file(name) patterns, so the nodejs app
searches the filesystem and uses those files for running the app.
This adds complexity to the app itself and requires more code.

## Decision

Kavun does NOT provide features such as passing wildcard filenames (`*.spec.js`) 
or brace expansion (`{,**/**}/*.spec.js`) out of the box. There are command line tools,
such as the bash shell that do this out of the box and are much better with it.
Therefore it is recommended to use those for grepping, searching, preparing all files
that shall be used by kavun as test files.

Beside the focus on doing other jobs than test running, a file search feature
would also require kavun to deal with permissions and file system specialities in 
case there are any. All this hazzle can be prevented by only accepting filenames.

## Consequences

+ smaller, faster, easier to maintain code
+ focus
- the user has to use/know the command line features to find files
- it might be unusual to many users
