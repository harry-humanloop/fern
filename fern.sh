#!/usr/bin/env sh

set -e

npx --yes fern-api@0.0.10 generate packages/api/src packages/api/generated/ir.json
npx --yes fern-typescript@0.0.6 model packages/api/generated/ir.json packages/api/generated
mv packages/api/generated/model packages/api/generated/src

cat > packages/api/generated/package.json <<EOL
{
  "name": "@fern-api/api",
  "main": "lib/index.js",
  "types": "lib/index.d.ts",
  "files": [
    "lib"
  ],
  "scripts": {
    "compile": "tsc --build",
    "prepublish": "run compile"
  },
  "devDependencies": {
    "typescript": "^4.6.3"
  }
}
EOL

cat > packages/api/generated/tsconfig.json <<EOL
{
	"extends": "../../../shared/tsconfig.shared.json",
	"compilerOptions": {
		"composite": true,
		"outDir": "./lib",
		"rootDir": "src",
		"module": "CommonJS"
	},
	"include": ["./src"],
	"references": []
}
EOL