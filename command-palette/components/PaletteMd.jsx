import { findByProps } from "@cumcord/modules/webpack";

const Markdown = findByProps("rules");

export default ({ children }) => (
    <div class="ysink_palette_md">
        <Markdown>{children}</Markdown>
    </div>
);
