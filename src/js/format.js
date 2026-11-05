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
