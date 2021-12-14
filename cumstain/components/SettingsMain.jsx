import { findByDisplayName, findByProps } from "@cumcord/modules/webpack";

import { ErrorBoundary } from "@cumcord/ui/components";
import TabBar from "./TabBar";
import TabInstalled from "./TabInstalled";
import TabQuickCSS from "./TabQuickCSS";
import TabStore from "./TabStore";
const FormTitle = findByDisplayName("FormTitle");
const FormSection = findByDisplayName("FormSection");
const FormText = findByDisplayName("FormText");

export default () => {
    return (
        <ErrorBoundary>
            <FormSection>
                <div class="ysink_stain_titlerow">
                    <FormTitle tag="h1">Cumstain Settings</FormTitle>
                    <FormText className="ysink_stain_vertxt">
                        You are running Cumstain pre0.1
                    </FormText>
                </div>

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
