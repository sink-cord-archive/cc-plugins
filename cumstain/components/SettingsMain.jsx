import { findByDisplayName, findByProps } from "@cumcord/modules/webpack";

import TabInstalled from "./tabs/TabInstalled";
import TabQuickCSS from "./tabs/TabQuickCSS";
import TabRepo from "./tabs/TabRepo";
import TabStore from "./tabs/TabStore";

import { ErrorBoundary } from "@cumcord/ui/components";
import TabBar from "./TabBar";
const FormTitle = findByDisplayName("FormTitle");
const FormSection = findByDisplayName("FormSection");

export default () => {
    return (
        <ErrorBoundary>
            <FormSection>
                <FormTitle tag="h1">Cumstain Settings</FormTitle>

                <TabBar
                    items={[
                        { text: "Installed", component: TabInstalled },
                        { text: "Store", component: TabStore },
                        { text: "Repos", component: TabRepo },
                        { text: "Quick CSS", component: TabQuickCSS },
                    ]}
                />
            </FormSection>
        </ErrorBoundary>
    );
};
