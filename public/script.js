
const themeButton = document.querySelector("#theme-toggle");
const themeIcon = document.querySelector("#theme-icon");
const year = document.querySelector("#year");

// Tema padrão
let currentTheme = "dark";

// Recuperar a preferência anterior
try {
    const savedTheme = localStorage.getItem("portfolio-theme");

    if (savedTheme === "light" || savedTheme === "dark") {
        currentTheme = savedTheme;
    }
} catch (error) {
    // O site continua funcionando sem armazenamento
}

// Aplicar o tema à página
function applyTheme(theme) {
    document.documentElement.dataset.theme = theme;

    const isDark = theme === "dark";

    themeIcon.textContent = isDark ? "☀" : "☾";

    themeButton.setAttribute(
        "aria-label",
        isDark ? "Ativar tema claro" : "Ativar tema escuro"
    );
}

applyTheme(currentTheme);

// Alternar quando clicar no botão
themeButton.addEventListener("click", () => {
    const nextTheme =
        document.documentElement.dataset.theme === "dark"
            ? "light"
            : "dark";

    applyTheme(nextTheme);

    try {
        localStorage.setItem("portfolio-theme", nextTheme);
    } catch (error) {
        // Preferência não persistida
    }
});

// Atualizar automaticamente o ano do rodapé
year.textContent = new Date().getFullYear();
