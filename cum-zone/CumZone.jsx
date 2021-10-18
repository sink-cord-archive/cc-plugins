import { findByDisplayName } from "@cumcord/modules/webpack";
const FormTitle = findByDisplayName("FormTitle");
const FormText = findByDisplayName("FormText");
const FormSection = findByDisplayName("FormSection");
const FormDivider = findByDisplayName("FormDivider");
const Flex = findByDisplayName("Flex");
import getPlugins from "./pluginFetcher.js";
import Ticker from "./CopyPastaTicker.jsx";

const combinePluginLists = (repos) =>
    repos.map(getPlugins).reduce((c, n) => c.concat(n));

export default ({ repos }) => (
    <FormSection>
        <FormTitle tag="h1">Welcome to the Cum Zone</FormTitle>
        <Ticker />

        {combinePluginLists(repos).map((p) => (
            <FormText>{p.name}</FormText>
        ))}
    </FormSection>
);
