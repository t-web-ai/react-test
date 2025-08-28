class Theme {
  static start() {
    document.documentElement.classList.toggle(
      "dark",
      localStorage.theme === "dark" ||
        (!("theme" in localStorage) &&
          window.matchMedia("(prefers-color-scheme: dark)").matches)
    );
  }
  static dark() {
    localStorage.theme = "dark";
    Theme.start();
  }
  static light() {
    localStorage.theme = "light";
    Theme.start();
  }
  static system() {
    localStorage.removeItem("theme");
    Theme.start();
  }
}
export default Theme;
