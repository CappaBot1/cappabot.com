async function handler(req: Request) {
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

    const filepath = decodeURIComponent(pathname);
    console.log(filepath);

    try {
        const htmlNames = [];
        for await (const name of Deno.readDir("../webiste")) {
            console.log(name);
            htmlNames.push(name);
        }
        console.log(htmlNames);
        
        try {
            const file = await Deno.open("../website" + filepath, { read: true });
            return new Response(file.readable);
        } catch {
            const file = await Deno.open("../website" + filepath + ".html", { read: true });
            return new Response(file.readable);
        }
    } catch {
        const file = await Deno.open("../website/404.html", { read: true });
        return new Response(file.readable, { status: 404 });
    }
}

Deno.serve(handler);
