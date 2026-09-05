(() => {
  const STORAGE_KEY = 'tiempo-de-ver:analytics-consent:v1';
  const MEASUREMENT_ID = 'G-BB1CPQG671';
  const loadAnalytics = () => {
    if (document.querySelector('script[data-tdv-analytics]')) return;
    window.dataLayer = window.dataLayer || [];
    window.gtag = window.gtag || function(){ window.dataLayer.push(arguments); };
    window.gtag('consent', 'default', { analytics_storage: 'granted', ad_storage: 'denied', ad_user_data: 'denied', ad_personalization: 'denied' });
    window.gtag('js', new Date());
    window.gtag('config', MEASUREMENT_ID, { anonymize_ip: true });
    const script = document.createElement('script');
    script.async = true; script.dataset.tdvAnalytics = 'true';
    script.src = `https://www.googletagmanager.com/gtag/js?id=${MEASUREMENT_ID}`;
    document.head.appendChild(script);
  };
  const save = choice => { try { localStorage.setItem(STORAGE_KEY, choice); } catch (_) {} };
  const read = () => { try { return localStorage.getItem(STORAGE_KEY); } catch (_) { return null; } };
  const close = () => document.querySelector('.consent-banner')?.remove();
  const show = () => {
    close();
    const banner = document.createElement('section');
    banner.className = 'consent-banner'; banner.setAttribute('role', 'dialog'); banner.setAttribute('aria-label', 'Preferencias de privacidad');
    banner.innerHTML = '<h2>Tu privacidad, sin rodeos</h2><p>Usamos analítica solo si la aceptas para saber qué partes de la web resultan útiles. No cargamos Google Analytics antes de tu permiso. <a href="/cookies/">Más información</a>.</p><div class="consent-actions"><button class="consent-accept" type="button">Aceptar analítica</button><button class="consent-reject" type="button">Rechazar</button></div>';
    banner.querySelector('.consent-accept').addEventListener('click', () => { save('accepted'); loadAnalytics(); close(); });
    banner.querySelector('.consent-reject').addEventListener('click', () => { save('rejected'); close(); });
    document.body.appendChild(banner);
  };
  document.addEventListener('click', event => { if (event.target.closest('[data-privacy-settings]')) show(); });
  if (read() === 'accepted') loadAnalytics(); else if (read() !== 'rejected') show();
})();
