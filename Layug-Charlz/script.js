(function () {
    var toggle = document.getElementById('themeToggle');
    var label = toggle.querySelector('.theme-toggle-label');
    var saved = null;
    try { saved = localStorage.getItem('bt-theme'); } catch (e) {}

    function applyTheme(theme) {
        if (theme === 'light') {
            document.documentElement.setAttribute('data-theme', 'light');
            label.textContent = 'DARK MODE';
            toggle.setAttribute('aria-pressed', 'true');
        } else {
            document.documentElement.removeAttribute('data-theme');
            label.textContent = 'LIGHT MODE';
            toggle.setAttribute('aria-pressed', 'false');
        }
    }

    applyTheme(saved);

    toggle.addEventListener('click', function () {
        var current = document.documentElement.getAttribute('data-theme') === 'light' ? 'light' : 'dark';
        var next = current === 'light' ? 'dark' : 'light';
        try { localStorage.setItem('bt-theme', next); } catch (e) {}
        applyTheme(next);
    });
})();