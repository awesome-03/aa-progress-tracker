import { ADVANCEMENTS, CRITERIA, SECTION_PARTS } from "./constants/1.16.1-aa.js";

const ADVANCEMENT_IDS = Object.keys(ADVANCEMENTS);

export function progress(doneIds, allIds){
    const doneSet = new Set(doneIds);
    return {
        count: doneIds.length,
        total: allIds.length,
        done: doneIds,
        missing: allIds.filter(id => !doneSet.has(id)),
    };
}

function parseTimed(entries){
    const list = entries
        .map(entry => ({ id: entry.eventId, igt: entry.igt, rta: entry.rta }))
        .sort((a, b) => a.igt - b.igt);
    const times = Object.fromEntries(list.map(entry => [entry.id, entry.igt]));
    return { list, times };
}

function parseSection(name, missingIndexes){
    const parts = {};
    SECTION_PARTS[name].forEach((part, index) => {
        parts[part] = !missingIndexes.includes(index);
    });
    return { complete: missingIndexes.length === 0, parts };
}

export function parseRun(raw){
    const advancements = parseTimed(raw.completed ?? []);
    const advancementIds = advancements.list.map(advancement => advancement.id);
    const criteria = {};
    for (const key of Object.keys(CRITERIA)){
        criteria[key] = progress(raw.criterias?.[key] ?? [], CRITERIA[key]);
    }
    const sections = {};
    for (const name of Object.keys(SECTION_PARTS)){
        const missingIndexes = raw.context?.[name];
        sections[name] = Array.isArray(missingIndexes) ? parseSection(name, missingIndexes) : null;
    }


    return {
        worldId: raw.worldId,
        nickname: raw.nickname,
        uuid: raw.user?.uuid ?? null,
        twitch: raw.user?.liveAccount ?? null,
        igt: raw.currentTime ?? 0,
        lastUpdated: raw.lastUpdated ?? 0,
        advancements: { ...progress(advancementIds, ADVANCEMENT_IDS), ...advancements },
        events: parseTimed(raw.eventList ?? []),
        criteria,
        items: {
            godApple: raw.items?.has_enchanted_golden_apple ?? false,
            skulls: raw.items?.skulls ?? 0,
            debris: raw.items?.ancient_debris ?? 0,
            goldBlocks: raw.items?.gold_blocks ?? 0,
            shells: raw.context?.shells ?? 0,
        },
        sections,
    };
}

export function parseSnapshot(rawRuns, fetchedAt){
    const runs = rawRuns
        .filter(raw => !raw.isCheated && !raw.isHidden)
        .map(parseRun);
    return { fetchedAt, runs };
}
