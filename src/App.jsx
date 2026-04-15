import React, { useState, useEffect } from 'react';
import { 
  Menu, X, BookOpen, Globe, Cpu, Presentation, 
  Award, Mail, Quote, ChevronRight, MapPin, Sparkles, ExternalLink, Calendar
} from 'lucide-react';

// --- Components ---

const SectionHeading = ({ title, subtitle, isDark = false }) => (
  <div className="mb-12 md:mb-16">
    <h2 className={`text-3xl md:text-4xl font-bold tracking-wider mb-4 ${isDark ? 'text-white' : 'text-slate-900'}`}>
      {title}
    </h2>
    {subtitle && (
      <div className={`h-1 w-20 rounded-full mb-6 ${isDark ? 'bg-amber-500' : 'bg-amber-500'}`}></div>
    )}
    {subtitle && (
      <p className={`text-lg max-w-2xl ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
        {subtitle}
      </p>
    )}
  </div>
);

const App = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // 真實 Email
  const CONTACT_EMAIL = "rainmeeting@cyivs.cy.edu.tw"; 

  // Handle scroll for navbar styling
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: '關於我', href: '#about' },
    { name: '專業亮點', href: '#highlights' },
    { name: '精選作品', href: '#works' },
    { name: '專業歷程', href: '#timeline' },
    { name: '教育理念', href: '#philosophy' },
    { name: '證書榮譽', href: '#certificates' },
    { name: '聯絡邀約', href: '#contact' },
  ];

  // 專業發展歷程資料 (預留雙語結構)
  const timelineData = [
    {
      id: 'phase1',
      period: '奠基與跨域',
      title: { zh: '教學奠基與素養深化', en: 'Foundation & Competency Deepening' },
      desc: { zh: '扎根第一線教學現場，積極投入跨領域探究與素養導向課程開發。', en: 'Rooted in frontline teaching, actively developing cross-disciplinary and competency-based courses.' },
      events: [
        { zh: '累積跨學制（國中、高職、普高）教學實務經驗', en: 'Accumulated teaching experience across junior, vocational, and senior high schools' },
        { zh: '107年全國高中數學教學研討會分享：【《模仿遊戲》的數學與跨領域課程實務操作】', en: '107 Nat. Math Teaching Conf. Speaker: "The Imitation Game & Cross-disciplinary Practice"' }
      ]
    },
    {
      id: 'phase2',
      period: '社群與擴散',
      title: { zh: '教師社群與外部擴散', en: 'Teacher Communities & External Sharing' },
      desc: { zh: '透過教師社群力量推動共備，並將課堂經驗轉化為資源進行廣泛交流。', en: 'Driving co-preparation through communities and sharing classroom resources externally.' },
      events: [
        { zh: '參與並召集跨校數學教師共備社群', en: 'Participated and led inter-school math prep communities' },
        { zh: '受邀擔任多所高中職研習講師分享素養導向教學', en: 'Invited speaker for competency-based teaching at various high schools' }
      ]
    },
    {
      id: 'phase3',
      period: '數位與研發',
      title: { zh: '數位科技與教材研發', en: 'Digital Tech & Material Development' },
      desc: { zh: '致力於數位教學推動與實踐，開發優質數位教材提升課堂互動。', en: 'Dedicated to digital teaching implementation and developing interactive materials.' },
      events: [
        { zh: '擔任台達磨課師 (MOOCs) 課程講者與教案研發人員', en: 'Speaker & curriculum developer for Delta MOOCs' },
        { zh: '擔任嘉義高工數位精進計畫負責成員', en: 'Leading member of Digital Enhancement Project at CYIVS' }
      ]
    },
    {
      id: 'phase4',
      period: '113 學年度',
      title: { zh: '雙語與國際增能', en: 'Bilingual & International Empowerment' },
      desc: { zh: '積極參與國內外專業培訓，系統性提升全英語授課與探究教學專業。', en: 'Systematically enhancing EMI and inquiry-based teaching through professional training.' },
      events: [
        { zh: '彰師大中小學雙語教學在職教師增能學分班修畢', en: 'Completed NCUE Bilingual Teaching Credit Class' },
        { zh: '台師大國際教師專業發展學分班修畢', en: 'Completed NTNU Int. Teacher PD Credit Class' },
        { zh: '完成 IB Mathematics (Cat.2) 專業培訓', en: 'Completed IB Mathematics (Cat.2) professional development' }
      ]
    },
    {
      id: 'phase5',
      period: '114 學年度與 2026',
      title: { zh: 'AI 創新與學術發表', en: 'AI Innovation & Academic Publication' },
      desc: { zh: '走在教育科技前沿，實踐生成式 AI 協作開發並發表具體學術成果。', en: 'Pioneering GenAI collaborative development and presenting academic achievements.' },
      events: [
        // 第六次精修：補齊具體的論文名稱與成果產出，保持專業條理
        { zh: '發表：From Digital Curriculum Implementation to Professional Growth: Curriculum Design and Practice with IB Pedagogical Insights', en: 'Paper Presentation: Curriculum Design and Practice with IB Pedagogical Insights' },
        { zh: 'AI 互動模組生成與成品化', en: 'Generation and Productization of AI Interactive Modules' },
        { zh: '2026 DLT accepted paper: FROM PROMPTS TO INTERACTIVE MATERIALS: GENERATIVE AI COLLABORATION IN MATHEMATICS DIGITAL CONTENT DEVELOPMENT', en: '2026 DLT accepted paper on GenAI Collaboration' }
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-800 scroll-smooth selection:bg-amber-200 selection:text-slate-900">
      <style dangerouslySetInnerHTML={{__html: `
        html { scroll-behavior: smooth; }
        .bg-pattern {
          background-image: radial-gradient(#cbd5e1 1px, transparent 1px);
          background-size: 24px 24px;
        }
      `}} />

      {/* Navbar */}
      <nav className={`fixed w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-white/90 backdrop-blur-md shadow-sm py-3' : 'bg-transparent py-5'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            <a href="#" className={`text-xl font-bold tracking-wider transition-colors ${isScrolled ? 'text-slate-900' : 'text-white'}`}>
              江致劼 <span className="font-medium text-[15px] ml-1.5 text-amber-500">Chiang, ChihChieh</span>
            </a>
            
            {/* Desktop Nav */}
            <div className="hidden md:flex space-x-8">
              {navLinks.map((link) => (
                <a 
                  key={link.name} 
                  href={link.href}
                  className={`text-sm font-medium transition-colors hover:text-amber-500 ${isScrolled ? 'text-slate-600' : 'text-slate-200'}`}
                >
                  {link.name}
                </a>
              ))}
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden">
              <button 
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className={isScrolled ? 'text-slate-900' : 'text-white'}
              >
                {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Nav */}
        {mobileMenuOpen && (
          <div className="md:hidden absolute top-full left-0 w-full bg-white shadow-lg py-4 px-4 flex flex-col space-y-4">
            {navLinks.map((link) => (
              <a 
                key={link.name} 
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="text-slate-700 font-medium hover:text-amber-500 px-2 py-1"
              >
                {link.name}
              </a>
            ))}
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <header className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 bg-slate-900 overflow-hidden">
        {/* Abstract Background Elements */}
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 rounded-full bg-blue-800/30 blur-3xl"></div>
        <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 rounded-full bg-amber-500/20 blur-3xl"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
            <div className="lg:w-3/5 space-y-8 text-center lg:text-left">
              <div className="inline-block px-4 py-1.5 rounded-full bg-slate-800 border border-slate-700 text-amber-400 text-sm font-medium tracking-wide shadow-sm">
                Educator & Digital Creator
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white leading-tight tracking-wide">
                把數學從公式，<br className="hidden md:block" />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-200 to-amber-500">
                  帶進探究、跨域與互動
                </span>
              </h1>
              <p className="text-xl md:text-2xl text-slate-300 font-light tracking-wide leading-relaxed">
                江致劼｜數學教師・數位教材設計者・<br className="md:hidden"/>生成式 AI 協作開發實踐者
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start pt-4">
                <a href="#works" className="px-8 py-4 bg-amber-500 hover:bg-amber-400 text-slate-900 rounded-2xl font-bold transition-all shadow-lg shadow-amber-500/30 text-center">
                  探索精選作品
                </a>
                <a href="#contact" className="px-8 py-4 bg-transparent border border-slate-600 hover:border-white text-white rounded-2xl font-bold transition-all text-center">
                  交流與邀約
                </a>
              </div>
            </div>
            <div className="lg:w-2/5 flex justify-center w-full">
              <div className="relative w-full max-w-[20rem] sm:max-w-sm lg:max-w-md">
                <div className="absolute inset-0 border-2 border-amber-500/30 rounded-[2rem] lg:rounded-[2.5rem] transform translate-x-4 translate-y-4"></div>
                <div className="relative rounded-[2rem] lg:rounded-[2.5rem] aspect-[4/5] lg:aspect-[3/4] w-full overflow-hidden shadow-2xl bg-slate-800 hover:-translate-y-1 transition-transform duration-500">
                  <img 
                    src="hero-profile.png" 
                    alt="江致劼 Chiang, ChihChieh" 
                    className="w-full h-full object-cover object-[center_15%]"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* About Section */}
      <section id="about" className="py-24 bg-white scroll-mt-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row gap-16 items-center">
            <div className="md:w-1/2">
              <SectionHeading 
                title="About Me" 
                subtitle="專注於跨越學科界線，打造具備生命力的數學課堂" 
              />
              <div className="space-y-6 text-slate-600 leading-relaxed text-lg">
                <p>
                  我是一位長期投入教學現場的數學教師，畢業於<strong className="text-slate-900 font-semibold">國立成功大學應用數學研究所碩士班</strong>。我的教學場域橫跨國中、高職與普通高中，更具備大學銜接與微積分助教的豐富經驗。我相信數學不僅是黑板上的公式，更是理解世界、訓練邏輯思維的重要工具。
                </p>
                <p>
                  在我的教學實踐中，我致力於推動<strong className="text-slate-900 font-semibold">「素養導向設計」</strong>與<strong className="text-slate-900 font-semibold">「跨領域結合」</strong>。從雙語教育的導入、探究式課程的開發，到運用生成式 AI 協作打造數學數位互動內容，我持續尋找降低學習門檻的解方，期盼能激發學生主動探究的熱情。
                </p>
                <div className="pt-6 border-t border-slate-100">
                  <h4 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-4">Teaching Experience</h4>
                  <ul className="space-y-3">
                    {['嘉義高工', '新竹高商', '東勢國中', '嶺東高中', '成功大學微積分助教 / 國際班微積分助教'].map((school, i) => (
                      <li key={i} className="flex items-center text-slate-700 font-medium">
                        <MapPin size={16} className="text-amber-500 mr-3 shrink-0" />
                        {school}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
            <div className="md:w-1/2 relative bg-slate-50 p-6 md:p-8 rounded-3xl border border-slate-100">
                <div className="flex flex-col gap-4 relative">
                  <img src="about-portrait.png" alt="Chiang, ChihChieh Portrait" className="rounded-2xl h-72 w-full object-cover object-[center_30%] shadow-sm hover:opacity-95 transition-opacity" />
                  <div className="grid grid-cols-2 gap-4">
                    <img src="work-teaching.png" alt="Teaching Action" className="rounded-2xl h-40 w-full object-cover shadow-sm" />
                    <img src="work-sharing-group.jpg" alt="Teacher Sharing Group" className="rounded-2xl h-40 w-full object-cover shadow-sm" />
                  </div>
                </div>
            </div>
          </div>
        </div>
      </section>

      {/* Professional Highlights */}
      <section id="highlights" className="py-24 bg-slate-50 bg-pattern scroll-mt-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading 
            title="Professional Highlights" 
            subtitle="四大核心領域，建構全方位的現代數學教育體系" 
          />
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Card 1 */}
            <div className="bg-white p-8 rounded-[2rem] shadow-sm hover:shadow-xl transition-all duration-300 border border-slate-100 group relative overflow-hidden">
              <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity">
                <Presentation size={100} />
              </div>
              <div className="w-14 h-14 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center mb-6">
                <Presentation size={28} />
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-3">教學場域跨度</h3>
              <p className="text-slate-600 leading-relaxed mb-4">
                具備從國中、高職、普高到大學的完整教學與銜接經驗。深刻理解不同學齡與體系學生的學習痛點，能有效進行差異化教學與課程轉化。
              </p>
              <div className="flex flex-wrap gap-2 mt-4">
                {['國中教育', '高職數學', '普通高中', '大學微積分'].map(tag => (
                  <span key={tag} className="text-xs font-medium px-3 py-1 bg-slate-100 text-slate-600 rounded-full">{tag}</span>
                ))}
              </div>
            </div>

            {/* Card 2 */}
            <div className="bg-white p-8 rounded-[2rem] shadow-sm hover:shadow-xl transition-all duration-300 border border-slate-100 group relative overflow-hidden">
              <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity">
                <BookOpen size={100} />
              </div>
              <div className="w-14 h-14 bg-amber-50 text-amber-600 rounded-2xl flex items-center justify-center mb-6">
                <BookOpen size={28} />
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-3">素養與跨域設計</h3>
              <p className="text-slate-600 leading-relaxed mb-4">
                打破學科框架，將生活情境融入數學。擅長以電影、桌遊、魔術為媒介，設計素養導向課程，並具備豐富的素養命題與探究學習設計實務經驗。
              </p>
              <div className="flex flex-wrap gap-2 mt-4">
                {['電影融入', '桌遊數學', '魔術數學', '素養命題'].map(tag => (
                  <span key={tag} className="text-xs font-medium px-3 py-1 bg-slate-100 text-slate-600 rounded-full">{tag}</span>
                ))}
              </div>
            </div>

            {/* Card 3 */}
            <div className="bg-white p-8 rounded-[2rem] shadow-sm hover:shadow-xl transition-all duration-300 border border-slate-100 group relative overflow-hidden">
              <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity">
                <Cpu size={100} />
              </div>
              <div className="w-14 h-14 bg-indigo-50 text-indigo-600 rounded-2xl flex items-center justify-center mb-6">
                <Cpu size={28} />
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-3">數位教學與 AI 融入</h3>
              <p className="text-slate-600 leading-relaxed mb-4">
                走在教育科技前沿，實踐生成式 AI 與數學教學的結合。開發 AI 輔助教材與互動模組，推動數位教材設計，提升學習互動性與個人化學習體驗。
              </p>
              <div className="flex flex-wrap gap-2 mt-4">
                {['生成式 AI', '數位教材', '互動模組', '科技融入'].map(tag => (
                  <span key={tag} className="text-xs font-medium px-3 py-1 bg-slate-100 text-slate-600 rounded-full">{tag}</span>
                ))}
              </div>
            </div>

            {/* Card 4 */}
            <div className="bg-white p-8 rounded-[2rem] shadow-sm hover:shadow-xl transition-all duration-300 border border-slate-100 group relative overflow-hidden">
              <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity">
                <Globe size={100} />
              </div>
              <div className="w-14 h-14 bg-emerald-50 text-emerald-600 rounded-2xl flex items-center justify-center mb-6">
                <Globe size={28} />
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-3">國際與雙語進修</h3>
              <p className="text-slate-600 leading-relaxed mb-4">
                具備國際化視野，積極參與國際課程研習。擁有英語授課經驗（EMI），並能將 IB 國際文憑課程的探究精神轉化至本土數學課堂中。
              </p>
              <div className="flex flex-wrap gap-2 mt-4">
                {['TKT: CLIL', 'IB Mathematics', '英語授課', '國際教育'].map(tag => (
                  <span key={tag} className="text-xs font-medium px-3 py-1 bg-slate-100 text-slate-600 rounded-full">{tag}</span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Work */}
      <section id="works" className="py-24 bg-white scroll-mt-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading 
            title="Featured Work" 
            subtitle="精選專案、著作與數位內容開發成果" 
          />
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { 
                title: '社群共備：趣味生活數學', 
                desc: '透過社群力量，與教學夥伴共同研發結合生活情境的趣味數學課程，深化教學實務交流。', 
                tag: '社群共備', 
                image: 'work-poster.png' 
              },
              { 
                title: '跨校共備社群', 
                desc: '跨越學校界線，與不同背景的教師激盪教學火花，專注於探究實作與素養課程的開發。', 
                tag: '社群共備', 
                image: 'work-team.png' 
              },
              { 
                title: '素養命題小錦囊', 
                desc: '系統化拆解素養題型設計要訣，協助教師快速掌握命題核心，落實素養導向的教學與評量應用。', 
                tag: '素養資源', // 統一 Tag
                image: 'work-competency-guide.png',
                link: 'https://po.ltedu.com.tw/index.php/files?id=263' 
              },
              { 
                title: '數養二三事', 
                desc: '專注於數學素養的推廣，提供教學現場可實際操作的策略、教案分享與課堂轉化實務。', 
                tag: '素養資源', // 統一 Tag
                image: 'work-math-literacy-notes.png',
                link: 'https://po.ltedu.com.tw/index.php/files?id=1490' 
              },
              { 
                title: 'AI 協作開發實踐', 
                desc: '利用生成式 AI 工具輔助開發數學數位內容、自動生成互動題型與視覺化圖表的相關成果。', 
                tag: 'AI 創新', 
                image: 'work-ai-gen.png', 
                link: 'https://www.instagram.com/jsmathroughout/p/DRm2DCFEo6P/' 
              },
              { 
                title: 'Umineko Math 互動網站', 
                desc: '結合動漫元素與前端網頁技術，開發具備高互動性與沉浸感的數學數位學習平台。', 
                tag: '互動網站', 
                image: 'work-umineko.png', 
                link: 'https://umineko-math.netlify.app/' 
              },
              { 
                title: 'AI 模組：圖式展開', 
                subtitle: '平面方程式的探究',
                desc: '運用 AI 模組化設計平面方程式的互動教學內容，增進學生對於空間幾何的理解與應用。', 
                tag: '數位模組', 
                image: 'work-planecy.png', 
                link: 'https://planecyivsmath3.netlify.app/' 
              },
              { 
                title: '文華高中分享：電影中的數學', 
                desc: '受邀至文華高中進行專題分享，以電影情節作為教學切入點，探討其中蘊藏的數學概念。', 
                tag: '專題分享', 
                image: 'work-conference.jpg' 
              },
            ].map((work, idx) => (
              <div key={idx} className="group rounded-3xl border border-slate-100 bg-slate-50 overflow-hidden hover:shadow-xl transition-all duration-300 flex flex-col">
                {work.image ? (
                  // 第六次精修：改用統一的 aspect-[16/9] 比例，確保每張圖片高度一致不跳動
                  <div className="aspect-[16/9] w-full overflow-hidden bg-slate-200 relative">
                    <img 
                      src={work.image} 
                      alt={work.title} 
                      onError={(e) => { e.target.style.display = 'none'; e.target.parentElement.classList.add('flex','items-center','justify-center','bg-slate-100'); }}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" 
                    />
                  </div>
                ) : (
                  <div className="h-2 bg-amber-500 w-full"></div>
                )}
                <div className="p-7 flex-1 flex flex-col">
                  <div className="flex justify-between items-start mb-4">
                    <span className="px-3 py-1 bg-white text-slate-800 text-xs font-bold rounded-full shadow-sm tracking-wide">
                      {work.tag}
                    </span>
                    <Sparkles size={18} className="text-amber-500 opacity-50 group-hover:opacity-100 transition-opacity" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mb-1">{work.title}</h3>
                  {work.subtitle && (
                    <div className="text-sm font-semibold text-amber-600 mb-3">{work.subtitle}</div>
                  )}
                  {/* 使用 flex-1 確保底部的連結永遠可以切齊推到最下面 */}
                  <p className={`text-slate-600 text-sm leading-relaxed flex-1 ${work.subtitle ? 'mt-1' : 'mt-3'}`}>
                    {work.desc}
                  </p>
                  
                  {work.link && (
                    <a href={work.link} target="_blank" rel="noreferrer" className="inline-flex items-center text-sm font-bold text-blue-600 hover:text-blue-800 transition-colors mt-5 w-fit pt-2 border-t border-slate-200">
                      了解更多 <ExternalLink size={14} className="ml-1.5" />
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Professional Timeline Section */}
      <section id="timeline" className="py-24 bg-slate-50 bg-pattern scroll-mt-10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading 
            title="Professional Journey" 
            subtitle="專業發展歷程" 
          />
          
          <div className="relative border-l border-slate-200 ml-4 md:ml-6 space-y-12 pb-8">
            {timelineData.map((node, index) => (
              <div key={node.id} className="relative pl-8 md:pl-10 group">
                {/* Timeline Dot */}
                <div className="absolute -left-[9px] top-1.5 w-4 h-4 rounded-full bg-white border-4 border-amber-500 group-hover:bg-amber-500 group-hover:scale-125 transition-all duration-300 shadow-sm"></div>
                
                <div className="flex flex-col mb-1">
                  <span className="text-sm font-bold text-amber-600 tracking-wider mb-2">
                    {node.period}
                  </span>
                  <h3 className="text-2xl font-bold text-slate-900 mb-2">
                    {node.title.zh}
                  </h3>
                </div>
                
                <p className="text-slate-600 mb-4 leading-relaxed">
                  {node.desc.zh}
                </p>
                
                <ul className="space-y-2">
                  {node.events.map((event, i) => (
                    <li key={i} className="flex items-start text-sm text-slate-700 bg-white p-3 rounded-xl border border-slate-100 shadow-sm">
                      <div className="mt-0.5 mr-3 shrink-0 text-slate-400">
                        <Calendar size={14} />
                      </div>
                      <span className="leading-relaxed">{event.zh}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Teaching Philosophy */}
      <section id="philosophy" className="py-32 bg-slate-900 relative scroll-mt-10 overflow-hidden">
        {/* Decorative Stars/Dots */}
        <div className="absolute top-10 left-10 text-amber-500/20"><Sparkles size={40} /></div>
        <div className="absolute bottom-10 right-20 text-white/10"><Sparkles size={60} /></div>
        
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <Quote size={64} className="mx-auto text-amber-500 mb-10 opacity-80" />
          <h2 className="text-sm font-bold text-amber-500 tracking-[0.3em] uppercase mb-8">Teaching Philosophy</h2>
          <blockquote className="text-2xl md:text-3xl lg:text-4xl text-white font-light leading-relaxed mb-12">
            「我希望自己是學生心中的月亮，<br className="hidden md:block" />
            在迷茫的黑夜中散發柔光引路；<br className="hidden md:block" />
            在閃爍的星空下隱身於後陪伴，<br className="hidden md:block" />
            願榮光盡歸於探索天空的繁星。」
          </blockquote>
          <div className="w-24 h-1 bg-amber-500 mx-auto rounded-full opacity-50"></div>
        </div>
      </section>

      {/* Certificates & Recognition */}
      <section id="certificates" className="py-24 bg-white scroll-mt-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading 
            title="Certificates & Recognition" 
            subtitle="持續進修與專業認證，確保教學品質與國際接軌" 
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
            {[
              { title: 'Cambridge English TKT: CLIL', type: 'International Credential', image: 'cert-tkt.png', badgeColor: 'text-blue-600 bg-blue-50 border-blue-100' },
              { title: 'IB Mathematics: Analysis and Approaches (Cat.2)', type: 'International Credential', image: 'cert-ib.jpg', badgeColor: 'text-blue-600 bg-blue-50 border-blue-100' },
              { title: 'Apple Teacher', type: 'Digital Credential', image: 'cert-apple-teacher.png', badgeColor: 'text-emerald-600 bg-emerald-50 border-emerald-100' },
              { title: 'Microsoft MTA: Python', type: 'Digital Credential', image: 'cert-mta.png', badgeColor: 'text-emerald-600 bg-emerald-50 border-emerald-100' },
              { title: '2025 Unbordered Educators 國際研討會發表', type: 'Academic Recognition', image: 'cert-acceptance.png', badgeColor: 'text-indigo-600 bg-indigo-50 border-indigo-100' },
              { title: '嘉義市科展指導成果', type: 'Professional Project', image: 'cert-science-fair.jpg', badgeColor: 'text-amber-600 bg-amber-50 border-amber-100' },
              { title: '台達磨課師線上學習新視界 / 補救教學教案研發', type: 'Professional Project', image: 'cert-mooc.jpg', badgeColor: 'text-amber-600 bg-amber-50 border-amber-100' },
            ].map((cert, idx) => (
              <div key={idx} className="flex flex-col sm:flex-row items-start sm:items-center p-6 bg-slate-50 rounded-3xl border border-slate-100 hover:border-amber-200 hover:shadow-md transition-all duration-300 group">
                <div className="w-full sm:w-40 h-48 sm:h-32 shrink-0 bg-white rounded-2xl shadow-sm border border-slate-200 flex items-center justify-center text-slate-400 overflow-hidden transition-all mb-5 sm:mb-0 sm:mr-6 relative">
                  {cert.image ? (
                    <img 
                      src={cert.image} 
                      alt={cert.title} 
                      onError={(e) => { e.target.style.display = 'none'; e.target.parentElement.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 15V3m0 12l-4-4m4 4l4-4M2 17l.621 2.485A2 2 0 0 0 4.561 21h14.878a2 2 0 0 0 1.94-1.515L22 17"></path></svg>'; }}
                      className="w-full h-full object-contain p-2 opacity-95 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500" 
                    />
                  ) : (
                    <Award size={28} />
                  )}
                </div>
                <div className="flex flex-col h-full justify-center">
                  <div className="mb-2">
                    <span className={`text-[11px] font-bold px-3 py-1 rounded-full border tracking-wider uppercase ${cert.badgeColor}`}>
                      {cert.type}
                    </span>
                  </div>
                  <h4 className="text-xl font-bold text-slate-800 leading-snug mt-1">{cert.title}</h4>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-24 bg-slate-100 scroll-mt-10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="relative inline-block mb-8">
            <div className="absolute inset-0 bg-amber-500 rounded-full blur-xl opacity-20 transform translate-y-2"></div>
            <img src="profile-secondary.png" alt="Chiang, ChihChieh" className="relative w-28 h-28 rounded-full object-cover object-top shadow-xl border-4 border-white" />
            <div className="absolute bottom-0 right-0 w-8 h-8 bg-slate-900 rounded-full flex items-center justify-center border-2 border-white text-white">
              <Mail size={14} />
            </div>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6">期待與您開啟更多教育的可能</h2>
          <p className="text-lg text-slate-600 mb-8 max-w-2xl mx-auto leading-relaxed">
            無論是演講邀約、課程開發合作、數位教材顧問，或是任何關於數學教育與 AI 科技融入的交流，都歡迎隨時來信。
          </p>
          
          <div className="flex flex-col items-center justify-center">
            <a href={`mailto:${CONTACT_EMAIL}`} className="inline-flex items-center justify-center px-8 py-4 bg-slate-900 hover:bg-slate-800 text-white rounded-2xl font-bold transition-all text-lg shadow-xl shadow-slate-900/20 mb-4">
              寫信與我聯繫 <ExternalLink size={20} className="ml-2 opacity-80" />
            </a>
            <p className="text-sm text-slate-500 font-medium tracking-wide bg-white/50 px-4 py-1.5 rounded-full border border-slate-200">
              {CONTACT_EMAIL}
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 py-10 border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-slate-400 text-sm">
            © {new Date().getFullYear()} Chiang, ChihChieh. All rights reserved.
          </div>
          <div className="flex space-x-6 text-sm text-slate-500">
            <span className="text-slate-500 tracking-wide">Mathematics</span>
            <span>•</span>
            <span className="text-slate-500 tracking-wide">Digital Education</span>
            <span>•</span>
            <span className="text-slate-500 tracking-wide">GenAI</span>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;