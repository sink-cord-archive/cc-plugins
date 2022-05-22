import MediaCarousel from "./MediaCarousel";
import { openModal, ModalComponents } from "../WPMODULES";
import { ErrorBoundary } from "@cumcord/ui/components";

const Comp = ({ e, media }) => (
	<ErrorBoundary>
		<ModalComponents.ModalRoot transitionState={e.transitionState} size="large">
			<ModalComponents.ModalHeader separator={false}>
				<div style={{ flex: 1 }} />
				<ModalComponents.ModalCloseButton onClick={e.onClose} />
			</ModalComponents.ModalHeader>

			<ModalComponents.ModalContent>
				<div style={{ marginBottom: "1rem" }}>
					<MediaCarousel media={media} />
				</div>
			</ModalComponents.ModalContent>
		</ModalComponents.ModalRoot>
	</ErrorBoundary>
);

export default (media) => openModal((e) => <Comp {...{ e, media }} />);
