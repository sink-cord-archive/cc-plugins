import { dependPersist, setDefaults, SSwitch } from "cumcord-tools";

setDefaults({ scroll: true, scrollSmooth: true });

export default dependPersist(() => (
	<>
		<SSwitch k="scroll">
			Scroll to keep the replying-to message on-screen
		</SSwitch>
		<SSwitch k="scrollSmooth" depends="scroll">
			Scroll smoothly
		</SSwitch>
	</>
));
