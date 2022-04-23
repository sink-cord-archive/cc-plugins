const usrbg_db_url =
	"https://raw.githubusercontent.com/Discord-Custom-Covers/usrbg/master/dist/usrbg.json";

// async but who's counting? - oh yeah typescript is but im not using it.
const getDb = () => fetch(usrbg_db_url).then((r) => r.json());

const toMap = (rawDb) => new Map(rawDb.map((e) => [e.uid, e]));

export default async () => toMap(await getDb());
