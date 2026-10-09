function style(right = 10)
{
    return {
        position: 'fixed',
        bottom: '10px',
        right: `${right}px`,
        zIndex: '2147483647',
        background: '#000',
        color: '#fff',
        padding: '6px 12px',
        fontFamily: 'sans-serif',
        fontSize: '13px',
        textDecoration: 'none',
        borderRadius: '4px',
        border: '1px solid #444',
        boxShadow: '0 2px 6px rgba(0,0,0,0.4)',
        cursor: 'pointer'
    };
}

function inject_source_elem() {
    if (document.getElementById('wayback-source-link')) return true;

    const url = window.location.href;

    if (!snapshot(url)) return false;

    const raw_src = document.createElement('a');
    raw_src.id = 'wayback-source-link';
    raw_src.textContent = 'view source';
    raw_src.title = 'view the source of the raw archived page';

    raw_src.addEventListener('click', (e) => {
        e.preventDefault();
        browser.runtime.sendMessage({ action: 'source' });
    });

    Object.assign(raw_src.style, style(90));
    
    document.body.appendChild(raw_src);
    console.log('[wbmtools] injected source elem', raw_src);
    return true;

}

function inject_raw_elem() {
    if (document.getElementById('wayback-raw-link')) return true;

    const url = window.location.href;

    if (!snapshot(url)) return false;

    const raw_a = document.createElement('a');
    raw_a.id = 'wayback-raw-link';
    raw_a.textContent = 'view raw';
    raw_a.title = 'view the raw archived page';

    raw_a.addEventListener('click', (e) => {
        e.preventDefault();
        browser.runtime.sendMessage({ action: 'raw' });
    });

    Object.assign(raw_a.style, style(10));

    document.body.appendChild(raw_a);
    console.log('[wbmtools] injected raw elem', raw_a);
    return true;
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', inject_raw_elem);
    document.addEventListener('DOMContentLoaded', inject_source_elem);
} else {
    inject_raw_elem();
    inject_source_elem();
}

function remove()
{
    const raw_elem = document.getElementById('wayback-raw-link');
    const source_elem = document.getElementById('wayback-source-link');
    if(raw_elem) raw_elem.remove();
    if(source_elem) source_elem.remove();
}

let last = location.href;
new MutationObserver(() => {
    if (location.href !== last) {
        last = location.href;
        remove();
        inject_raw_elem();
        inject_source_elem();
    }
}).observe(document, { subtree: true, childList: true });