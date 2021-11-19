import { findByDisplayName, findByProps } from "@cumcord/modules/webpack";
import { persist } from "@cumcord/pluginData";
import { useNest } from "@cumcord/utils";

import { ErrorBoundary } from "@cumcord/ui/components";
const FormTitle = findByDisplayName("FormTitle");
const FormText = findByDisplayName("FormText");
const FormSection = findByDisplayName("FormSection");
const FormDivider = findByDisplayName("FormDivider");
const Button = findByProps("Sizes", "Colors", "Looks", "DropdownSizes");
const TextInput = findByDisplayName("TextInput");

export default () => {
    useNest(persist);

    return (
        <ErrorBoundary>
            <FormSection>
                <FormTitle tag="h1">Cumstain</FormTitle>

                {(persist.ghost.themes ?? []).map((theme) => (
                    <FormText>{theme.name}</FormText>
                ))}
            </FormSection>
        </ErrorBoundary>
    );
};
