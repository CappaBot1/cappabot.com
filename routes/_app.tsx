import { define } from "@/utils.ts";
import { Head } from "https://jsr.io/@fresh/core/2.3.3/src/runtime/head.ts";

export default define.page(function App({ Component }) {
    return (
        <html lang="en-nz">
            <Head>
                <meta charset="utf-8" />
                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1.0"
                />
                <meta
                    name="description"
                    content="The official CappaBot website. Made by CappaBot."
                />

                <title>CappaBot</title>
            </Head>
            <body>
                <Component />
            </body>
        </html>
    );
});
