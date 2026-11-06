import { fetchLiveRuns } from "./api.js";
import { parseSnapshot } from "./parse.js";
import { renderRuns, setStatus } from "./render.js";
import { timeAgo } from "./format.js";
import { setupThemeToggle } from "./theme.js";

const refreshButton = document.querySelector("#refresh");
const refreshIcon = refreshButton.querySelector(".icon");

let fetchedAt = null;

function showLastUpdated(){
    if (fetchedAt === null){
        return;
    }
    const age = Date.now() - fetchedAt;
    setStatus(`Last updated: ${age < 5000 ? "just now" : `${timeAgo(age)} ago`}`);
}

async function refresh(){
    refreshButton.disabled = true;
    if (fetchedAt === null){
        setStatus("Loading…");
    }

    try {
        const rawRuns = await fetchLiveRuns();
        const snapshot = parseSnapshot(rawRuns, Date.now());
        renderRuns(snapshot);
        fetchedAt = snapshot.fetchedAt;
        showLastUpdated();
    } catch (err){
        console.error(err);
        fetchedAt = null;
        setStatus(`Couldn't load runs (${err.message})`, true);
    } finally {
        refreshButton.disabled = false;
    }
}

function spinIcon(){
    if (matchMedia("(prefers-reduced-motion: reduce)").matches){
        return;
    }
    refreshIcon.animate(
        [{ transform: "rotate(0deg)" }, { transform: "rotate(360deg)" }],
        { duration: 350, easing: "ease" },
    );
}

setupThemeToggle();
refreshButton.addEventListener("click", () => {
    spinIcon();
    refresh();
});
setInterval(showLastUpdated, 1000);
refresh();
