# CLAUDE.md — 專案脈絡

> 這個檔案是給 Claude Code 看的。Claude Code 啟動時會自動讀取，讓它接上專案背景，
> 不必從頭解釋。開發者本人也可以當作專案備忘。

## 這是什麼

一個**間歇計時器**（專注 / 休息交替循環）的 PWA（漸進式網頁應用）。
- 預設流程：專注 30 秒 → 全螢幕閃光 + 圓盤彈跳 + 嗶聲 → 休息 10 秒 → 再閃一次 → 無限循環。
- 秒數可在畫面上即時調整（齒輪按鈕，+/- 一次 5 秒，或直接輸入數字）。
- 設計成深色、大字、適合 iPhone 全螢幕，可「加入主畫面」當原生 App 用，並支援離線。

開發者背景：Java 後端工程師，正在學前端。程式碼內含中文註解，偏好用後端概念類比說明。
回覆與註解請使用**繁體中文**。

## 技術組成

純前端、無建置流程、無框架、無相依套件。原生 HTML + CSS + JavaScript。
不要為了「現代化」而引入 React / Vite / npm 等工具鏈 —— 簡單可直接部署是這專案的核心優點。

## 檔案角色

| 檔案 | 角色 |
|------|------|
| `index.html` | 計時器本體。含全部 HTML / CSS / JS（單檔），頂部有 `PHASES` 設定區可改秒數 |
| `manifest.webmanifest` | PWA 身分設定檔：App 名稱、圖示、`display: standalone`（全螢幕） |
| `sw.js` | Service Worker：離線快取（cache-first）。**改任何檔案後要更新版本號** |
| `icons/icon-180.png` | iOS 加入主畫面用的圖示（apple-touch-icon） |
| `icons/icon-192.png` / `icons/icon-512.png` | Android 與安裝/啟動畫面用 |
| `icons/icon-512-maskable.png` | 可遮罩版本，內容置中，Android 裁切不會切到重點 |
| `docs/1-觀念說明.html` 等三份 | 給開發者看的教學文件，**非 App 的一部分**，部署時可不上傳 |
| `.gitignore` | 排除 OS 雜檔（`.DS_Store`/`Thumbs.db`）、IDE 設定與 `.claude/` |

## 重要慣例與已知限制

- **改檔後必須更新 SW 版本號**：`sw.js` 裡的 `const CACHE`（目前為 `"timer-v4"`）要往上加（v5, v6…），
  否則已安裝的使用者會一直吃舊的離線快取，看不到更新。這是 PWA 最常見的坑。
- **改完功能要補「更新日記」**：在 `README.md` 最下方的「更新日記」區塊新增一筆（新的在上，
  格式 `### YYYY-MM-DD` 加條列）。一次完整更新的配套是：改檔 → 升 SW 版號 → 更新功能描述（如有）→ 補更新日記。
- **全部用相對路徑**（`./sw.js`、`./icon-180.png`）：因為 GitHub Pages 把站放在 `/timer/` 子目錄下，
  寫死絕對路徑 `/sw.js` 會指到網域根目錄而失效。概念類似後端的 context path。
- **iOS 限制**：
  - 網頁不支援震動 API，所以切換階段只有閃光 + 嗶聲，不會震動（Android 才會）。
  - 純網頁無法阻止 iPhone 自動鎖屏，倒數放著不動螢幕可能變暗。
  - Service Worker 需要 HTTPS 才生效（GitHub Pages 預設是 HTTPS，沒問題）。
- **音訊**：用 JS 即時合成 WAV 位元組，包成 `<audio>` 媒體元素播放（`makeBeep()`），無音檔。
  改用媒體元素是為了**繞過 iPhone 側邊靜音鍵**（Web Audio 合成音會被靜音鍵管制，靜音模式下無聲）。
  iOS 規定媒體只能在使用者點擊的當下首次播放才會解鎖，已在 `start()` 裡用 `unlockAudio()` 處理。
  專注（880Hz）與休息（523Hz）音色不同。
- **計時準確度**：用「結束時間戳」（`endTime`）比對，而非每秒遞減，分頁切換或卡頓也不會算錯。

## 部署方式

GitHub Pages：把 App 檔案（index.html / manifest / sw.js 放根目錄，4 個 icon 放 `icons/`）
上傳到 repo，Settings → Pages → Deploy from a branch → main / root。
（`docs/` 教學文件可不上傳，但放著也不影響 App。）
網址格式：`https://<帳號>.github.io/<repo>/`

## 可能的後續方向（尚未做）

- 用 localStorage 記住使用者調整的秒數（目前重整會回預設值）。
- 音效開關。
- 多段循環（例如「專注 × 4 後接一次長休息」）—— `index.html` 的 `PHASES` 陣列已支援擴充。
- Wake Lock 嘗試（防止螢幕休眠，但 iOS 支援度不穩，需測試）。
