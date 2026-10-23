// Selected portfolio media; source records are kept outside the public build.
const midpoint = '/images/comic-midpoint.webp'
const functions = '/images/comic-functions.webp'

export const mediaByLanguage = {
  zh: {
    arc: [
    {
        "id": "introduction",
        "src": "/media/arc-introduction-zh.mp4",
        "poster": "/images/arc-introduction-zh-poster.webp",
        "title": "觀看遊戲介紹 · 1:24",
        "caption": "走進單位圓檔案館，認識角色、故事與數學探索。2026/10/13"
    },
    {
        "id": "gameplay",
        "src": "/media/arc-gameplay-zh.mp4",
        "poster": "/images/arc-gameplay-zh-poster.webp",
        "title": "觀看玩法示範 · 1:00",
        "caption": "以實際操作呈現遊戲流程與三角數學互動。2026/10/21"
    }
],
    comics: [
      { id: 'midpoint', title: '中點與坐標', date: '2026/09', summary: '把坐標公式放進角色對話，從一段路的中點談起。', text: '《把彼此放進人生裡》節選：從 A(0, 0) 與 B(6, 8)，找出中點 M(3, 4)。', role: '原創故事、數學設計與 AI 協作圖像創作。', images: [{ src: midpoint, alt: '數學漫畫節選：A(0, 0) 與 B(6, 8) 的中點 M(3, 4)，兩段距離均為 5', width: 1200, height: 2100 }] },
      { id: 'functions', title: '函數：恰好一個輸出', date: '2026/09', summary: '用對應圖與反例，把「每個輸入恰好一個輸出」說清楚。', text: '《你是我的函數》節選：如果漏掉一個輸入，或同一個輸入對應兩個輸出，還能稱為函數嗎？', role: '原創故事、數學設計與 AI 協作圖像創作。', images: [{ src: functions, alt: '數學漫畫以兩張對應圖說明：定義域中的 C 沒有輸出，或 B 有兩個輸出，都不符合函數定義', width: 1200, height: 1800 }] },
    ],
  },
  en: {
    arc: [
    {
        "id": "introduction",
        "src": "/media/arc-introduction-en.mp4",
        "poster": "/images/arc-introduction-en-poster.webp",
        "title": "Watch the introduction · 1:24",
        "caption": "Meet the characters, story and mathematical world of the Unit Circle Archive. 2026/10/14"
    },
    {
        "id": "gameplay",
        "src": "/media/arc-gameplay-en.mp4",
        "poster": "/images/arc-gameplay-en-poster.webp",
        "title": "Watch the gameplay demonstration · 1:00",
        "caption": "A recorded walkthrough of the game flow and interactive trigonometry. 2026/10/21"
    }
],
    comics: [
      { id: 'midpoint', title: 'Midpoints and Coordinates', date: '2026/09', summary: 'A character-led story turns a midpoint formula into a conversation about distance.', text: 'A selected page follows A(0, 0) and B(6, 8) to their midpoint, M(3, 4).', role: 'Original story and mathematics design, with AI-assisted artwork.', images: [{ src: midpoint, alt: 'Mathematics comic showing the midpoint M(3, 4) of A(0, 0) and B(6, 8), with both distances equal to 5', width: 1200, height: 2100 }] },
      { id: 'functions', title: 'Functions: Exactly One Output', date: '2026/09', summary: 'Mapping diagrams and counterexamples make the exactly-one-output rule clear.', text: 'Can a relation be a function if an input has no output—or has two? A selected page explores both cases.', role: 'Original story and mathematics design, with AI-assisted artwork.', images: [{ src: functions, alt: 'Two mapping diagrams show why a missing output for C, or two outputs for B, does not define a function', width: 1200, height: 1800 }] },
    ],
  },
}
