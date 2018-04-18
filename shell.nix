with import (fetchTarball https://github.com/nixos/nixpkgs/tarball/b5ca7fefc45ecec8695685d573db39612e26ae87) { };

stdenv.mkDerivation {
    name = "dev-shell";
    src = null;
    buildInputs = [ nodejs-9_x ];
}
