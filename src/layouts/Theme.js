class Theme {
  constructor() {
    this.night_icon = "bi bi-moon-fill fs-4";
    this.day_icon = "bi bi-brightness-high-fill fs-4";
  }
  set_theme_state(state) {
    document.documentElement.setAttribute("data-bs-theme", state);
  }
  get_theme_state() {
    return localStorage.getItem("theme") ?? "";
  }
  get_theme_icon() {
    if (!localStorage.getItem("theme")) {
      return this.night_icon;
    }
    return localStorage.getItem("theme") == "dark"
      ? this.day_icon
      : this.night_icon;
  }
  change_theme() {
    if (localStorage.getItem("theme")) {
      localStorage.removeItem("theme");
      this.set_theme_state(this.get_theme_state());
      return this.night_icon;
    }
    localStorage.setItem("theme", "dark");
    this.set_theme_state(this.get_theme_state());
    return this.day_icon;
  }
}
export const theme = new Theme();
