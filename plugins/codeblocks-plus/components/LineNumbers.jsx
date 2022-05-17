export default ({ lines }) => (
	<div class="ysink_code_linenumbers">
		{_.range(lines).map((n) => (
			<>
				{n}
				<br />
			</>
		))}
	</div>
);
