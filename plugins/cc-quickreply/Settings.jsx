import { dependPersist, setDefaults, SSwitch } from "cumcord-tools";

setDefaults({ scroll: true, scrollSmooth: true, noPing: false });

export default dependPersist(() => (
	<>
		<SSwitch k="scroll">
			Scroll to keep the replying-to message on-screen
		</SSwitch>
		<SSwitch k="scrollSmooth" depends="scroll">
			Scroll smoothly
		</SSwitch>
		<SSwitch k="noPing">
			Don't ping the original author of your reply by default
		</SSwitch>
	</>
));
