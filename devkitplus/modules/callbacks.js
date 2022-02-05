export default () => {
    if (window.DiscordNative)
        DiscordNative.window.setDevtoolsCallbacks(
            () => {},
            () => {}
        );
};
