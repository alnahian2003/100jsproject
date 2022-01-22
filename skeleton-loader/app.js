// Entire Dark-Light Theme Functionality
const storageKey = "theme";

const changeTheme = () => {
  theme.name = theme.name === "light" ? "dark" : "light";

  setPreference();
};

const getColorPreference = () => {
  if (localStorage.getItem(storageKey)) {
    return localStorage.getItem(storageKey);
  } else {
    return window.matchMedia("(prefers-color-scheme: dark)").mathces
      ? "dark"
      : "light";
  }
};

const setPreference = () => {
  localStorage.setItem(storageKey, theme.name);
  displayPreference();
};

const displayPreference = () => {
  document.firstElementChild.setAttribute("data-theme", theme.name);
  document
    .querySelector("#themeChanger")
    ?.setAttribute("aria-label", theme.name);
};

var theme = {
  name: getColorPreference(),
};

displayPreference();

window.onload = () => {
  // So that the screen-reader can get the current dynamic value [optional. just to improve the accessibility]
  displayPreference();

  document
    .querySelector("#themeChanger")
    .addEventListener("click", changeTheme);
};

// Sync With The System Changes
window
  .matchMedia("(prefers-color-scheme: dark)")
  .addEventListener("change", ({ matches: isDark }) => {
    theme.name = isDark ? "dark" : "light";

    setPreference();
  });
