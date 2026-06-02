# 間歇計時器 ⏱

專注與休息交替的循環計時器，可安裝到 iPhone 主畫面當作 App 使用，支援離線。

**線上版本**：`https://bluehuan07.github.io/timer/`

## 功能

- 專注 / 休息兩階段無限循環，預設 30 秒 / 10 秒。
- 秒數可在畫面上即時調整（齒輪按鈕，每次 ±5 秒，或直接輸入數字）。
- 階段切換時：全螢幕閃光 + 圓盤彈跳 + 提示音（專注 / 休息音色不同，iPhone 靜音模式下也會響）。
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

修改任何檔案後，**務必把 `sw.js` 裡的版本號往上加**（目前為 `timer-v4`，下次改成 `timer-v5`…），
否則已安裝的使用者會因離線快取而看不到更新。

## 已知限制（iOS）

- 網頁不支援震動，切換階段只有閃光與嗶聲。
- 無法阻止螢幕自動鎖屏，長時間倒數畫面可能變暗。

## 技術

純原生 HTML / CSS / JavaScript，無框架、無建置流程、無相依套件。

## 更新日記

> 每次更新功能後，在最上方補一筆（新的在上）。

### 2026-06-02（下午）
- 畫面底部新增頁尾：顯示版本、作者，以及連到本說明文件的連結。
- 版本不寫死：頁面向 Service Worker 詢問（`postMessage`），顯示的就是「實際生效的快取版號」（如 `v5`）。手機若還吃舊快取會看到舊版號，更新到位後才會變新，方便判斷有沒有更新成功。
- 連結指向 GitHub 上的 README（`#readme`），因為 GitHub Pages 不會算繪 `.md` 檔。
- 快取版本升至 `timer-v5`。

### 2026-06-02
- 提示音改用 JS 即時合成 WAV、以 `<audio>` 媒體元素播放：可繞過 iPhone 側邊靜音鍵，靜音模式下也能響。
- 修正「點開始後音訊未解鎖、計時器自動觸發時無聲」的 iOS 時機問題。
- 專注（880Hz）與休息（523Hz）採用不同音色，用聽的即可分辨階段。
- 快取版本升至 `timer-v4`。

### 2026-06-01
- 初版上線：間歇計時器 PWA，可加入 iPhone 主畫面、支援離線。
- 更換 App 顯示圖示並更新快取版本。
- 新增開發者教學文件（`docs/`）。
