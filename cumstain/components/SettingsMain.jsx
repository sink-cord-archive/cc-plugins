import { findByDisplayName, findByProps } from "@cumcord/modules/webpack";

import { ErrorBoundary } from "@cumcord/ui/components";
import openReposModal from "./ReposModal";
import TabBar from "./tabs/TabBar";
import TabInstalled from "./tabs/TabInstalled";
import TabQuickCSS from "./tabs/TabQuickCSS";
import TabStore from "./tabs/TabStore";
const FormTitle = findByDisplayName("FormTitle");
const FormSection = findByDisplayName("FormSection");
const Flex = findByDisplayName("Flex");
const Button = findByProps("Sizes", "Colors", "Looks", "DropdownSizes");

export default () => {
    return (
        <ErrorBoundary>
            <FormSection>
                <Flex
                    basis="auto"
                    grow={1}
                    shrink={1}
                    className="ysink_stain_row"
                >
                    <FormTitle tag="h1">Cumstain Settings</FormTitle>
                    <Button
                        className="ysink_stain_button"
                        color={Button.Colors.GREEN}
                        sizes={Button.Sizes.LARGE}
                        onClick={openReposModal}
                    >
                        Repo Manager
                    </Button>
                </Flex>

                <TabBar
                    items={[
                        { text: "Installed", component: TabInstalled },
                        { text: "Store", component: TabStore },
                        { text: "Quick CSS", component: TabQuickCSS },
                    ]}
                />
            </FormSection>
        </ErrorBoundary>
    );
};
