// look i made a react hook!
import { findByProps } from "@cumcord/modules/webpack";
import { useEffect } from "@cumcord/modules/common/React";

const optionClass = findByProps("selectPositionTop").option;

export default wrapperRef => {
	useEffect(() => {
		if (wrapperRef?.current?.firstChild?.onclick)
			wrapperRef.current.firstChild.onclick = scrollSoon;
	});
};

// this annoys me
export const scrollSoon = () => {
	setTimeout(scrollNow, 25);
	setTimeout(scrollNow, 50);
	setTimeout(scrollNow, 75);
	setTimeout(scrollNow, 100);
};

export const scrollNow = () => {
	const elems = Array.from(document.getElementsByClassName(optionClass));
	const elemI = elems.findIndex(m => m.ariaSelected === "true");

	if (elemI === -1) return;

	const elemHeight = elems[0].scrollHeight;

	const parentElem = elems[0].parentElement;

	parentElem.scroll(0, elemHeight * Math.max(0, elemI - 3));
};
