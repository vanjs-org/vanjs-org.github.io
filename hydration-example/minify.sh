npx terser dist/client.bundle.js --compress --toplevel --mangle --mangle-props regex=/^_.+/ -f wrap_func_args=false -o dist/client.bundle.min.js
