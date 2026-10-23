import { createContext, useCallback, useContext, useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react'
import { ArrowDown, ArrowUpRight, ChevronDown, Camera, Mail, Menu, Moon, Search, X } from 'lucide-react'
import { contentByLanguage, email, instagram } from './content'
import { mediaByLanguage } from './media'
import { uiCopy } from './uiCopy'
import SectionNavigator from './SectionNavigator'
import InfinityCover from './InfinityCover'
import './App.css'

const CopyContext = createContext(uiCopy.zh)

function SafeImage({ src, alt, eager = false, width = 960, height = 540, ...props }) {
  const copy = useContext(CopyContext)
  const [failedSrc, setFailedSrc] = useState(null)
  return failedSrc === src
    ? <span className="image-fallback" role="img" aria-label={`${alt}: ${copy.imageError}`}>{copy.imageError}<span>{copy.imageErrorDetail}</span></span>
    : <img src={src} alt={alt} width={width} height={height} loading={eager ? 'eager' : 'lazy'} fetchPriority={eager ? 'high' : 'auto'} decoding="async" onError={() => setFailedSrc(src)} {...props} />
}

function OutLink({ href, children }) {
  const copy = useContext(CopyContext)
  return <a className="text-link" href={href} target="_blank" rel="noopener noreferrer">{children}<ArrowUpRight size={16} aria-hidden="true" /><span className="sr-only">{copy.newTab}</span></a>
}

function SectionHeading({ number, title, kicker, children }) {
  return <div className="section-heading"><div><p className="eyebrow">{number}<span lang="en">{kicker}</span></p><h2 tabIndex="-1">{title}</h2></div>{children && <p className="section-intro">{children}</p>}</div>
}

function ProjectVisual({ project, video }) {
  const source = project.image || video?.poster
  return source ? <SafeImage src={source} alt={project.alt || video?.title || project.title} /> : <div className="project-title-art" aria-hidden="true"><Moon size={35} strokeWidth={1} /><strong>{project.title}</strong>{project.en && <span lang="en">{project.en}</span>}</div>
}

function GameVideo({ video }) {
  const copy = useContext(CopyContext)
  const [open, setOpen] = useState(false)
  const player = useRef(null)
  const fullscreenLabel = copy === uiCopy.en ? 'View fullscreen' : '全螢幕觀看'
  const canFullscreen = Boolean(document.fullscreenEnabled || document.webkitFullscreenEnabled || 'webkitEnterFullscreen' in document.createElement('video'))
  useEffect(() => {
    const element = player.current
    return () => element?.pause()
  }, [open, video?.src])
  if (!video?.src) return null
  const enterFullscreen = async () => {
    const element = player.current
    if (!element) return
    try {
      if (element.requestFullscreen) await element.requestFullscreen()
      else if (element.webkitEnterFullscreen) element.webkitEnterFullscreen()
    } catch { element.focus() }
  }
  return <details className="game-video-panel" onToggle={event => {
    if (!event.currentTarget.open) player.current?.pause()
    setOpen(event.currentTarget.open)
  }}><summary><span>{video.title || copy.project.demo}</span><ChevronDown size={18} aria-hidden="true" /></summary>{open && <figure className="game-video"><video ref={player} controls preload="none" poster={video.poster || undefined} aria-label={video.title || copy.project.demo} playsInline src={video.src}>{video.tracks?.map(track => <track key={track.src} kind={track.kind || 'captions'} src={track.src} srcLang={track.srcLang} label={track.label} default={track.default} />)}{copy.project.unsupported} <a href={video.src}>{copy.project.download}</a></video>{canFullscreen && <button type="button" className="video-fullscreen" onClick={enterFullscreen}>{fullscreenLabel}</button>}{video.caption && <figcaption>{video.caption}</figcaption>}</figure>}</details>
}

function ProjectCard({ project, video }) {
  const copy = useContext(CopyContext)
  const videos = (Array.isArray(video) ? video : [video]).filter(item => item?.src)
  const visualVideo = Array.isArray(video) ? video[0] : video
  return <article id={`project-${project.id}`} className="project-card" aria-labelledby={`title-${project.id}`}>
    <div className={`project-visual visual-${project.id}`}><ProjectVisual project={project} video={visualVideo} /><span className="project-number" aria-hidden="true">{project.number}</span></div>
    <div className="project-body">
      {(project.status || project.secondaryStatus) && <div className="badges">{project.status && <span className="badge">{project.status}</span>}{project.secondaryStatus && <span className="badge badge-subtle">{project.secondaryStatus}</span>}</div>}
      {project.en && <p className="project-en" lang="en">{project.en}</p>}<h3 id={`title-${project.id}`}>{project.title}</h3><p className="project-description">{project.description}</p>
      {project.audience && <p className="project-audience">{project.audience}</p>}{project.date && <p className="project-date">{project.date}</p>}
      <details className="project-details" onToggle={event => { if (!event.currentTarget.open) { event.currentTarget.querySelectorAll('video').forEach(player => player.pause()); event.currentTarget.querySelectorAll('.game-video-panel').forEach(panel => { panel.open = false }) } }}><summary>{videos.length ? copy.project.designWithVideo : copy.project.design}<span className="sr-only">: {project.title}</span><ChevronDown size={18} aria-hidden="true" /></summary><div className="detail-content">
        {project.question && <><h4>{copy.project.question}</h4><p>{project.question}</p></>}{project.interaction && <><h4>{copy.project.interaction}</h4><p>{project.interaction}</p></>}{project.role && <><h4>{copy.project.role}</h4><p>{project.role}</p></>}
        {videos.length > 0 ? <div className="game-video-list">{videos.map(item => <GameVideo key={`${item.id || 'video'}-${item.src}`} video={item} />)}</div> : project.caption && <figure>{project.image && <SafeImage src={project.image} alt={project.alt} />}<figcaption>{project.caption}</figcaption></figure>}
        {project.links?.length > 0 && <div className="project-links">{project.links.map(link => <OutLink key={link.href} href={link.href}>{link.label}</OutLink>)}</div>}
      </div></details>
    </div>
  </article>
}

function Record({ item, expandable = false }) {
  const copy = useContext(CopyContext)
  const body = <>{item.text && <p>{item.text}</p>}{item.image && <figure className="record-image"><SafeImage src={item.image} alt={item.alt} width={item.imageWidth || 960} height={item.imageHeight || 540} />{item.imageCaption && <figcaption>{item.imageCaption}</figcaption>}</figure>}{expandable && item.role && <p className="record-meta">{item.role}</p>}{item.href && <OutLink href={item.href}>{item.linkLabel}</OutLink>}</>
  return <article id={expandable ? `work-${item.id}` : undefined} className="record">{expandable
    ? <details className="other-work-details"><summary><span className="other-work-heading"><span className="record-heading">{item.date && <span className="record-date">{item.date}</span>}{item.status && <span className="badge badge-subtle">{item.status}</span>}</span><strong>{item.title}</strong>{item.summary && <span className="other-work-summary">{item.summary}</span>}<span className="other-work-action">{copy.collection.view}</span></span><ChevronDown size={20} aria-hidden="true" /></summary><div className="other-work-body">{body}</div></details>
    : <><div className="record-heading">{item.date && <p className="record-date">{item.date}</p>}{item.status && <span className="badge badge-subtle">{item.status}</span>}</div><h3>{item.title}</h3>{body}</>}</article>
}

function ProfessionalHighlight({ item }) {
  const copy = useContext(CopyContext)
  return <article id={`highlight-${item.id}`} className="professional-highlight"><details><summary><span className="highlight-preview"><span className="record-heading"><span className="record-date">{item.date}</span>{item.status && <span className="badge badge-subtle">{item.status}</span>}</span><strong>{item.title}</strong><span className="highlight-description">{item.summary}</span><span className="highlight-action">{copy.journey.exploreHighlight}<ChevronDown size={18} aria-hidden="true" /></span></span>{item.image && <span className="highlight-thumbnail"><SafeImage src={item.image} alt={item.alt} width={item.imageWidth} height={item.imageHeight} /></span>}</summary><div className="highlight-body"><p>{item.text}</p>{item.image && <figure><SafeImage src={item.image} alt={item.alt} width={item.imageWidth} height={item.imageHeight} />{item.imageCaption && <figcaption>{item.imageCaption}</figcaption>}</figure>}</div></details></article>
}

function ResearchRecord({ item }) {
  const copy = useContext(CopyContext)
  return <article id={`research-${item.id}`} className="research-record"><details><summary><span><span className="record-heading"><span className="record-date">{item.date}</span><span className="badge badge-subtle">{item.status}</span></span><strong>{item.title}</strong><span className="research-preview">{item.summary}</span><span className="research-action">{copy.journey.readResearch}</span></span><ChevronDown size={18} aria-hidden="true" /></summary><div className="research-body"><p>{item.text}</p>{item.role && <p className="record-meta">{item.role}</p>}{item.href && <OutLink href={item.href}>{item.linkLabel}</OutLink>}</div></details></article>
}

function Certificate({ certificate }) {
  const copy = useContext(CopyContext)
  const [expanded, setExpanded] = useState(false)
  return <article className="certificate"><h4>{certificate.title}</h4>{certificate.date && <p className="record-date">{certificate.date}</p>}{certificate.note && <p>{certificate.note}</p>}{certificate.image && <details className="certificate-zoom" onToggle={event => setExpanded(event.currentTarget.open)}><summary><SafeImage src={certificate.image} alt={copy.collection.certificateThumbnail(certificate.title)} width={certificate.imageWidth || 792} height={certificate.imageHeight || 612} /><span>{expanded ? copy.collection.collapseCertificate : copy.collection.expandCertificate}<ChevronDown size={17} aria-hidden="true" /></span></summary><div className="certificate-full"><SafeImage src={certificate.image} alt={copy.collection.certificateFull(certificate.title)} width={certificate.imageWidth || 792} height={certificate.imageHeight || 612} /></div></details>}</article>
}

function ComicCard({ comic }) {
  const copy = useContext(CopyContext)
  return <article id={`comic-${comic.id}`} className="comic-card"><details><summary><span className="comic-cover">{comic.images?.[0] && <SafeImage {...comic.images[0]} />}</span><span className="comic-summary"><span className="record-date">{comic.date}</span><strong>{comic.title}</strong><span>{comic.summary}</span><span className="other-work-action">{copy.comics.view}<ChevronDown size={18} aria-hidden="true" /></span></span></summary><div className="comic-body">{comic.text && <p>{comic.text}</p>}{copy.comics.originalLanguage && <p className="artwork-language">{copy.comics.originalLanguage}</p>}<div className="comic-gallery">{comic.images?.map((image, index) => <figure key={image.src}><SafeImage {...image} />{image.caption && <figcaption>{image.caption}</figcaption>}<span className="comic-page" aria-hidden="true">{String(index + 1).padStart(2, '0')}</span></figure>)}</div>{comic.role && <p className="record-meta">{comic.role}</p>}</div></details></article>
}

const normalizeSearch = value => String(value || '').normalize('NFKC').toLocaleLowerCase().replace(/\s+/g, ' ').trim()

function WorkSearch({ language }) {
  const copy = useContext(CopyContext)
  const [query, setQuery] = useState('')
  const input = useRef(null)
  const index = useMemo(() => {
    const entries = new Map()
    for (const lang of ['zh', 'en']) {
      const content = contentByLanguage[lang]
      for (const [type, items] of [['project', content.projects], ['work', content.otherWorks], ['highlight', content.highlights || []], ['research', content.research], ['comic', mediaByLanguage[lang]?.comics || []]]) {
        for (const item of items) {
          const key = `${type}-${item.id}`
          const existing = entries.get(key) || { key, type, localized: {}, terms: '' }
          existing.localized[lang] = item
          existing.terms += ` ${[item.title, item.en, item.description, item.summary, item.text, item.interaction, item.date, item.keywords].filter(Boolean).join(' ')}`
          entries.set(key, existing)
        }
      }
    }
    return [...entries.values()].map(entry => ({ ...entry, terms: normalizeSearch(entry.terms) }))
  }, [])
  const terms = normalizeSearch(query).split(' ').filter(Boolean)
  const results = terms.length ? index.filter(entry => terms.every(term => entry.terms.includes(term))) : []
  const select = result => {
    const target = document.getElementById(result.key)
    if (!target) return
    let parent = target.parentElement
    while (parent) { if (parent.tagName === 'DETAILS') parent.open = true; parent = parent.parentElement }
    const details = target.querySelector('details')
    if (details) details.open = true
    const heading = target.querySelector('summary, h3') || target
    if (heading.tagName !== 'SUMMARY' && !heading.hasAttribute('tabindex')) heading.tabIndex = -1
    heading.focus({ preventScroll: true })
    target.scrollIntoView({ behavior: window.matchMedia?.('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth', block: 'start' })
  }
  return <div className="work-search"><form role="search" aria-label={copy.search.label} onSubmit={event => { event.preventDefault(); if (results[0]) select(results[0]) }}><label htmlFor="work-search-input">{copy.search.label}</label><div className="search-input-row"><Search size={20} aria-hidden="true" /><input ref={input} id="work-search-input" type="search" value={query} onChange={event => setQuery(event.target.value)} placeholder={copy.search.placeholder} aria-controls="work-search-results" autoComplete="off" />{query && <button className="search-clear" type="button" aria-label={copy.search.clear} onClick={() => { setQuery(''); input.current?.focus() }}><X size={18} aria-hidden="true" /></button>}<button className="search-submit" type="submit">{copy.search.button}</button></div></form><div id="work-search-results" className="search-results" role="region" aria-label={copy.search.results}><p className={terms.length ? 'search-count' : 'sr-only'} role="status" aria-live="polite">{terms.length ? copy.search.count(results.length) : ''}</p>{terms.length > 0 && (results.length ? <ul>{results.map(result => { const item = result.localized[language] || result.localized.zh; return <li key={result.key}><button type="button" onClick={() => select(result)}><span><small>{copy.search[result.type]}{item.date && <span className="search-result-date"> · {item.date}</span>}</small><strong>{item.title}</strong></span><ArrowDown size={18} aria-hidden="true" /></button></li> })}</ul> : <p>{copy.search.none}</p>)}</div></div>
}

function useReadingMotion(mainRef, language) {
  useEffect(() => {
    const main = mainRef.current
    if (!main || !window.matchMedia || !window.IntersectionObserver) return
    const preference = window.matchMedia('(prefers-reduced-motion: reduce)')
    const animations = new Set()
    const revealed = new WeakSet()
    const sections = main.querySelectorAll('.hero-copy, .hero-photo, .section-heading, .project-card, .method-grid > article, .journey-summary, .professional-highlight, .research-record, .research-list, .philosophy-layout > *, .collection-layout > *, .comic-card, .contact-layout > *')
    const play = (element, distance = 14, duration = 540) => {
      if (preference.matches || !element.animate) return
      const animation = element.animate([{ opacity: 0.78, transform: `translateY(${distance}px)` }, { opacity: 1, transform: 'translateY(0)' }], { duration, easing: 'cubic-bezier(.2,.65,.3,1)' })
      animations.add(animation)
      animation.finished.then(() => animations.delete(animation), () => animations.delete(animation))
    }
    const observer = new IntersectionObserver(entries => entries.forEach(entry => {
      if (!entry.isIntersecting) return
      revealed.add(entry.target)
      observer.unobserve(entry.target)
      play(entry.target)
    }), { threshold: 0, rootMargin: '0px 0px -28px 0px' })
    const applyPreference = () => {
      observer.disconnect()
      animations.forEach(animation => animation.cancel())
      animations.clear()
      if (!preference.matches) sections.forEach(section => { if (!revealed.has(section)) observer.observe(section) })
    }
    const expand = event => {
      if (event.target.tagName !== 'DETAILS' || !event.target.open) return
      Array.from(event.target.children).filter(child => child.tagName !== 'SUMMARY').forEach(child => play(child, 6, 240))
    }
    applyPreference()
    preference.addEventListener('change', applyPreference)
    main.addEventListener('toggle', expand, true)
    return () => {
      observer.disconnect()
      animations.forEach(animation => animation.cancel())
      preference.removeEventListener('change', applyPreference)
      main.removeEventListener('toggle', expand, true)
    }
  }, [mainRef, language])
}

function initialLanguage() {
  try { return window.localStorage.getItem('teacher-site-language') === 'en' ? 'en' : 'zh' } catch { return 'zh' }
}

// Section links work after entry; a new visit always starts at the cover.
const contentAnchors = new Set([
  'main', 'top', 'hero-title', 'works', 'approach', 'journey', 'philosophy-title', 'collection', 'comics', 'contact',
  ...contentByLanguage.zh.projects.flatMap(item => [`project-${item.id}`, `title-${item.id}`]),
  ...contentByLanguage.zh.highlights.map(item => `highlight-${item.id}`),
  ...contentByLanguage.zh.research.map(item => `research-${item.id}`),
  ...contentByLanguage.zh.otherWorks.map(item => `work-${item.id}`),
  ...(mediaByLanguage.zh.comics || []).map(item => `comic-${item.id}`),
])

function contentHashTarget() {
  try {
    const id = decodeURIComponent(window.location.hash.slice(1))
    return contentAnchors.has(id) ? id : null
  } catch { return null }
}

export default function App() {
  const [language, setLanguage] = useState(initialLanguage)
  const [entered, setEntered] = useState(false)
  const [destination, setDestination] = useState(null)
  const [coverVisit, setCoverVisit] = useState(0)
  const [menuOpen, setMenuOpen] = useState(false)
  const menuButton = useRef(null)
  const main = useRef(null)
  const copy = uiCopy[language]
  const { navLinks, projects, methods, experience, research, highlights, certificates, otherWorks } = contentByLanguage[language]
  const media = mediaByLanguage[language] || { arc: null, comics: [] }
  useReadingMotion(main, language)
  const openPortfolio = useCallback((id, updateHistory = true) => {
    setEntered(true)
    setMenuOpen(false)
    setDestination({ id, updateHistory })
  }, [])
  const enterIntroduction = useCallback(() => openPortfolio('top'), [openPortfolio])
  const enterWorks = useCallback(() => openPortfolio('works'), [openPortfolio])

  useLayoutEffect(() => {
    // Browser history can retain #top and its scroll position across a reload.
    const previousRestoration = window.history.scrollRestoration
    window.history.scrollRestoration = 'manual'
    window.history.replaceState(null, '', '#cover')
    window.scrollTo({ top: 0, behavior: 'instant' })
    return () => { window.history.scrollRestoration = previousRestoration }
  }, [])

  useLayoutEffect(() => {
    if (!entered || !destination) return undefined
    // Hidden has been removed in this commit; transfer focus before the next paint.
    const target = document.getElementById(destination.id)
    if (!target) return undefined
    if (destination.updateHistory && window.location.hash !== `#${destination.id}`) {
      window.history.pushState(null, '', `#${destination.id}`)
    }
    target.scrollIntoView({ behavior: 'instant', block: 'start' })
    const heading = target.matches('h1,h2,h3') ? target : target.querySelector('h1,h2,h3') || target
    heading.setAttribute('tabindex', '-1')
    heading.focus({ preventScroll: true })
    return undefined
  }, [entered, destination])

  useEffect(() => {
    const followHash = () => {
      if (!entered) {
        window.history.replaceState(null, '', '#cover')
        window.scrollTo({ top: 0, behavior: 'instant' })
        return
      }
      if (window.location.hash === '#cover') {
        setEntered(false)
        setDestination(null)
        setMenuOpen(false)
        setCoverVisit(current => current + 1)
        window.scrollTo({ top: 0, behavior: 'instant' })
        return
      }
      const id = contentHashTarget()
      if (id) openPortfolio(id, false)
    }
    window.addEventListener('hashchange', followHash)
    return () => window.removeEventListener('hashchange', followHash)
  }, [entered, openPortfolio])
  useEffect(() => {
    document.documentElement.lang = language === 'zh' ? 'zh-Hant' : 'en'
    document.title = copy.documentTitle
    const tags = [['name', 'description', copy.description], ['property', 'og:title', copy.documentTitle], ['property', 'og:description', copy.description], ['property', 'og:locale', language === 'zh' ? 'zh_TW' : 'en_US'], ['name', 'twitter:title', copy.documentTitle], ['name', 'twitter:description', copy.description]]
    tags.forEach(([attribute, name, value]) => document.querySelector(`meta[${attribute}="${name}"]`)?.setAttribute('content', value))
    try { window.localStorage.setItem('teacher-site-language', language) } catch { /* The language switch also works without storage. */ }
  }, [language, copy])
  const closeMenu = () => { setMenuOpen(false); menuButton.current?.focus() }
  const changeLanguage = next => {
    main.current?.querySelectorAll('video').forEach(player => player.pause())
    setLanguage(next)
  }
  const navigate = id => {
    setMenuOpen(false)
    requestAnimationFrame(() => document.querySelector(`#${id} h2`)?.focus({ preventScroll: true }))
  }
  return <CopyContext.Provider value={copy}>
    <a className="skip-link" href="#main" onClick={event => { event.preventDefault(); openPortfolio('main') }}>{copy.skip}</a>
    <header className="site-header" onKeyDown={event => { if (event.key === 'Escape' && menuOpen) { event.preventDefault(); closeMenu() } }}>
      <div className="nav-shell"><a className="brand" href={entered ? '#top' : '#cover'} onClick={() => setMenuOpen(false)}><Moon size={25} strokeWidth={1.5} aria-hidden="true" /><span>{copy.name}<small lang={language === 'zh' ? 'en' : 'zh-Hant'}>{copy.nameSecondary}</small></span></a>
        {entered && <nav id="main-nav" className={menuOpen ? 'main-nav is-open' : 'main-nav'} aria-label={copy.navigation}>{navLinks.map(link => <a key={link.id} href={`#${link.id}`} onClick={() => navigate(link.id)}>{link.label}</a>)}</nav>}
        <div className="nav-tools"><div className="language-switch" role="group" aria-label={copy.language}><button type="button" lang="zh-Hant" aria-pressed={language === 'zh'} onClick={() => changeLanguage('zh')}>中文</button><button type="button" lang="en" aria-pressed={language === 'en'} onClick={() => changeLanguage('en')}>EN<span className="sr-only"> — English</span></button></div>{entered && <button ref={menuButton} className="menu-button" type="button" aria-label={menuOpen ? copy.closeMenu : copy.openMenu} aria-controls="main-nav" aria-expanded={menuOpen} onClick={() => { const opening = !menuOpen; setMenuOpen(opening); if (opening) requestAnimationFrame(() => document.querySelector('#main-nav a')?.focus()) }}>{menuOpen ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}</button>}</div>
      </div>
    </header>
    <InfinityCover key={coverVisit} language={language} entered={entered} onEnter={enterIntroduction} onSkip={enterWorks} />
    <div id="portfolio-content" hidden={!entered}>
    <main id="main" ref={main}>
      <section className="hero" id="top" aria-labelledby="hero-title"><div className="hero-stars" aria-hidden="true" />
        <div className="container hero-layout"><div className="hero-copy"><p className="hero-current"><span aria-hidden="true" />{copy.hero.current}</p>
          <p className="eyebrow hero-kicker" lang="en">{copy.hero.kicker}</p><h1 id="hero-title">{copy.hero.title}<br /><em>{copy.hero.emphasis}</em></h1><p className="hero-description">{copy.hero.description}</p>
          <div className="hero-actions"><a className="button button-amber" href="#works" onClick={() => navigate('works')}>{copy.hero.works}<ArrowDown size={17} aria-hidden="true" /></a><a className="hero-contact" href="#contact" onClick={() => navigate('contact')}>{copy.hero.contact}<ArrowUpRight size={17} aria-hidden="true" /></a></div><p className="hero-degree">{copy.hero.degree}<span>{copy.hero.expertise}</span></p>
        </div><figure className="hero-photo"><div className="portrait-frame"><SafeImage src="/images/portrait.webp" alt={copy.hero.portrait} eager width={680} height={540} /></div><figcaption><span>{copy.hero.caption}</span><small lang="en">{copy.hero.captionEn}</small></figcaption><div className="photo-orbit" aria-hidden="true">✦</div></figure></div>
        <div className="container hero-bottom"><span>{copy.hero.bottom}</span><span lang="en">Observe. Connect. Reason.</span></div>
      </section>
      <section id="works" className="section container"><SectionHeading number="01" kicker={copy.works.kicker} title={copy.works.title}>{copy.works.intro}</SectionHeading><WorkSearch language={language} /><div className="project-grid">{projects.map(project => <ProjectCard key={project.id} project={project} video={project.id === 'arc' ? media.arc : null} />)}</div></section>
      <section id="approach" className="approach-section"><div className="section container"><SectionHeading number="02" kicker={copy.approach.kicker} title={copy.approach.title}>{copy.approach.intro}</SectionHeading><div className="method-grid">{methods.map(method => <article key={method.id || method.number}><span className="method-number">{method.number}</span><h3>{method.title}</h3><p>{method.text}</p></article>)}</div></div></section>
      <section id="journey" className="section container"><SectionHeading number="03" kicker={copy.journey.kicker} title={copy.journey.title}>{copy.journey.intro}</SectionHeading><div className="professional-highlights">{highlights.map(item => <ProfessionalHighlight key={item.id} item={item} />)}</div><div className="journey-layout"><aside className="journey-summary"><span className="eyebrow">{copy.journey.eyebrow}</span><h3>{copy.journey.summaryTitle}</h3>{copy.journey.paragraphs.map(paragraph => <p key={paragraph}>{paragraph}</p>)}</aside><div><h3 className="subheading">{copy.journey.research}</h3><div className="research-list">{research.map(item => <ResearchRecord key={item.id} item={item} />)}</div><details className="collection-details"><summary><span>{copy.journey.experience}<small>{copy.journey.experienceSummary}</small></span><ChevronDown size={21} aria-hidden="true" /></summary><div className="timeline">{experience.map(item => <Record key={item.id} item={item} />)}</div></details></div></div></section>
      <section className="philosophy" aria-labelledby="philosophy-title"><div className="container philosophy-layout"><div><Moon size={48} strokeWidth={1} aria-hidden="true" /><h2 id="philosophy-title">{copy.philosophy.title}</h2><p lang="en">{copy.philosophy.kicker}</p></div><blockquote>{copy.philosophy.lines.map(line => <span className="philosophy-line" key={line}>{line}</span>)}<em>{copy.philosophy.emphasis}</em></blockquote></div></section>
      <section id="collection" className="section container"><SectionHeading number="04" kicker={copy.collection.kicker} title={copy.collection.title}>{copy.collection.intro}</SectionHeading><div className="collection-layout"><div><h3 className="subheading">{copy.collection.certificates}</h3><p className="collection-lead">{copy.collection.certificateLead}</p>{Object.entries(copy.collection.categories).map(([id, label]) => { const items = certificates.filter(cert => cert.category === id); return items.length > 0 && <details key={id} className="collection-details"><summary><span>{label}<small>{copy.collection.categorySummaries[id]}</small></span><ChevronDown size={21} aria-hidden="true" /></summary><div className="certificate-list">{items.map(cert => <Certificate key={cert.id} certificate={cert} />)}</div></details> })}</div><div><h3 className="subheading">{copy.collection.works}</h3><div className="other-works">{otherWorks.map(item => <Record key={item.id} item={item} expandable />)}</div></div></div></section>
      {media.comics?.length > 0 && <section id="comics" className="comics-section"><div className="section container"><SectionHeading number="05" kicker={copy.comics.kicker} title={copy.comics.title}>{copy.comics.intro}</SectionHeading><div className="comic-grid">{media.comics.map(comic => <ComicCard key={comic.id} comic={comic} />)}</div></div></section>}
      <section id="contact" className="contact-section"><div className="container contact-layout"><div><p className="eyebrow">{media.comics?.length > 0 ? '06' : '05'}<span lang="en">{copy.contact.kicker}</span></p><h2 tabIndex="-1">{copy.contact.title}</h2><p>{copy.contact.intro}</p></div><div className="contact-links"><a className="contact-card" href={`mailto:${email}`}><Mail size={25} strokeWidth={1.5} aria-hidden="true" /><span>{copy.contact.email}<strong>{email}</strong></span><ArrowUpRight size={24} aria-hidden="true" /></a>{instagram?.href && <a className="contact-card instagram-card" href={instagram.href} target="_blank" rel="noopener noreferrer"><Camera size={25} strokeWidth={1.5} aria-hidden="true" /><span>{copy.contact.instagram}<strong>@{instagram.handle.replace(/^@/, '')}</strong></span><ArrowUpRight size={24} aria-hidden="true" /><span className="sr-only">{copy.newTab}</span></a>}</div></div></section>
    </main>
    {!menuOpen && <SectionNavigator language={language} items={[...navLinks.slice(0, 4), ...(media.comics?.length ? [{ id: 'comics', label: copy.comics.navigation }] : []), navLinks.at(-1)]} />}
    <footer className="site-footer container"><p>{copy.name}<span lang={language === 'zh' ? 'en' : 'zh-Hant'}>{copy.nameSecondary}</span></p><p>{copy.footer}</p><a href="#top">{copy.backTop}</a></footer>
    </div>
  </CopyContext.Provider>
}
