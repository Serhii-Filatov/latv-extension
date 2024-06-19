

const urlMap = {
  iplayer: "https://www.bbc.co.uk/iplayer",
  itv: "https://www.itv.com/",
  channel4: "https://www.channel4.com/",
  tvplayer: "https://tvplayer.com/"
};

document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('button').forEach(button => {
    button.addEventListener('click', () => {
      const url = urlMap[button.id];
      if (url) {
        chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
          chrome.tabs.update(tabs[0].id, { url: url });
        });
      }
    });
  });
});