<p align="center">
<img width="15%" src="assets/product_page_icon.png">
</p>
<h2 align="center">Wayback Machine Tools</h2>
<p align="center">
    A firefox extension that adds convenient shortcuts to any page on web.archive.org for accessing the original, unmodified version of an archived snapshot, and its source code.
</p>

<h5>Features:</h5>
<ul>
    <li>View the raw archived page's source code without the Wayback Machine toolbar and other bloat.</li>
    <li>On-page buttons injected automatically on any Wayback snapshot</li>
    <li>Popup menu available from the toolbar on any tab</li>
    <li>Lightweight: no data collection, no external requests, no tracking</li>
</ul>

<h5>How it works:</h5>
The Wayback Machine serves snapshots at URLs like:
<code>https://web.archive.org/web/20070102081009/http://example.com/</code>
<br><br>
The "id_" suffix tells the Archive to skip its toolbar injection and link rewriting, returning the original capture verbatim:
<code>https://web.archive.org/web/20070102081009id_/http://example.com/</code>
<br><br>
This extension simply adds that suffix for you, and offers a one-click path to view-source when you need to inspect the underlying HTML.

<h5>Installation:</h5>
<p>Available (soon) in the <a href="https://addons.mozilla.org/en-US/firefox/addon/wbm-tools/">Firefox Addons Store</a>
