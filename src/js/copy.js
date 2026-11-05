const resetTimers = new WeakMap();

export async function copyToClipboard(text){
    try {
        await navigator.clipboard.writeText(text);
        return true;
    } catch (err){
        console.warn(`Clipboard blocked: ${err}`);
        return copyWithTextarea(text);
    }
}

function copyWithTextarea(text){
    const textarea = document.createElement("textarea");
    textarea.value = text;
    textarea.readOnly = true;
    textarea.style.position = "fixed";
    textarea.style.opacity = "0";
    document.body.append(textarea);
    textarea.select();
    const copied = document.execCommand("copy");
    textarea.remove();
    return copied;
}

export async function copyFromButton(button, text){
    const copied = await copyToClipboard(text);
    const state = copied ? "copied" : "failed";

    clearTimeout(resetTimers.get(button));
    button.classList.remove("copied", "failed");
    button.classList.add(state);
    resetTimers.set(button, setTimeout(() => button.classList.remove(state), 1500));
}
