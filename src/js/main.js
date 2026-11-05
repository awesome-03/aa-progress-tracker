import { fetchLiveRuns } from "./api.js";

const rawRuns = await fetchLiveRuns();
console.log(rawRuns);
