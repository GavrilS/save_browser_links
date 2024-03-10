// Get all tabs' urls
chrome.tabs.query({}, (tabs) => {
    tabs.forEach((tab) => {
        console.log(tab);
        console.log(tab.url);
        console.log('******************************');
    });
});
