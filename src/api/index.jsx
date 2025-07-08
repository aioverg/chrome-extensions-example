// 开发环境地址
let API_DOMAIN = "/api/";

// 正式环境地址
if (import.meta.env.MODE === "production") {
  API_DOMAIN = "http://localhost/api/";
}

// API请求异常报错内容
export const API_FAILED_MESSAGE = "网络连接异常，请稍后再试";

// fetch 封装
export async function aipFetch(
  config = {
    method: "get", // 请求方法
    headers: {
      // 请求头
      "Content-Type": "application/json;charset=UTF-8",
    }, // 数据
    data: {}, // 数据
  }
) {
  const method = config.method || "get";
  const headers = config.headers || {
    "Content-Type": "application/json;charset=UTF-8",
  };
  const data = JSON.stringify(config.data || {});

  // 请求数据
  const axiosConfig = {
    method: method,
    headers: headers,
    body: data,
  };

  // 发起请求
  return fetch(config.url, axiosConfig)
    .then((res) => res.json())
    .then((result) => {
      return Promise.resolve(result);
    })
    .catch(() => {
      return Promise.resolve(API_FAILED_MESSAGE);
    });
}

// 向 background 发送消息, 注意 chrome.runtime.sendMessage 中只能传递 JSON 数据
export function sendMessageToBackground(config) {
  return new Promise((resolve, reject) => {
    chrome.runtime.sendMessage(
      {
        source: "content", // 来源标识, content 表示内容
        type: "api",
        data: config,
      },
      (result) => {
        if (chrome.runtime.lastError) {
          reject(chrome.runtime.lastError);
        } else {
          resolve(result);
        }
      }
    );
  });
}

// 发起请求
export async function apiRequest(config) {
  if (config.background && import.meta.env.MODE === "production") {
    // 【用于build环境时的content】委托background script发起请求
    return sendMessageToBackground(config);
  } else {
    // 【用于popup 和 开发环境的content】发起请求
    return aipFetch(config);
  }
}

// API请求汇总
export const API = {
  // 登录
  login: async (config) => {
    config.url = API_DOMAIN + "login/";
    config.method = "post";
    return apiFetch(config);
  },
  // 获取数据
  getData: (config) => {
    config.url = API_DOMAIN + "getData/";
    config.method = "get";
    apiFetch(config);
  },
};
