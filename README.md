# 江致劼｜數學教學與創作

教師個人作品集，以數學教學、互動教材、原創遊戲、跨域課程與教學分享為主軸。
網站使用 React、Vite 與 Tailwind CSS，提供中英文切換、作品搜尋及頁內展開閱讀。

## 開發與建置

需求：符合 `package.json` 與既有套件要求的 Node.js、npm。
依賴版本由 `package-lock.json` 鎖定。

```sh
npm ci
npm run dev
```

```sh
npm run lint
npm run build
npm run preview
```

`npm ci` 依鎖定檔還原本機依賴；`npm run build` 重新產生 `dist`。
`npm run preview` 在本機檢視建置結果，不會發布網站。
Netlify 的建置命令為 `npm run build`，發布目錄為 `dist`。
原始碼與公開素材列入版本控制，`node_modules`、`dist` 與本機服務設定不列入。

## 內容維護

- `src/content.js`：中英文作品、經歷、研究、證書及出版資料。
- `src/uiCopy.js`：中英文介面、個人介紹與聯絡文案。
- `src/media.js`：原創弧光守護者雙語介紹／玩法影片及數學漫畫清單。
- `src/App.jsx`、`src/App.css`：頁面、語言切換、搜尋、頁內展開及手機選單。
- `src/InfinityCover.jsx`、`src/InfinityCover.css`：封面理念輪替，以及收斂、導數與黎曼和轉場。
- `src/SectionNavigator.jsx`、`src/SectionNavigator.css`：章節導覽。
- `public/images`：供網站使用的精選圖片與處理後證書。
- `public/media`：點擊後才載入的原創影片，無自動播放。
- `index.html`：預設語言、網頁摘要及社群分享設定。

日期依已確認的精度呈現：日用 `YYYY/MM/DD`、月用 `YYYY/MM`；
僅知年份或學年度時保留該精度，不以檔案上傳日期推定完成時間。
開發中、入選、預定發表與已發表等狀態應分別維護。

## 公開素材

證書採用裁切或遮蔽後的展示檔；履歷原件、未處理證書、學生資料與未確認授權的團體照不放入公開目錄。
出版社素材僅展示已取得同意的局部題頭與本人署名，不包含完整刊物或解答。
個別素材的展示不代表授權第三方再利用，引用或轉載前請先聯絡作者確認。

## 互動與可及性

首次開啟先顯示封面；點選無限符號後播放約 2.9 秒的轉場，再顯示主頁。
訪客也可直接略過轉場。網站尊重 `prefers-reduced-motion`，並提供循環暫停、鍵盤操作及清楚的焦點狀態。
作品與歷程以頁內展開為主，影片不自動播放，圖片保留替代文字。
