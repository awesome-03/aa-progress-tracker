import { fetchLiveRuns } from "./api.js";
import { parseSnapshot } from "./parse.js";
import { buildDump } from "./message.js";

const rawRuns = await fetchLiveRuns();
const snapshot = parseSnapshot(rawRuns, Date.now());
console.log(snapshot);

// test formatting
console.table(snapshot.runs.map(run => ({
    name: run.nickname,
    advancements: run.advancements.count,
    elytra: run.advancements.times["end/elytra"],
    biomes: run.criteria.biomes.count,
    cats: run.criteria.catsTamed.count,
    shells: run.items.shells,
})));

window.debug = { snapshot };

console.log(buildDump(snapshot.runs[0], snapshot.fetchedAt));
