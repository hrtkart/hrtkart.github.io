// Apply before the first paint; storage restrictions must not break the page.
(() => {
  let preference = 'system';
  try { preference = localStorage.getItem('kart-theme') || 'system'; } catch (_) {}
  if (!['system', 'light', 'dark'].includes(preference)) preference = 'system';
  const media = window.matchMedia('(prefers-color-scheme: dark)');
  function apply() {
    document.documentElement.dataset.theme = preference === 'system' ? (media.matches ? 'dark' : 'light') : preference;
    document.querySelectorAll('[data-theme-toggle]').forEach(button => {
      const label = preference[0].toUpperCase() + preference.slice(1);
      button.textContent = { system: '◐', light: '☀', dark: '☾' }[preference] + ' ' + label;
      button.setAttribute('aria-label', `Current theme: ${label}. Click to cycle theme.`);
      button.title = 'System → Light → Dark';
      button.hidden = false;
    });
  }
  apply();
  media.addEventListener('change', apply);
  document.addEventListener('DOMContentLoaded', () => {
    apply();
    document.querySelectorAll('[data-theme-toggle]').forEach(button => button.addEventListener('click', () => {
      preference = { system: 'light', light: 'dark', dark: 'system' }[preference];
      try { localStorage.setItem('kart-theme', preference); } catch (_) {}
      apply();
    }));
  });
})();
