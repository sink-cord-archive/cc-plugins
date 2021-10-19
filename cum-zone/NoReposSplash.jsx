import { findByProps, findByDisplayName } from "@cumcord/modules/webpack";

const FormTitle = findByDisplayName("FormTitle");
const FormText = findByDisplayName("FormText");
const FormSection = findByDisplayName("FormSection");
const Button = findByProps("Sizes", "Colors", "Looks", "DropdownSizes");

const defaultRepos = [
    {
        url: "https://cumcordplugins.github.io/Condom/plugins-large.json",
        name: "Condom",
        enabled: true,
        official: true,
    },
];

function resetReposToDefault(store) {
    store.repos = defaultRepos;
}

const component = ({ store }) => (
    <FormSection className="ysink_splash">
        <FormTitle tag="h2">No Repos!</FormTitle>
        <FormText>You do not have any repos added!</FormText>
        <Button
            className="ysink_button"
            color={Button.Colors.GREEN}
            sizes={Button.Sizes.LARGE}
            onClick={() => resetReposToDefault(store)}
        >
            Reset repo list to default
        </Button>
    </FormSection>
);

export default component;
export { component, resetReposToDefault };
