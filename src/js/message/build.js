import { TEMPLATE } from "./template.js";
import { PLACEHOLDERS, LOOKUPS } from "./placeholders.js";

const PLACEHOLDER = /\{([\w.:/-]+)\}/g;
const reported = new Set();

function valueOf(key, run){
    if (Object.hasOwn(PLACEHOLDERS, key)){
        return PLACEHOLDERS[key](run);
    }
    const [kind, ...args] = key.split(":");
    if (!Object.hasOwn(LOOKUPS, kind) || args.length === 0){
        return undefined;
    }
    return LOOKUPS[kind](run, ...args);
}

function reportUnknown(placeholder){
    if (!reported.has(placeholder)){
        reported.add(placeholder);
        console.warn(`Unknown placeholder ${placeholder} in the message template. The list is in src/js/message/placeholders.js`);
    }
}

function fillLine(line, run){
    let hidden = false;
    const filled = line.replace(PLACEHOLDER, (placeholder, key) => {
        const value = valueOf(key, run);
        if (value === undefined){
            reportUnknown(placeholder);
            return placeholder;
        }
        if (value === null){
            hidden = true;
        }
        return value ?? "";
    });
    return hidden ? null : filled;
}

export function buildMessage(run){
    return TEMPLATE
        .trim()
        .split("\n")
        .map(line => fillLine(line, run))
        .filter(line => line !== null)
        .join("\n");
}
