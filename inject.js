const s = document.createElement('script');
s.src = chrome.runtime.getURL('textmodepsd.js');
s.onload = () => s.remove();
(document.head || document.documentElement).append(s);