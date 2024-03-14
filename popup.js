// Get all tabs' urls
const tabList = [];
chrome.tabs.query({}, (tabs) => {
    tabs.forEach((tab) => {
        // console.log(tab);
        // console.log(tab.url);
        // console.log('******************************');
        tabList.push(tab);
    });
});

const template = document.getElementById('template-list');
const elements = new Set();

for (const tab of tabList) {
    const element = template.content.firstElementChild.cloneNode(true);

    const title = tab.title.trim();
    const url = new URL(tab.url);

    element.querySelector('.title').content = title;
    element.querySelector('.url-path').content = url;
    element.querySelector('a').addEventListener('click', async () => {
        await chrome.tabs.update(tab.id, {active: true});
        await chrome.windows.update(tab.windowId, {focused: true});
    });

    elements.add(element);
}
// document.querySelector('ul').append(...elements);
console.log(document.querySelector('ul'));

const saveUrlsBtn = document.getElementById('save-urls');
const reloadUrlsBtn = document.getElementById('reload-urls');


