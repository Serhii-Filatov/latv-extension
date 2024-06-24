const proxyConfig = {
  mode: "pac_script",
  pacScript: {
    data: `
      function FindProxyForURL(url, host) {
        const proxy = 'PROXY 104.248.16.121:3128';
        const direct = 'DIRECT';
        const proxyHosts = [
          'bbc.co.uk/iplayer',
          'itv.com',
          'channel4.com',
          'tvplayer.com',
          '2ip.ua'
        ];

        for (let i = 0; i < proxyHosts.length; i++) {
          if (dnsDomainIs(host, proxyHosts[i])) {
            return proxy;
          }
        }
        return direct;
      }
    `
  }
};

chrome.runtime.onInstalled.addListener(() => {
  chrome.proxy.settings.set(
    {value: proxyConfig, scope: 'regular'},
    function() {
      if (chrome.runtime.lastError) {
        console.error(`Error setting proxy: ${chrome.runtime.lastError}`);
      } else {
        console.log("Proxy settings applied successfully");
      }
    }
  );
});

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "openUrlInCurrentTab") {
    chrome.tabs.update(sender.tab.id, { url: request.url });
    sendResponse({ status: "URL opened in current tab" });
  }
});