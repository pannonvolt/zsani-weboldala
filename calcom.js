/* Cal.com inline embed. A szolgáltató támogatott UI-beállításait használja. */
(() => {
  function parse(value) {
    try {
      const url = new URL(String(value || '').trim());
      if(url.protocol !== 'https:' || url.hostname !== 'cal.com' || url.port || url.username || url.password) return null;
      const parts = url.pathname.split('/').filter(Boolean);
      if(!parts.every(part => /^[a-z0-9_-]+$/i.test(part))) return null;
      if(parts[0] === 'team' ? parts.length !== 3 : ![1, 2].includes(parts.length)) return null;
      const calLink = parts.join('/');
      return {calLink, url: `https://cal.com/${calLink}`, isProfile: parts.length === 1};
    } catch { return null; }
  }
  function theme() {
    const root = typeof getComputedStyle === 'function' ? getComputedStyle(document.documentElement) : null;
    const color = (name, fallback) => root?.getPropertyValue(name).trim() || fallback;
    const brand = color('--gold', '#8b734b');
    return {
      theme: 'light', layout: 'month_view', hideEventTypeDetails: true,
      styles: {body: {background: color('--paper', '#fcfaf6')}},
      cssVarsPerTheme: {light: {'cal-brand': brand}, dark: {'cal-brand': brand}}
    };
  }
  function mount(value) {
    const config = parse(value);
    const container = document.querySelector('#cal-inline');
    if(!config || !container || container.dataset.mounted) return;
    container.dataset.mounted = 'true';
    const status = document.querySelector('#cal-status');
    const setStatus = text => { if(status) {status.textContent = text; status.hidden = !text;} };
    setStatus('A szabad időpontok betöltése…');
    let ready = false;
    const timer = setTimeout(() => {if(!ready) setStatus('A naptár betöltése lassabb a szokásosnál. Ha nem jelenik meg, az alábbi gombbal külön lapon is megnyithatod.');}, 20000);
    try {
      if(!window.Cal) {
        const queued = function(...args) {queued.q.push(args);};
        queued.q = []; queued.ns = {}; queued.loaded = true;
        window.Cal = queued;
        const script = document.createElement('script');
        script.src = 'https://app.cal.com/embed/embed.js';
        script.async = true;
        script.onerror = () => {clearTimeout(timer); setStatus('A naptár nem tölthető be. Próbáld meg az alábbi gombbal külön lapon megnyitni.');};
        document.head.appendChild(script);
      }
      const cal = window.Cal;
      cal('init', {origin: 'https://cal.com'});
      cal('on', {action: 'linkReady', callback: () => {ready = true; clearTimeout(timer); setStatus('');}});
      cal('on', {action: 'linkFailed', callback: () => {clearTimeout(timer); setStatus('A foglalási oldal nem elérhető. Próbáld meg külön lapon megnyitni, vagy keress a kapcsolat oldalon.');}});
      cal('inline', {
        elementOrSelector: '#cal-inline', calLink: config.calLink,
        config: {theme: 'light', layout: 'month_view', useSlotsViewOnSmallScreen: 'true', iframeAttrs: {title: 'Cal.com – szabad időpontok és időpontfoglalás'}}
      });
      cal('ui', theme());
    } catch {
      clearTimeout(timer);
      setStatus('A naptár nem tölthető be. Az alábbi gombbal külön lapon is foglalhatsz.');
    }
  }
  window.CalBooking = {parse, theme, mount};
})();
