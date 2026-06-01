# 間歇計時器 ⏱

專注與休息交替的循環計時器，可安裝到 iPhone 主畫面當作 App 使用，支援離線。

**線上版本**：`https://<你的帳號>.github.io/<repo>/`
（部署後把這行換成你的實際網址）

## 功能

- 專注 / 休息兩階段無限循環，預設 30 秒 / 10 秒。
- 秒數可在畫面上即時調整（齒輪按鈕，每次 ±5 秒，或直接輸入數字）。
- 階段切換時：全螢幕閃光 + 圓盤彈跳 + 嗶聲提示。
- 深色介面、大字顯示，為 iPhone 全螢幕設計。
- PWA：可「加入主畫面」變成全螢幕 App，第一次載入後即可離線使用。

## 檔案結構

```
index.html               計時器本體（HTML + CSS + JS 單檔）
manifest.webmanifest     PWA 設定（名稱、圖示、全螢幕顯示）
sw.js                    Service Worker（離線快取）
icons/                   App 圖示
├─ icon-180.png            iOS 主畫面圖示
├─ icon-192.png            Android / 安裝畫面圖示
├─ icon-512.png            高解析圖示
└─ icon-512-maskable.png   Android 可遮罩圖示
docs/                    開發者教學文件（非 App 一部分，可不部署）
```

## 部署（GitHub Pages）

1. 建立一個 **Public** repository。
2. 把 `index.html`、`manifest.webmanifest`、`sw.js` 放 repo 根目錄，4 個圖示放 `icons/`（保持資料夾結構直接整包上傳即可）。
3. **Settings → Pages → Source** 選 `Deploy from a branch`，Branch 選 `main`、資料夾 `/ (root)`，Save。
4. 等一兩分鐘，頁面上方會出現網址。

## 在 iPhone 上安裝

用 **Safari**（iOS 上只有 Safari 能加入主畫面）開啟網址 → 點底部「分享」→ 選「加入主畫面」。

## 自訂

預設秒數可在畫面上調整。若想改程式預設值或新增階段，編輯 `index.html` 頂部的 `PHASES` 陣列：

```js
const PHASES = [
  { name: "專注", seconds: 30, key: "focus" },
  { name: "休息", seconds: 10, key: "rest"  },
];
```

往陣列再加物件即可擴充循環（例如加一段長休息）。

## 更新注意事項

修改任何檔案後，**務必把 `sw.js` 裡的 `timer-v1` 版本號往上加**（v2、v3…），
否則已安裝的使用者會因離線快取而看不到更新。

## 已知限制（iOS）

- 網頁不支援震動，切換階段只有閃光與嗶聲。
- 無法阻止螢幕自動鎖屏，長時間倒數畫面可能變暗。

## 技術

純原生 HTML / CSS / JavaScript，無框架、無建置流程、無相依套件。
