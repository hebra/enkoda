// enkoda — Local Deno Server
// Usage: deno run --allow-net --allow-read serve.ts

import { serve } from "https://deno.land/std@0.177.0/http/server.ts";
import { serveDir } from "https://deno.land/std@0.177.0/http/file_server.ts";

const PORT = 8000;

console.log(`enkoda — Dev server running at http://localhost:${PORT}`);

serve((req) => {
  return serveDir(req, {
    fsRoot: "web",
    showDirListing: true,
    enableCors: true,
  });
}, { port: PORT });
