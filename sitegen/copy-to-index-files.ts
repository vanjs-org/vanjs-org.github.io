// For backward compatibility of URLs that end with "/".
for await (const f of Deno.readDir("."))
  if (f.isFile && f.name.endsWith(".html") && f.name !== "index.html" && f.name !== "template.html")
    Deno.copyFileSync(f.name, f.name.slice(0, -5) + "/index.html")
