import { dependPersist, SSwitch, setDefaults } from "cumcord-tools";

setDefaults({
	nitroBanner: true,
});

export default dependPersist(() => (
	<SSwitch k="nitroBanner">Prioritise Nitro banner</SSwitch>
));
