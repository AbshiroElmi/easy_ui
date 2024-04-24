(() => {
  // ../easy_ui/easy_ui/public/js/theme-switcher.js
  frappe.provide("frappe.ui");
  frappe.ui.ThemeSwitcher = class CustomThemeSwitcher extends frappe.ui.ThemeSwitcher {
    constructor() {
      super();
    }
    fetch_themes() {
      return new Promise((resolve) => {
        this.themes = [
          {
            name: "light",
            label: "Frappe Light",
            info: "Light Theme"
          },
          {
            name: "dark",
            label: "Timeless Night",
            info: "Dark Theme"
          },
          {
            name: "automatic",
            label: "Automatic",
            info: "Uses system's theme to switch between light and dark mode"
          },
          {
            name: "easy",
            label: "Easy",
            info: "Easy Ui"
          }
        ];
        resolve(this.themes);
      });
    }
  };

  // ../easy_ui/easy_ui/public/js/nav-layout.js
  var replaceClassName = (oldName, newName) => document.querySelectorAll("." + oldName).forEach((element) => {
    element.classList.remove(oldName);
    element.classList.add(newName);
  });
  replaceClassName("layout-vertical-nav", "layout-side-section");

  // ../easy_ui/easy_ui/public/js/easy.bundle.js
  console.log("INJECTED FILE");
})();
//# sourceMappingURL=easy.bundle.FQS46ARH.js.map
