import { ADVANCEMENTS, EVENTS } from "./constants/1.16.1-aa.js";

// 5 -> "05"
function pad(number){
    return String(number).padStart(2, "0");
}

// ms -> "h:mm:ss"
export function formatMs(ms){
    const totalSeconds = Math.floor(ms / 1000);
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor(totalSeconds / 60) % 60;
    const seconds = totalSeconds % 60;
    const minutesAndSeconds = `${pad(minutes)}:${pad(seconds)}`;
    return hours > 0 ? `${hours}:${minutesAndSeconds}` : minutesAndSeconds;
}

// ms ago -> ?d ?h ?m ?s
export function timeAgo(ms){
    const seconds = Math.max(0, Math.floor(ms / 1000));
    if (seconds < 60){
        return `${seconds}s`;
    }
    const minutes = Math.floor(seconds / 60);
    if (minutes < 60){
        return `${minutes}m ${seconds % 60}s`;
    }
    const hours = Math.floor(minutes / 60);
    if (hours < 24){
        return `${hours}h ${minutes % 60}m`;
    }
    return `${Math.floor(hours / 24)}d ${hours % 24}h`;
}

// snake case to all uppercase words with spaces
export function prettyId(id){
    return id
        .split("_")
        .map(word => word[0].toUpperCase() + word.slice(1))
        .join(" ");
}

// "end/elytra" → "Sky's the Limit"
export function advancementName(id){
    return ADVANCEMENTS[id] ?? id;
}

// "rsg.enter_nether" → "Enter Nether"
export function eventName(id){
    return EVENTS[id] ?? id;
}

// VVF, Endermite, Phantom, asd, lodestone, hives
/*
Proposed Formatting for text:
**[{Username}]({Live Link})'s TrAAcker**
IGT: {h:mm:ss} (Last Updated {DISCORD_TIMESTAMP})

Elytra: ({mm:ss} or -)
First Cat: ({mm:ss} or -)

God Apple: ❌ Trident: ✅

**Biomes:**
    Mesa: (❌ or {X}/3 or ✅)
    Snowy: (❌ or {X}/6 or ✅)
    Jungle: (❌ or {X}/5 or ✅)
    Mega Taiga: (❌ or {X}/2 or ✅)
    Mushroom Island: (❌ or {X}/2 or ✅)

**Animals:**
    HDM: ✅
    Llamas: ❌
    Foxes: ❌
    Ocelots: ❌
    Pandas: ❌

**Item Counts:**
    Shells: {X}/8
    Debris: {X}/20
    Skulls: {X}/3

**Progress:**
    Adventuring Time: ({X}/42 or ✅)
    A Balanced Diet: ({X}/39 or ✅)
    Monster Hunter: ({X}/33 or ✅)
    Two By Two: ({X}/19 or ✅)
    A Complete Catalogue: ({X}/11 or ✅)

-# [Progress Tracker](https://awesomedev.site/aa-progress-tracker)
*/
