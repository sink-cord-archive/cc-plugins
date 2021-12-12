import { findByDisplayName } from "@cumcord/modules/webpack";
const FormText = findByDisplayName("FormText");
const SmallMediaCarousel = findByDisplayName("SmallMediaCarousel");

export default ({ media }) => (
    <div class="ysink_stain_carousel">
        {media ? (
            <SmallMediaCarousel
                items={(typeof media === "string" ? [media] : media).map(
                    (m) => ({ type: 1, src: m })
                )}
                autoplayInterval={5000}
            />
        ) : (
            <div className="ysink_stain_noimg">
                <FormText className="ysink_stain_noimgtxt">No Image</FormText>
                {/* this is to get the height right, nothing else. */}
                <SmallMediaCarousel items={[{ type: 1, src: "" }]} />
            </div>
        )}
    </div>
);
