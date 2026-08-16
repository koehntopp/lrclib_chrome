const queryEl = document.getElementById('query');
const statusEl = document.getElementById('status');
const STORAGE_KEY = 'lastQuery';

const SITE_URLS = {
  lrclib: (q) => 'https://lrclib.net/search/' + encodeURIComponent(q),
  azlyrics: (q) => 'https://www.azlyrics.com/search/?q=' + encodeURIComponent(q),
  genius: (q) => 'https://genius.com/search?q=' + encodeURIComponent(q),
};

// Letzten Suchbegriff vorbelegen
chrome.storage.local.get(STORAGE_KEY, (data) => {
  if (data[STORAGE_KEY]) {
    queryEl.value = data[STORAGE_KEY];
    queryEl.select();
  }
  queryEl.focus();
});

document.getElementById('paste').addEventListener('click', async () => {
  try {
    const text = await navigator.clipboard.readText();
    queryEl.value = text;
    queryEl.focus();
    statusEl.textContent = '';
  } catch (e) {
    statusEl.textContent = 'Zwischenablage konnte nicht gelesen werden.';
  }
});

function openSearch(site) {
  const text = queryEl.value.trim();
  if (!text) {
    statusEl.textContent = 'Bitte einen Suchbegriff eingeben.';
    return;
  }
  chrome.storage.local.set({ [STORAGE_KEY]: text });
  chrome.tabs.create({ url: SITE_URLS[site](text) });
  window.close();
}

document.getElementById('search').addEventListener('click', () => openSearch('lrclib'));
queryEl.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') openSearch('lrclib');
});

document.querySelectorAll('.site-btn').forEach((btn) => {
  btn.addEventListener('click', () => openSearch(btn.dataset.site));
});
