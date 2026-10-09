const SNAPSHOT_RE = /(\/web\/\d+)\//;
const snapshot  = (url) => SNAPSHOT_RE.test(url);
const raw       = (url) => url.replace(SNAPSHOT_RE, '$1id_/');
const wb_url    = "web.archive.org/web/";