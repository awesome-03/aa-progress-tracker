const root = document.documentElement;
const systemPrefersLight = matchMedia("(prefers-color-scheme: light)");

function savedTheme(){
    try {
        return localStorage.getItem("theme");
    } catch {
        return null;
    }
}

function applyTheme(theme, button){
    root.dataset.theme = theme;
    const label = theme === "dark" ? "Switch to light mode" : "Switch to dark mode";
    button.setAttribute("aria-label", label);
    button.title = label;
}

export function setupThemeToggle(){
    const button = document.querySelector("#theme-toggle");
    applyTheme(root.dataset.theme, button);

    button.addEventListener("click", () => {
        const theme = root.dataset.theme === "dark" ? "light" : "dark";
        applyTheme(theme, button);
        try {
            localStorage.setItem("theme", theme);
        } catch {
            // if storage is blocked
        }
    });

    systemPrefersLight.addEventListener("change", event => {
        if (savedTheme() === null){
            applyTheme(event.matches ? "light" : "dark", button);
        }
    });
}
