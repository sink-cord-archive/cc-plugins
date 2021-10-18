import { findByDisplayName } from "@cumcord/modules/webpack"
const FormTitle = findByDisplayName("FormTitle");
const FormText = findByDisplayName("FormText");
const FormSection = findByDisplayName("FormSection");
const FormDivider = findByDisplayName("FormDivider");
const Flex = findByDisplayName("Flex");
import getPlugins from "./pluginFetcher.js";
import Ticker from "./CopyPastaTicker.jsx"

export default (({ repos }) =>
    <FormSection>
        <FormTitle tag="h1">Welcome to the Cum Zone</FormTitle>
        <Ticker />

        {repos.map(repo => (
            <FormSection>
                <FormTitle tag="h2">{repo}</FormTitle>
                {getPlugins(repo).map(p => <FormText>{p.name}</FormText>)}
                <FormDivider />
            </FormSection>
        ))}
    </FormSection>
);