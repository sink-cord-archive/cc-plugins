import { dependPersist, SSwitch, setDefaults } from "cumcord-tools";

setDefaults({
	assign: true,
	otp: false,
	startupDev: true,
	disableCallbacks: true,
});

export default dependPersist(() => (
	<>
		<SSwitch k="assign">Assign modules, utils, patcher to window</SSwitch>
		<SSwitch k="otp" depends="assign">
			Make exported patcher functions one time by default
		</SSwitch>
		<SSwitch k="startupDev">Enable Cumcord dev mode on start</SSwitch>
		<SSwitch k="disableCallbacks">Disable DevTools "Wait!" logs</SSwitch>
	</>
));
