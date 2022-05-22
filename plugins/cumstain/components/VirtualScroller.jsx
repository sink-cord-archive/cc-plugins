import { useVirtual } from "react-virtual";

export default ({ items, children, keySel, height, className }) => {
	const parentRef = React.useRef();

	if (!height && items.length > 100)
		console.warn(
			"|| ys VirtualScroller || >100 items & no height, react err likely"
		);

	const rowVirtualiser = useVirtual({
		parentRef,
		size: items.length,
		keyExtractor: (i) => keySel(items[i]),
	});

	return (
		/* OUTER */
		<div
			ref={parentRef}
			style={{ overflow: "auto", height }}
			className={className}
		>
			{/* INNER */}
			<div
				style={{
					height: rowVirtualiser.totalSize,
					width: "100%",
					position: "relative",
				}}
			>
				{rowVirtualiser.virtualItems.map((vrow) => (
					<div
						ref={vrow.measureRef}
						key={vrow.key}
						style={{
							position: "absolute",
							top: 0,
							left: 0,
							width: "100%",
							height: vrow.height,
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
