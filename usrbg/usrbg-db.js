const usrbg_db_url =
    "https://raw.githubusercontent.com/Discord-Custom-Covers/usrbg/master/dist/usrbg.json";

const getDb = async () => {
    let resp = await fetch(usrbg_db_url);
    return await resp.json();
};

const toMap = (rawDb) => {
    let map = new Map();
    for (const entry of rawDb) {
        map.set(entry.uid, entry);
    }
    return map;
};

export default async () => toMap(await getDb());
