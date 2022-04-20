const usrbg_db_url =
	"https://raw.githubusercontent.com/Discord-Custom-Covers/usrbg/master/dist/usrbg.json";

const getDb = async () => await (await fetch(usrbg_db_url)).json();

const toMap = rawDb => {
	const map = new Map();
	for (const entry of rawDb) map.set(entry.uid, entry);
	return map;
};

export default async () => toMap(await getDb());
