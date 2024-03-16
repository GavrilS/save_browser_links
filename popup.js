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
document.querySelector('ul').append(...elements);
console.log(document.querySelector('ul'));

const saveUrlsBtn = document.getElementById('save-urls');
const reloadUrlsBtn = document.getElementById('reload-urls');

// console.log(`saveUrlsBtn: ${saveUrlsBtn}`);
// console.log(`reloadUrlsBtn: ${reloadUrlsBtn}`);
// console.log('template ', template);
// console.log('tabsList ', tabList);
// console.log('window ', window);

saveUrlsBtn.addEventListener('click', async () => {
    const newHandle = await window.showSaveFilePicker();
    const writableStream = await newHandle.createWritable();
    let message = '';
    tabList.forEach((tab) => {
        message += tab.url + '\n';
    });
    await writableStream.write(message);
    await writableStream.close();
});

reloadUrlsBtn.addEventListener('click', async () => {
    // const result = await fetch('./url_list.txt');
    // const urlsText = await result.text();
    const urlsText = await (await fetch('./url_list.txt')).text();
    const urls = urlsText.split('\n');

    // console.log('result: ', result);
    // console.log('urlsText: ', urlsText);
    // console.log('urls: ', urls);

    if (urls.length > 0) {
        chrome.windows.create(
            {
                'focused': true,
                'state': 'maximized',
                'type': 'normal',
                'url': urls
            }
        );
        // urls.forEach((url) => {
        //     if (url !== '') {
        //         chrome.tabs.create(
        //             {
        //                 "url": url
        //             }
        //         );
        //     } 
        // });
    }
});
