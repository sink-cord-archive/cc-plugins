import { useVirtual } from "react-virtual";

export default ({
	items = [],
	children,
	className = "",
	keySel = (e) => e,
	style = {},
} = {}) => {
	const parentRef = React.useRef();

	const rowVirtualiser = useVirtual({
		parentRef,
		size: items.length,
		keyExtractor: keySel,
	});

	return (
		<div
			className={`List ${className}`}
			ref={parentRef}
			style={{ ...style, overflow: "auto" }}
		>
			<div
				className="ListInner"
				style={{
					height: `${rowVirtualiser.totalSize}px`,
					width: "100%",
					position: "relative",
				}}
			>
				{rowVirtualiser.virtualItems.map((vrow) => (
					<div
						key={vrow.key}
						style={{
							position: "absolute",
							top: 0,
							left: 0,
							width: "100%",
							height: `${vrow.height}px`,
							transform: `translateY(${vrow.start}px)`,
						}}
					>
						{children(items[vrow.index])}
					</div>
				))}
			</div>
		</div>
	);
};
