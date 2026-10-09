browser.runtime.onMessage.addListener((message, sender) => {
    const url = sender.tab.url;
    const raw_url = raw(url);
    const src_url = 'view-source:' + raw_url;

    if (message.action === 'source') {
        
        browser.tabs.update(sender.tab.id, { url: src_url });
        console.log(`[wbmtools] ${url} -> ${src_url}`)
    }

    if(message.action === 'raw') {
        browser.tabs.update(sender.tab.id, { url: raw_url });
        console.log(`[wbmtools] ${url} -> ${raw_url}`)
    }
});