bun run transform-vanui-readme.ts ../../van/components/README.md vanui-README.md
bun run gen-code.ts codegen-template.ts vanui-README.md ../sitegen/vanui.ts
bun run gen-code.ts codegen-template.ts ../../converter/README.md ../sitegen/convert-lib.ts
