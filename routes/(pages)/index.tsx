import { define } from "@/utils.ts";

export default define.page(function Home(_ctx) {
    return (
        <>
            <h2>Links</h2>
            <h3>Internal</h3>
            <ul>
                <li>
                    <a href="/chat">CappaChat</a>
                </li>
                <li>
                    <a href="https://share.cappabot.com">CappaShare</a>
                </li>
                <li>
                    <a href="https://22231Casper.github.io">CappaMart</a>
                </li>
                <li>
                    <a href="/cappamath">CappaMath</a>
                </li>
            </ul>
            <h4>Testing</h4>
            <ul>
                <li>
                    <a href="/matterjs">Matter JS tests</a>
                </li>
                <li>
                    <a href="/threejs">Three JS tests</a>
                </li>
                <li>
                    <a href="/p5js">p5 JS tests</a>
                </li>
            </ul>

            <h3>External</h3>
            <ul>
                <li>
                    <a href="https://www.youtube.com/@CappaBot">
                        YouTube channel
                    </a>
                </li>
                <li>
                    <a href="https://www.instagram.com/cappabot1">
                        Instagram
                    </a>
                </li>
                <li>
                    <a href="https://discord.gg/HxThbHWG46">
                        Discord server
                    </a>
                </li>
                <li>
                    <a href="https://github.com/CappaCo/cappabot.com">
                        Website code
                    </a>
                </li>
                <li>
                    <a href="https://picocss.com">Website stylesheet</a>
                </li>
            </ul>
        </>
    );
});
