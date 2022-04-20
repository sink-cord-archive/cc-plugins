import { Button, FormSection, FormText, FormTitle } from "../WPMODULES";

const Splash = ({ title, subtitle, onClick, btnText }) => (
	<FormSection className="ysink_stain_nosplash">
		<FormTitle tag="h2">{title}</FormTitle>
		<FormText>{subtitle}</FormText>
		<Button
			className="ysink_stain_button"
			color={Button.Colors.GREEN}
			sizes={Button.Sizes.LARGE}
			onClick={onClick}
		>
			{btnText}
		</Button>
	</FormSection>
);

export const NoRepos = ({ goToRepos }) => (
	<Splash
		title="No Repos"
		subtitle="Add one in the repo manager!"
		onClick={goToRepos}
		btnText="Open repo manager"
	/>
);

export const NoThemes = ({ goToStore }) => (
	<Splash
		title="No Themes"
		subtitle="Paste a link in above, or head over to the store"
		onClick={goToStore}
		btnText="Get some themes"
	/>
);
