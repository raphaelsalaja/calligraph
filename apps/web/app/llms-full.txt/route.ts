import { full } from "../../lib/docs";

export const dynamic = "force-static";

export function GET() {
  return new Response(full, {
    headers: { "content-type": "text/plain; charset=utf-8" },
  });
}
