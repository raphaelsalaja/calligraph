import { full } from "../../lib/docs";

export const dynamic = "force-static";

export function GET() {
  return new Response(full, {
    headers: { "content-type": "text/markdown; charset=utf-8" },
  });
}
