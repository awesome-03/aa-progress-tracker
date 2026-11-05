import { fetchLiveRuns } from "./api.js";
import { parseSnapshot } from "./parse.js";
import { renderRuns, setStatus } from "./render.js";

const refreshButton = document.querySelector("#refresh");

function describeSnapshot(snapshot){
    const time = new Date(snapshot.fetchedAt).toLocaleTimeString();
    const count = snapshot.runs.length;
    if (count === 0){
        return `No runs to view (checked at ${time}).`;
    }
    return `${count} live ${count === 1 ? "run" : "runs"} · fetched ${time}`;
}

async function refresh(){
    refreshButton.disabled = true;
    setStatus("Loading…");

    try {
        const rawRuns = await fetchLiveRuns();
        const snapshot = parseSnapshot(rawRuns, Date.now());
        renderRuns(snapshot);
        setStatus(describeSnapshot(snapshot));
    } catch (err){
        console.error(err);
        setStatus(`Couldn't load runs (${err.message}). Try again in a moment.`);
    } finally {
        refreshButton.disabled = false;
    }
}

refreshButton.addEventListener("click", refresh);
refresh();
