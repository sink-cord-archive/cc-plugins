const API_ENDPOINT = "https://apertium.org/apy/translate";

export default (text, { from, to }) => {
    const url = new URL(API_ENDPOINT);

    url.searchParams.set("langpair", `${from}|${to}`);
    url.searchParams.set("q", text);

    
    const res = await fetch(url.href);
    const body = await res.json();
    if (!res.ok) {
        if (body.explanation === "That pair is not installed") {
            const error = new Error();
                error.name = "Not supported pair";
                error.code = "NOT_SUPPORTED_PAIR";
                throw error;
        }
        throw res;
    }

    return {
        body.responseData.translatedText,
        lang: from
    }
};
