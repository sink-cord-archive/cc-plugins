import { showToast } from "@cumcord/ui/toasts";
import { copyText } from "@cumcord/utils";
import { guildsCanManageEmotes, uploadEmoji } from "./discordTools.js";
import showCreateModal from "./CreateModal.jsx";
import { MenuItem } from "./WPMODULES.js";

const newName = (emoteAlt) => emoteAlt?.substring(1, emoteAlt.length - 1);

export default ({ isEmote, emoteAlt, url }) => (
	<>
		<MenuItem
			id="ysink_emoji_msgitem"
			label={isEmote ? `Clone Emote ${emoteAlt}` : "Create Emote"}
		>
			{guildsCanManageEmotes().map((guild) => (
				<MenuItem
					label={guild.name}
					id={`ysink_emoji_server_${guild.id}`}
					action={() => {
						if (isEmote) {
							const emoteNewName = newName(emoteAlt);
							uploadEmoji(guild.id, url, emoteNewName);
							showToast({
								title: `cloned emote ${emoteNewName}`,
								duration: 3000,
							});
						} else showCreateModal(guild.id, url);
					}}
				/>
			))}
		</MenuItem>
		<MenuItem
			label="Copy URL"
			id="ysink_emoji_copyitem"
			action={() => {
				copyText(url);
				showToast({
					title: `Copied url for ${newName(emoteAlt)}`,
					duration: 3000,
				});
			}}
		/>
	</>
);
