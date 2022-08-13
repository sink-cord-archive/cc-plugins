// floating window component adapted for react from webfps

import { React, ReactDOM } from "@cumcord/modules/common";

const Comp = ({ children }) => {
	const [[x, y], setXY] = React.useState([50, 50]);

	const [[draggingX, draggingY], setDraggingXY] = React.useState([]);
	const movableRef = React.useRef();

	const listener = (e) => {
		if (!draggingX) return;
		setXY([e.clientX - draggingX, e.clientY - draggingY]);
	};

	React.useEffect(() => {
		window.addEventListener("mousemove", listener);
		return () => window.removeEventListener("mousemove", listener);
	});

	return (
		<div
			ref={movableRef}
			style={{
				position: "fixed",
				left: `${x}px`,
				top: `${y}px`,
				pointerEvents: "none",
				zIndex: 999,
			}}
		>
			<div
				style={{
					background: "#000c",
					color: "#fff",
					padding: ".5rem",
					position: "relative",
				}}
			>
				<div
					style={{
						margin: "5px",
						height: "1.25rem",
						pointerEvents: "all",
					}}
				>
					<div
						style={{
							float: "right",
							width: "2rem",
							height: "1.25rem",
							background:
								"repeating-conic-gradient(#808080 0% 25%, transparent 0% 50%) 50% / 2px 2px",
							cursor: draggingX ? "grabbing" : "grab",
						}}
						onMouseDown={(ev) =>
							setDraggingXY([
								ev.clientX - movableRef.current.offsetLeft,
								ev.clientY - movableRef.current.offsetTop,
							])
						}
						onMouseUp={() => setDraggingXY([])}
					/>
				</div>

				<div>{children}</div>
			</div>
		</div>
	);
};

export default (children) => {
	const elem = document.createElement("div");
	document.body.appendChild(elem);
	ReactDOM.render(<Comp>{children}</Comp>, elem);

	return () => {
		ReactDOM.unmountComponentAtNode(elem);
		elem.remove();
	};
};
