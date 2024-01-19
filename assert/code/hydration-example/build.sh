set -e

npx tsc
npx esbuild dist/client.js --bundle --outfile=dist/client.bundle.js
