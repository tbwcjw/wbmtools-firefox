async function cur_tab() {
    const [tab] = await browser.tabs.query({ active: true, currentWindow: true });
    return tab;
}

(async () => {
    const tab = await cur_tab();
    const url = tab?.url ?? '';

    if (url.startsWith("view-source:") || url.startsWith("about:")) {
        disable('raw');
        disable('source');
        disable('wayback');
        disable('save');
    }
    
    if (!snapshot(url)) {
        disable('raw');
        disable('source');
    }

    if(snapshot(url) || url.includes(wb_url)) {
        disable('wayback');
        disable('save');
    }

})();

function disable(id) {
    const btn = document.getElementById(id);
    if (!btn) return;
    btn.disabled = true;
    const sub = btn.querySelector('.subtitle');
    if (sub) sub.textContent = 'Unavailable on this page';
}

document.getElementById('wayback').addEventListener('click', async () => {
    const tab = await cur_tab();
    if (!tab?.url || tab.url.includes(wb_url)) return;

    const wb_path = "https://" + wb_url + tab.url;
    await browser.tabs.update(tab.id, { url: wb_path });
    window.close();
});

document.getElementById('save').addEventListener('click', async () => {
    const tab = await cur_tab();
    if (!tab?.url || tab.url.includes(wb_url)) return;
    const wb_save_path = "https://" + wb_save_url + tab.url;
    console.log(wb_save_path);
    await browser.tabs.update(tab.id, { url: wb_save_path });
    window.close();
});

document.getElementById('raw').addEventListener('click', async () => {
    const tab = await cur_tab();
    if (!tab?.url || !snapshot(tab.url)) return;

    const raw_url = raw(tab.url);
    if (raw_url === tab.url) return; 

    await browser.tabs.update(tab.id, { url: raw_url });
    window.close();
});

document.getElementById('source').addEventListener('click', async () => {
    const tab = await cur_tab();
    if (!tab?.url || !snapshot(tab.url)) return;

    const raw_url = raw(tab.url);
    await browser.tabs.update(tab.id, { url: 'view-source:' + raw_url });
    window.close();
});