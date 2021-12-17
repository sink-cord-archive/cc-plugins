import { findByDisplayName, findByProps } from "@cumcord/modules/webpack";

import { ErrorBoundary } from "@cumcord/ui/components";
import TabBar from "./tabs/TabBar";
import TabInstalled from "./tabs/TabInstalled";
import TabQuickCSS from "./tabs/TabQuickCSS";
import TabStore from "./tabs/TabStore";
const FormTitle = findByDisplayName("FormTitle");
const FormSection = findByDisplayName("FormSection");
const FormText = findByDisplayName("FormText");

export default () => {
    return (
        <ErrorBoundary>
            <FormSection>
                <FormTitle tag="h1">Cumstain Settings</FormTitle>

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
