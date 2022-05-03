const usrbg_db_url =
	"https://raw.githubusercontent.com/Discord-Custom-Covers/usrbg/master/dist/usrbg.json";

const getDb = () => fetch(usrbg_db_url).then((r) => r.json());

const toMap = (rawDb: DbEntry[]) => new Map(rawDb.map((e) => [e.uid, e]));

export default (): Promise<UsrbgDb> => getDb().then(toMap);

type DbEntry = { _id: number; uid: number; img: string; orientation?: "none" };

export type UsrbgDb = Map<number, DbEntry>;
