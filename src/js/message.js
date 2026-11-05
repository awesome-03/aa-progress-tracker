import { formatMs, timeAgo, prettyId, advancementName, eventName } from "./format.js";

function describeSection(section){
    if (!section){
        return "no data";
    }
    return Object.entries(section.parts)
        .map(([part, done]) => `${part} ${done ? "done" : "missing"}`)
        .join(", ");
}

export function buildDump(run, fetchedAt){
    const lines = [];

    lines.push(run.nickname);
    lines.push(`Twitch: ${run.twitch ?? "none"}`);
    lines.push(`UUID: ${run.uuid}`);
    lines.push(`World: ${run.worldId}`);
    lines.push(`IGT: ${formatMs(run.igt)} (updated ${timeAgo(fetchedAt - run.lastUpdated)} ago)`);

    lines.push("");
    lines.push(`Advancements ${run.advancements.count}/${run.advancements.total}`);
    for (const advancement of run.advancements.list){
        lines.push(`  ${formatMs(advancement.igt)}  ${advancementName(advancement.id)}`);
    }
    lines.push(`  Missing: ${run.advancements.missing.map(advancementName).join(", ") || "none"}`);

    lines.push("");
    lines.push("Events");
    for (const event of run.events.list){
        lines.push(`  ${formatMs(event.igt)}  ${eventName(event.id)}`);
    }

    for (const [key, list] of Object.entries(run.criteria)){
        lines.push("");
        lines.push(`${key} ${list.count}/${list.total}`);
        lines.push(`  Done: ${list.done.map(prettyId).join(", ") || "none"}`);
        lines.push(`  Missing: ${list.missing.map(prettyId).join(", ") || "none"}`);
    }

    lines.push("");
    lines.push("Items");
    for (const [key, value] of Object.entries(run.items)){
        lines.push(`  ${key}: ${value}`);
    }

    lines.push("");
    lines.push("Sections");
    for (const [name, section] of Object.entries(run.sections)){
        lines.push(`  ${name}: ${describeSection(section)}`);
    }

    return lines.join("\n");
}
