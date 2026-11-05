import { copyFromButton } from "./copy.js";

const DISCORD_LIMIT = 2000;

let dialog = null;
let shownText = "";

export function addPreview(card, run, text){
    const opener = document.createElement("button");
    opener.type = "button";
    opener.className = "card-open";
    opener.setAttribute("aria-label", `Show ${run.nickname}'s message`);
    opener.addEventListener("click", () => openPreview(card, run, text));
    card.prepend(opener);
}

function openPreview(card, run, text){
    dialog ??= buildDialog();
    shownText = text;

    dialog.querySelector(".head").src = card.querySelector(".head").src;
    dialog.querySelector(".preview-title").textContent = run.nickname;
    dialog.querySelector(".discord").innerHTML = renderDiscord(text);

    const length = dialog.querySelector(".preview-length");
    length.textContent = `${text.length} / ${DISCORD_LIMIT} characters`;
    length.classList.toggle("too-long", text.length > DISCORD_LIMIT);

    dialog.showModal();
}

function buildDialog(){
    const element = document.createElement("dialog");
    element.className = "preview";
    element.innerHTML = `
        <div class="preview-box">
            <header class="preview-header">
                <img class="head" width="40" height="40" alt="">
                <h2 class="preview-title"></h2>
                <button class="preview-close icon-button" type="button" aria-label="Close" title="Close">
                    <span class="icon icon-cross" aria-hidden="true"></span>
                </button>
            </header>
            <div class="discord"></div>
            <footer class="preview-footer">
                <span class="preview-length"></span>
                <button class="copy icon-button" type="button" aria-label="Copy Discord message" title="Copy Discord message">
                    <span class="icon icon-copy" aria-hidden="true"></span>
                    <span class="icon icon-check" aria-hidden="true"></span>
                    <span class="icon icon-cross" aria-hidden="true"></span>
                </button>
            </footer>
        </div>`;

    const copyButton = element.querySelector(".copy");
    copyButton.addEventListener("click", () => copyFromButton(copyButton, shownText));
    element.querySelector(".preview-close").addEventListener("click", () => element.close());
    element.addEventListener("click", event => {
        if (event.target === element){
            element.close();
        }
    });

    document.body.append(element);
    return element;
}

// ----- Discord Markdown Formatter -----

const LINE_STARTS = [
    ["### ", "h3"],
    ["## ", "h2"],
    ["# ", "h1"],
    ["-# ", "subtext"],
    ["> ", "quote"],
];

function renderDiscord(text){
    return text.split("\n").map(renderLine).join("");
}

function renderLine(line){
    const [start, type] = LINE_STARTS.find(([start]) => line.startsWith(start)) ?? ["", ""];
    return `<div class="line ${type}">${renderInline(escapeHtml(line.slice(start.length)))}</div>`;
}

function escapeHtml(text){
    return text
        .replaceAll("&", "&amp;")
        .replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;")
        .replaceAll('"', "&quot;");
}

function protect(text){
    return text.replace(/[\\*_~|`[\]()#-]/g, char => `&#${char.charCodeAt(0)};`);
}

function link(url, text){
    return `<a href="${protect(url)}" target="_blank" rel="noopener noreferrer">${text}</a>`;
}

function renderInline(html){
    return html
        .replace(/\\([\\*_~|`[\]()#-])/g, (match, char) => protect(char))
        .replace(/&lt;t:(-?\d+)(?::([tTdDfFR]))?&gt;/g, (match, seconds, style) =>
            `<span class="timestamp">${discordTimestamp(Number(seconds), style ?? "f")}</span>`)
        .replace(/\[([^\]]+)\]\(&lt;(https?:\/\/\S+?)&gt;\)/g, (match, text, url) => link(url, text))
        .replace(/\[([^\]]+)\]\((https?:\/\/[^\s)]+)\)/g, (match, text, url) => link(url, text))
        .replace(/&lt;(https?:\/\/\S+?)&gt;/g, (match, url) => link(url, protect(url)))
        .replace(/`([^`]+)`/g, "<code>$1</code>")
        .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
        .replace(/__(.+?)__/g, "<u>$1</u>")
        .replace(/\*(.+?)\*/g, "<em>$1</em>")
        .replace(/\b_(.+?)_\b/g, "<em>$1</em>")
        .replace(/~~(.+?)~~/g, "<s>$1</s>")
        .replace(/\|\|(.+?)\|\|/g, '<span class="spoiler">$1</span>');
}

function discordTimestamp(seconds, style){
    const date = new Date(seconds * 1000);
    if (style === "R"){
        return relativeTime(date);
    }
    const formats = {
        t: { timeStyle: "short" },
        T: { timeStyle: "medium" },
        d: { dateStyle: "short" },
        D: { dateStyle: "long" },
        f: { dateStyle: "long", timeStyle: "short" },
        F: { dateStyle: "full", timeStyle: "short" },
    };
    return date.toLocaleString(undefined, formats[style]);
}

function relativeTime(date){
    const formatter = new Intl.RelativeTimeFormat(undefined, { numeric: "auto" });
    const seconds = (date.getTime() - Date.now()) / 1000;
    const units = [["year", 31536000], ["month", 2592000], ["day", 86400], ["hour", 3600], ["minute", 60]];
    for (const [unit, size] of units){
        if (Math.abs(seconds) >= size){
            return formatter.format(Math.round(seconds / size), unit);
        }
    }
    return formatter.format(Math.round(seconds), "second");
}
