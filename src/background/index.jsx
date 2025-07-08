import { aipFetch } from "@/api";
// manifest.json的Permissions配置需添加declarativeContent权限
chrome.runtime.onInstalled.addListener(function () {
  // 默认先禁止Page Action, 否则下面规则无法生效
  chrome.action.disable();
  chrome.declarativeContent.onPageChanged.removeRules(undefined, () => {
    const rule = {
      conditions: [
        new chrome.declarativeContent.PageStateMatcher({
          pageUrl: {
            // 适配所有域名以 xxx. 开头的网页
            // hostPrefix: 'xxx.'
            // 适配所有域名以“.xxx.com”结尾的网页
            // hostSuffix: '.xxx.com',
            // 适配 https 协议的网页
            // schemes: ['https'],
          },
        }),
      ],
      actions: [new chrome.declarativeContent.ShowAction()],
    };
    // 合并全部规则
    const rules = [rule];
    // 执行规则
    chrome.declarativeContent.onPageChanged.addRules(rules);
  });
});

// 处理消息
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  (async () => {
    try {
      const { source, type, data } = request;
      // content 过来的消息
      if (source === "content") {
        if (type === "api") {
          const apiRes = await aipFetch(data);
          sendResponse({
            success: true,
            data: apiRes,
          });
        }
      } else {
        sendResponse({ success: false, message: "未知来源的消息" });
      }
    } catch (err) {
      sendResponse({ success: false, message: JSON.stringify(err) });
    }
  })();

  return true;
});
