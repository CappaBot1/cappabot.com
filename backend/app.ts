import { serveDir } from "@std/http/file-server";

Deno.serve(
(req) => {
    const url = new URL(req.url);
    let pathname = url.pathname;

    if (pathname.startsWith("/api")) {
        pathname = pathname.replace("/api", "");

        if (pathname.startsWith("/status")) {
            pathname = pathname.replace("/status", "");

            return new Response("gup (This means that cappabot.com is up and running)");
        }
        return new Response(`API request to ${pathname}`);
    }

    return serveDir(req, {
        fsRoot: "../website/",
    });
}
);
