import TabInstalled from "./tabs/TabInstalled";
import TabQuickCSS from "./tabs/TabQuickCSS";
import TabRepo from "./tabs/TabRepo";
import TabStore from "./tabs/TabStore";
import TabDebug from "./tabs/TabDebug";

import { ErrorBoundary } from "@cumcord/ui/components";
import TabBar from "./TabBar";
import { FormSection, FormTitle } from "../WPMODULES";

export default () => {
	return (
		<ErrorBoundary>
			<FormSection>
				<FormTitle tag="h1">Cumstain Settings</FormTitle>

				<TabBar
					items={[
						{ text: "Installed", component: TabInstalled },
						{ text: "Store", component: TabStore },
						{ text: "Repos", component: TabRepo },
						{ text: "Quick CSS", component: TabQuickCSS },
						{ text: "Debug", component: TabDebug },
					]}
				/>
			</FormSection>
		</ErrorBoundary>
	);
};
