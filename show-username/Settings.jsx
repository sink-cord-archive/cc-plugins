import { dependPersist, SSwitch, setDefaults } from "cumcord-tools";

setDefaults({
	vc: true,
	ml: true,
	msg: true,
});

export default dependPersist(() => (
	<>
		<SSwitch k="vc">Show usernames in Voice Chat</SSwitch>
		<SSwitch k="ml">Show usernames in Member List</SSwitch>
		<SSwitch k="msg">Show usernames in Member List</SSwitch>
	</>
));
