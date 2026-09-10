import { define } from "@/utils.ts";

console.log("status.ts loaded");

// Generate a random number
const randomNumber = Math.random();

export const handler = define.handlers({
    GET(_ctx) {
        return new Response(
            `gup (This means that cappabot.com is up)\nHere's a random number: ${randomNumber}`,
        );
    },
});
