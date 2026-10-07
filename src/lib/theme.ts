export type Theme = "light" | "dark";

export const THEME_KEY = "theme";

// Runs in <head> before first paint. Without a stored choice the CSS follows the system.
export const themeScript = `try{var t=localStorage.getItem("${THEME_KEY}");if(t==="light"||t==="dark")document.documentElement.dataset.theme=t}catch(e){}`;
