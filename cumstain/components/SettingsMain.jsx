import { findByDisplayName, findByProps } from "@cumcord/modules/webpack";

import { ErrorBoundary } from "@cumcord/ui/components";
import TabBar from "./TabBar";
import TabInstalled from "./TabInstalled";
import TabQuickCSS from "./TabQuickCSS";
import TabStore from "./TabStore";
const FormTitle = findByDisplayName("FormTitle");
const FormSection = findByDisplayName("FormSection");

export default () => {
    return (
        <ErrorBoundary>
            <FormSection>
                <FormTitle tag="h1">Cumstain</FormTitle>

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
