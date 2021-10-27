import { findByProps, findByDisplayName } from "@cumcord/modules/webpack";
import { ErrorBoundary } from "@cumcord/ui/components";
import PaletteItem from "./PaletteItem.jsx";
import PaletteMd from "./PaletteMd.jsx";

const useState = React.useState;
const { openModal } = findByProps("openModalLazy");
const ModalComponents = findByProps("ModalCloseButton");
const TextInput = findByDisplayName("TextInput");

const Component = ({ e, prompt, finishAction, closeAction, markdown }) => {
    let [input, setInput] = useState("");

    return (
        <ErrorBoundary>
            <ModalComponents.ModalRoot
                transitionState={e.transitionState}
                size="small"
                className="ysink_palette_modal ysink_palette_textentrymodal"
                onKeyDown={(k) => {
                    if (k.which != 13) return;
                    e.onClose();
                    finishAction(input);
                }}
            >
                <ModalComponents.ModalContent className="ysink_palette_palette">
                    {!markdown ? [] : <PaletteMd>{markdown}</PaletteMd>}

                    <div className="ysink_palette_input_wrapper">
                        &gt;
                        <TextInput
                            className="ysink_palette_input"
                            placeholder={prompt}
                            type="text"
                            value={input}
                            onChange={(e) => setInput(e)}
                            onBlur={() => closeAction()}
                        />
                    </div>
                </ModalComponents.ModalContent>
            </ModalComponents.ModalRoot>
        </ErrorBoundary>
    );
};

const openTextEntry = (prompt, finishAction, markdown, closeAction) =>
    openModal((e) => (
        <Component {...{ e, prompt, finishAction, markdown, closeAction }} />
    ));

const openTextEntryPromise = (prompt, markdown) =>
    new Promise((resolve, reject) => {
        openTextEntry(prompt, resolve, markdown, () =>
            reject("user closed textentry")
        );
    });

export default openTextEntryPromise;
export { openTextEntry, openTextEntryPromise };
