import { setDefaults, dependPersist, SSwitch } from "cumcord-tools";

setDefaults({ classic: false });

export default dependPersist(() => (
	<SSwitch k="classic">Use classic style instead of mimicking Nitro</SSwitch>
));
