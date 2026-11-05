import { buildDump } from "./message.js";
import { timeAgo } from "./format.js";

const statusLine = document.querySelector("#status");
const runsContainer = document.querySelector("#runs");
const cardTemplate = document.querySelector("#run-card");

// Set the message of the paragraph in header
export function setStatus(text){
    statusLine.textContent = text;
}

// Fill a single card with the template
function buildCard(run, fetchedAt){
    const card = cardTemplate.content.cloneNode(true);
    const text = buildDump(run, fetchedAt);

    card.querySelector(".name").textContent = run.nickname;
    card.querySelector(".meta").textContent = `Last update ${timeAgo(fetchedAt - run.lastUpdated)} ago`;
    card.querySelector(".message").value = text;

    const copyButton = card.querySelector(".copy");
    const textarea = card.querySelector(".message");
    copyButton.addEventListener("click", () => copyText(text, textarea, copyButton));

    return card;
}

// Build all cards
export function renderRuns(snapshot){
    runsContainer.replaceChildren();

    const runs = [...snapshot.runs].sort((a, b) => b.advancements.count - a.advancements.count);
    for (const run of runs){
        runsContainer.append(buildCard(run, snapshot.fetchedAt));
    }
}

async function copyToClipboard(text, textarea){
    try {
        await navigator.clipboard.writeText(text);
        return true;
    } catch (err){
        console.error(`Can't copy area: ${err}`);
    }
}

async function copyText(text, textarea, button){
    const copied = await copyToClipboard(text, textarea);
    button.textContent = copied ? "Copied!" : "Failed to copy idk";
    setTimeout(() => {
        button.textContent = "Copy";
    }, 1500);
}
