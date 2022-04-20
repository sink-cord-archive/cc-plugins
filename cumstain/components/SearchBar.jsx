import { SearchBar } from "../WPMODULES";

export default ({ query, onChange }) => (
	<SearchBar
		className="ysink_stain_searchbar"
		query={query}
		onQueryChange={onChange}
		placeholder="Search themes..."
		size={SearchBar.Sizes.MEDIUM}
	/>
);
