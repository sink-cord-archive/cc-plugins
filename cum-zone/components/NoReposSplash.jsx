import resetReposToDefault from "../defaultRepos.js";
import { Button, FormSection, FormTitle } from "../WPMODULES.js";

export default () => (
	<FormSection className="ysink_zone_splash">
		<FormTitle tag="h2">No Repos!</FormTitle>
		<FormText>You do not have any repos added!</FormText>
		<Button
			className="ysink_zone_button"
			color={Button.Colors.GREEN}
			sizes={Button.Sizes.LARGE}
			onClick={resetReposToDefault}
		>
			Reset repo list to default
		</Button>
	</FormSection>
);
