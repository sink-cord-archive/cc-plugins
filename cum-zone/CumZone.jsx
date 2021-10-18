import { findByDisplayName } from "@cumcord/modules/webpack"
const FormTitle = findByDisplayName("FormTitle");
const FormSection = findByDisplayName("FormSection");
const Flex = findByDisplayName("Flex");

export default (({ repos }) =>
    <div>
        <h1>Welcome to the Cum Zone</h1>
        <h2>Only cum inside anime girls</h2>

        <ul>
            {repos.map(repo => <li><p>{repo.toString()}</p></li>)}
        </ul>
    </div>
);