// Get all tabs' urls
// chrome.tabs.query({}, (tabs) => {
//     tabs.forEach((tab) => {
//         console.log(tab);
//         console.log(tab.url);
//         console.log('******************************');
//     });
// });

const tabs = chrome.tabs.query({});

const template = document.getElementById('template-list');
const elements = new Set();

for (const tab of tabs) {
    const element = template.content.firstElementChild.cloneNode(true);

    const title = tab.title.trim();
    const url = new URL(tab.url);

    element.querySelector('.title').content = title;
    element.querySelector('.url-path').content = url;
}
