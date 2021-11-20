import { findByDisplayName, findByProps } from "@cumcord/modules/webpack";

import { ErrorBoundary } from "@cumcord/ui/components";
import TabBar from "./TabBar";
import Store from "./Store";
const FormTitle = findByDisplayName("FormTitle");
const FormSection = findByDisplayName("FormSection");

export default () => {
    return (
        <ErrorBoundary>
            <FormSection>
                <FormTitle tag="h1">Cumstain</FormTitle>

                <TabBar
                    items={[
                        {
                            text: "Store",
                            component: Store,
                        },
                        {
                            text: "Installed",
                            component: () => <div>installed</div>,
                        },
                    ]}
                />
            </FormSection>
        </ErrorBoundary>
    );
};
