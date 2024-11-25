import { walk } from "@std/fs";

async function getTheFile(filePath:string):Promise<string> {
    if (filePath == "/") return "/index.html";

    const filePaths = [];
    for await (const walkEntry of walk("./website")) {
        if (walkEntry.isFile) filePaths.push(walkEntry.path.replaceAll("\\", "/").replace("website", ""));
    }

    if (filePaths.includes(filePath + ".html")) return filePath + ".html";

    if (filePaths.includes(filePath)) return filePath;

    return "/404.html";
}

async function handler(req: Request) {
    const reqURL = new URL(req.url);
    let reqPath = reqURL.pathname;

    if (reqPath.startsWith("/api")) {
        reqPath = reqPath.replace("/api", "");

        if (reqPath.startsWith("/status")) {
            reqPath = reqPath.replace("/status", "");

            return new Response("gup (This means that cappabot.com has been deployed correctly with deno)");
        }
        return new Response(`API request to ${reqPath}`);
    }

    const reqFilePath = decodeURIComponent(reqPath);

    const resFileName = await getTheFile(reqFilePath);
    const resStatus = resFileName == "404.html" ? 400 : 200;
    
    const file = await Deno.open("./website" + resFileName);
    return new Response(file.readable, { status: resStatus });
}

Deno.serve(handler);
