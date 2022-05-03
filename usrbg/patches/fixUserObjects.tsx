// The following code much adapted from the GooseMod module by Ducko
// originally licensed under MIT, available at
// https://github.com/GooseMod-Modules/User-Backgrounds/blob/e49ac4153af3e7dcae0f5a173b9c5d0e3ff69253/index.js

import { findByDisplayName } from "@cumcord/modules/webpack";
import { after, findAndPatch } from "@cumcord/patcher";
import { UsrbgDb } from "../usrbg-db";
import { UserPopoutContainerMemo } from "../WPMODULES";

export default (db: UsrbgDb) => {
	// if the user is in the DB, set user.banner to make discord apply premium styles
	const unpatchContainer = after(
		"type",
		UserPopoutContainerMemo,
		(_, { props: { user } }) => {
			if (db.has(user.id)) user.banner ??= "_";
		}
	);

	// async patching my favourite
	const unpatchProfileModal = findAndPatch(
		() => findByDisplayName("UserProfileModalHeader", false),
		(UserProfileModal) =>
			after("default", UserProfileModal, ([{ user }]) => {
				if (db.has(user.id)) user.banner ??= "_";
			})
	);

	return () => {
		unpatchContainer();
		unpatchProfileModal();
	};
};
