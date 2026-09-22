(() => {
  const id = window.SITE_CONFIG?.visitorMapId;
  if (!id || !/^[a-zA-Z0-9_-]+$/.test(id)) return;
  document.querySelectorAll('[data-visitor-map]').forEach(container => {
    const link = document.createElement('a');
    const configuredURL = window.SITE_CONFIG.visitorMapUrl;
    link.href = /^https:\/\/mapmyvisitors\.com\/web\/[a-zA-Z0-9_-]+\/?$/.test(configuredURL || '') ? configuredURL : 'https://mapmyvisitors.com/';
    link.target = '_blank';
    link.rel = 'noopener noreferrer';
    link.setAttribute('aria-label', 'Open visitor map');
    const image = document.createElement('img');
    image.src = `https://mapmyvisitors.com/map.png?d=${encodeURIComponent(id)}&cl=ffffff&w=a`;
    image.alt = 'Visitor locations around the world — open the full visitor map';
    image.loading = 'lazy';
    image.addEventListener('error', () => {
      link.textContent = 'View visitor map ↗';
    });
    link.append(image);
    container.replaceChildren(link);
  });
})();
