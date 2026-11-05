import { ADVANCEMENTS, CRITERIA, EVENTS, SECTION_PARTS, BIOME_GROUPS, TARGETS } from "../constants/1.16.1-aa.js";
import { formatMs, prettyId, advancementName, eventName } from "../format.js";
import { progress } from "../parse.js";
import { SYMBOLS } from "./template.js";

// ✅ or ❌
function mark(done){
    return done ? SYMBOLS.done : SYMBOLS.notDone;
}

// 22:00, or -
function time(ms){
    return ms === null ? SYMBOLS.notYet : formatMs(ms);
}

// X/8
function count(done, total){
    return `${done}/${total}`;
}

// X/8, then ✅ if all are done
function countOrDone(done, total){
    return done >= total ? SYMBOLS.done : count(done, total);
}

// ❌ for none, 🟨 for some, ✅ if all are done
function partialMark(done, total){
    if (done === 0){
        return SYMBOLS.notDone;
    }
    return done >= total ? SYMBOLS.done : SYMBOLS.partial;
}

function names(ids, toName){
    return ids.length > 0 ? ids.map(toName).join(SYMBOLS.separator) : null;
}

// The IGT of an event
function timeOf(run, id){
    return run.advancements.times[id] ?? run.events.times[id] ?? null;
}

function isDone(run, id){
    return timeOf(run, id) !== null;
}

// Has this been visited, killed, bred etc.
function has(run, listKey, id){
    return run.criteria[listKey].done.includes(id);
}

function group(run, listKey, ids){
    return partialMark(ids.filter(id => has(run, listKey, id)).length, ids.length);
}

function listProgress(run, listKey){
    const list = run.criteria[listKey];
    return countOrDone(list.count, list.total);
}

function howMany(...checks){
    return checks.filter(Boolean).length;
}

function latest(list, toName){
    const entry = list.at(-1);
    return entry ? `${toName(entry.id)} (${formatMs(entry.igt)})` : null;
}

function escapeMarkdown(text){
    return text.replace(/[\\*_~|`]/g, "\\$&");
}

function twitchUrl(run){
    return `https://twitch.tv/${encodeURIComponent(run.twitch)}`;
}

// minutes ago timestamp
function discordTime(ms, style){
    return `<t:${Math.floor(ms / 1000)}:${style}>`;
}

export const PLACEHOLDERS = {
    player: run => run.twitch ? `[${escapeMarkdown(run.nickname)}](<${twitchUrl(run)}>)` : escapeMarkdown(run.nickname),
    name: run => escapeMarkdown(run.nickname),
    twitch: run => run.twitch ? `[Twitch](<${twitchUrl(run)}>)` : null,
    stats: run => `[PaceMan stats](<https://paceman.gg/stats/player/${encodeURIComponent(run.nickname)}/aa/>)`,

    // time
    igt: run => formatMs(run.igt),
    updated: run => discordTime(run.lastUpdated, "R"),
    updatedAt: run => discordTime(run.lastUpdated, "t"),

    // advancements
    advancements: run => count(run.advancements.count, run.advancements.total),
    advancementsLeft: run => String(run.advancements.missing.length),
    latestAdvancement: run => latest(run.advancements.list, advancementName),
    latestEvent: run => latest(run.events.list, eventName),

    // splits
    nether: run => time(timeOf(run, "rsg.enter_nether")),
    bastion: run => time(timeOf(run, "rsg.enter_bastion")),
    fortress: run => time(timeOf(run, "rsg.enter_fortress")),
    stronghold: run => time(timeOf(run, "rsg.enter_stronghold")),
    end: run => time(timeOf(run, "rsg.enter_end")),
    elytra: run => time(timeOf(run, "end/elytra")),
    credits: run => time(timeOf(run, "rsg.credits")),
    firstCat: run => {
        const firstTame = timeOf(run, "husbandry/tame_an_animal");
        return run.criteria.catsTamed.count > 0 && firstTame !== null ? `~${formatMs(firstTame)}` : SYMBOLS.notYet;
    },

    // big deals
    godApple: run => mark(run.items.godApple),
    trident: run => mark(run.sections.thunder?.parts.trident ?? false),
    vvf: run => mark(isDone(run, "adventure/very_very_frightening")),
    wither: run => mark(isDone(run, "nether/summon_wither")),

    // item counts
    shells: run => countOrDone(run.items.shells, TARGETS.shells),
    skulls: run => isDone(run, "nether/summon_wither") ? SYMBOLS.done : countOrDone(run.items.skulls, TARGETS.skulls),
    debris: run => isDone(run, "nether/netherite_armor") && isDone(run, "husbandry/obtain_netherite_hoe")
        ? SYMBOLS.done
        : countOrDone(run.items.debris, TARGETS.debris),
    goldBlocks: run => isDone(run, "nether/create_full_beacon") ? SYMBOLS.done : countOrDone(run.items.goldBlocks, TARGETS.goldBlocks),
    bees: run => countOrDone(howMany(
        isDone(run, "husbandry/silk_touch_nest"),       // Total Beelocation
        isDone(run, "husbandry/safely_harvest_honey"),  // Bee Our Guest
        isDone(run, "adventure/honey_block_slide"),     // Sticky Situation
        has(run, "animalsBred", "bee"),
    ), 4),

    // biome groups
    mesa: run => group(run, "biomes", BIOME_GROUPS.mesa),
    snowy: run => group(run, "biomes", BIOME_GROUPS.snowy),
    jungle: run => group(run, "biomes", BIOME_GROUPS.jungle),
    megaTaiga: run => group(run, "biomes", BIOME_GROUPS.megaTaiga),
    mushroom: run => group(run, "biomes", BIOME_GROUPS.mushroom),

    // animasl bread
    hdm: run => group(run, "animalsBred", ["horse", "donkey", "mule"]),
    llamas: run => mark(has(run, "animalsBred", "llama")),
    foxes: run => mark(has(run, "animalsBred", "fox")),
    ocelots: run => mark(has(run, "animalsBred", "ocelot")),
    pandas: run => mark(has(run, "animalsBred", "panda")),

    // goals
    endermite: run => mark(has(run, "monstersKilled", "endermite")),
    phantoms: run => mark(has(run, "monstersKilled", "phantom") && isDone(run, "adventure/two_birds_one_arrow")),
    zombieDoctor: run => mark(isDone(run, "story/cure_zombie_villager")),
    lodestone: run => mark(isDone(run, "nether/use_lodestone")),

    // progresses
    adventuringTime: run => listProgress(run, "biomes"),
    monstersHunted: run => listProgress(run, "monstersKilled"),
    twoByTwo: run => listProgress(run, "animalsBred"),
    completeCatalogue: run => listProgress(run, "catsTamed"),
    balancedDiet: run => listProgress(run, "foodEaten"),
};

function isTimedId(id){
    return Object.hasOwn(ADVANCEMENTS, id) || Object.hasOwn(EVENTS, id);
}

function criteriaItem(id){
    const [listKey, item] = id.split("/");
    return Object.hasOwn(CRITERIA, listKey) && CRITERIA[listKey].includes(item) ? [listKey, item] : null;
}

function findList(run, name){
    if (Object.hasOwn(CRITERIA, name)){
        return { ...run.criteria[name], toName: prettyId };
    }
    if (name === "advancements"){
        return { ...run.advancements, toName: advancementName };
    }
    const tab = Object.keys(ADVANCEMENTS).filter(id => id.startsWith(`${name}/`));
    if (tab.length > 0){
        return { ...progress(tab.filter(id => isDone(run, id)), tab), toName: advancementName };
    }
    return null;
}

export const LOOKUPS = {
    time: (run, id) => isTimedId(id) ? time(timeOf(run, id)) : undefined,

    done: (run, id) => {
        if (isTimedId(id)){
            return mark(isDone(run, id));
        }
        const item = criteriaItem(id);
        return item ? mark(has(run, ...item)) : undefined;
    },

    count: (run, listName) => {
        const list = findList(run, listName);
        return list ? count(list.count, list.total) : undefined;
    },

    missing: (run, listName, limit = Infinity) => {
        const list = findList(run, listName);
        if (!list){
            return undefined;
        }
        return list.missing.length <= Number(limit) ? names(list.missing, list.toName) : null;
    },

    section: (run, id) => {
        const [name, part] = id.split("/");
        if (!Object.hasOwn(SECTION_PARTS, name) || (part && !SECTION_PARTS[name].includes(part))){
            return undefined;
        }
        const section = run.sections[name];
        return mark(part ? section?.parts[part] ?? false : section?.complete ?? false);
    },
};
