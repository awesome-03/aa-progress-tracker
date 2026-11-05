import { buildMessage } from "./message/build.js";
import { formatMs } from "./format.js";
import { copyFromButton } from "./copy.js";
import { addPreview } from "./preview.js";

const statusLine = document.querySelector("#status");
const runsContainer = document.querySelector("#runs");
const cardTemplate = document.querySelector("#run-card");

export function setStatus(text, isError = false){
    statusLine.textContent = text;
    statusLine.classList.toggle("error", isError);
}

function headUrl(run){
    return `https://mc-heads.net/avatar/${run.uuid ?? run.nickname}/96`;
}

function nameElement(run){
    if (!run.twitch){
        return document.createTextNode(run.nickname);
    }
    const link = document.createElement("a");
    link.href = `https://twitch.tv/${encodeURIComponent(run.twitch)}`;
    link.target = "_blank";
    link.rel = "noopener";
    link.title = "Watch on Twitch";
    link.textContent = run.nickname;
    return link;
}

function buildCard(run){
    const card = cardTemplate.content.firstElementChild.cloneNode(true);
    const text = buildMessage(run);

    card.querySelector(".head").src = headUrl(run);
    card.querySelector(".name").append(nameElement(run));
    card.querySelector(".igt").textContent = formatMs(run.igt);
    card.querySelector(".count").textContent = `${run.advancements.count}/${run.advancements.total}`;

    const copyButton = card.querySelector(".copy");
    copyButton.addEventListener("click", () => copyFromButton(copyButton, text));

    addPreview(card, run, text);
    return card;
}

export function renderRuns(snapshot){
    runsContainer.replaceChildren();

    if (snapshot.runs.length === 0){
        const empty = document.createElement("p");
        empty.className = "empty";
        empty.textContent = "No AA runs to show, redlime fix plsssss :(";
        runsContainer.append(empty);
        return;
    }

    const runs = [...snapshot.runs].sort((a, b) => b.advancements.count - a.advancements.count);
    for (const run of runs){
        runsContainer.append(buildCard(run));
    }
}
