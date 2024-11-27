import { walk } from "@std/fs";
import mime from "npm:mime";

async function getTheFile(filePath: string): Promise<string> {
    if (filePath == "/") return "/index.html";

    const filePaths = [];
    for await (const walkEntry of walk("./website")) {
        if (walkEntry.isFile) {
            filePaths.push(
                walkEntry.path.replaceAll("\\", "/").replace("website", ""),
            );
        }
    }

    if (filePaths.includes(filePath + ".html")) return filePath + ".html";

    if (filePaths.includes(filePath)) return filePath;

    return "/404.html";
}

function apiRequest(req: Request): Response {
    const reqMethod = req.method;
    const reqURL = new URL(req.url);
    let reqPath = reqURL.pathname.replace("/api", "");

    if (reqPath.startsWith("/status")) {
        if (reqMethod == "GET") {
            reqPath = reqPath.replace("/status", "");

            return new Response(
                "gup (This means that cappabot.com is up)",
            );
        } else return new Response('Only "GET" to /api/status pls');
    } else if (reqPath == "/github") {
        return new Response("Hi github :)");
    }
    return new Response(`API request to ${reqPath}`);
}

async function websiteRequest(req: Request): Promise<Response> {
    const reqURL = new URL(req.url);
    const reqPath = reqURL.pathname;

    const reqFilePath = decodeURIComponent(reqPath);

    const resFileName = await getTheFile(reqFilePath);
    const resStatus = resFileName == "404.html" ? 404 : 200;

    const file = await Deno.open("./website" + resFileName);
    const contentType = mime.getType(resFileName);
    const headers = new Headers({ "content-type": contentType || "text/plain" });
    return new Response(file.readable, { status: resStatus, headers: headers });
}

async function handler(req: Request) {
    const reqMethod = req.method;
    const reqURL = new URL(req.url);
    const reqPath = reqURL.pathname;

    if (reqPath.startsWith("/api")) return apiRequest(req);

    // If the request method is GET
    if (reqMethod == "GET") {
        // Get parts of the website
        return await websiteRequest(req);
    } else {
        return new Response("Yeah idk", { status: 400 });
    }
}

Deno.serve(handler);
