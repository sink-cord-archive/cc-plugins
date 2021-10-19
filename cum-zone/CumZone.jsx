import { findByDisplayName } from "@cumcord/modules/webpack";
import { ErrorBoundary } from "@cumcord/ui/components";
import getPlugins from "./pluginFetcher.js";
import Ticker from "./CopyPastaTicker.jsx";
import PluginCard from "./PluginCard.jsx";
const FormTitle = findByDisplayName("FormTitle");
const FormText = findByDisplayName("FormText");
const FormSection = findByDisplayName("FormSection");

const combinePluginLists = (repos) =>
    repos.map(getPlugins).reduce((c, n) => c.concat(n));

export default ({ repos }) => (
    <ErrorBoundary>
        <FormSection>
            <FormTitle tag="h1">Welcome to the Cum Zone</FormTitle>
            <Ticker />

            <div className="ysink_card_container">
                {combinePluginLists(repos).map((p) => (
                    <PluginCard plugin={p} />
                ))}
            </div>
        </FormSection>
    </ErrorBoundary>
);
