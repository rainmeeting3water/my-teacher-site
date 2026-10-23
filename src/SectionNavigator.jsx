import { useEffect, useId, useRef, useState } from 'react'
import { X } from 'lucide-react'
import './SectionNavigator.css'

export default function SectionNavigator({ language = 'zh', items = [], onNavigate }) {
  const [open, setOpen] = useState(false)
  const [activeId, setActiveId] = useState('')
  const root = useRef(null)
  const trigger = useRef(null)
  const panelId = useId()
  const english = language === 'en'
  const label = english ? 'Explore' : '導覽'
  const closeLabel = english ? 'Close page navigation' : '關閉頁內導覽'
  const sectionIds = items.map(item => item.id).join('|')

  useEffect(() => {
    const sections = sectionIds.split('|').filter(Boolean).map(id => document.getElementById(id)).filter(Boolean)
    if (!sections.length) return
    let frame = 0
    const update = () => {
      frame = 0
      const atEnd = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 8
      const readingLine = Math.min(window.innerHeight * .28, 180)
      const current = atEnd ? sections.at(-1) : [...sections].reverse().find(section => section.getBoundingClientRect().top <= readingLine)
      setActiveId(current?.id || '')
    }
    const schedule = () => { if (!frame) frame = requestAnimationFrame(update) }
    update()
    window.addEventListener('scroll', schedule, { passive: true })
    window.addEventListener('resize', schedule)
    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener('scroll', schedule)
      window.removeEventListener('resize', schedule)
    }
  }, [sectionIds])

  useEffect(() => {
    if (!open) return
    const handlePointer = event => {
      if (!root.current?.contains(event.target)) setOpen(false)
    }
    const handleKey = event => {
      if (event.key !== 'Escape') return
      event.preventDefault()
      setOpen(false)
      trigger.current?.focus()
    }
    document.addEventListener('pointerdown', handlePointer)
    document.addEventListener('keydown', handleKey)
    return () => {
      document.removeEventListener('pointerdown', handlePointer)
      document.removeEventListener('keydown', handleKey)
    }
  }, [open])

  const navigate = id => {
    setOpen(false)
    setActiveId(id)
    onNavigate?.(id)
    // Keep the anchor's normal URL/scroll behavior; move keyboard focus to its heading.
    requestAnimationFrame(() => {
      const section = document.getElementById(id)
      const heading = section?.querySelector('h1, h2') || section
      if (!heading) return
      if (!heading.hasAttribute('tabindex')) heading.setAttribute('tabindex', '-1')
      heading.focus({ preventScroll: true })
    })
  }

  if (!items.length) return null

  return <div className="section-navigator" ref={root} onBlur={event => {
    if (!event.currentTarget.contains(event.relatedTarget)) setOpen(false)
  }}>
    <button ref={trigger} type="button" className="section-navigator-trigger" aria-label={open ? closeLabel : (english ? 'Open page navigation' : '開啟頁內導覽')} aria-expanded={open} aria-controls={panelId} onClick={() => setOpen(value => !value)}>
      {open ? <X size={23} aria-hidden="true" /> : <svg className="section-navigator-coordinate" width="26" height="26" viewBox="0 0 28 28" fill="none" aria-hidden="true" focusable="false">
        <path d="M1 14H27M14 1V27" stroke="currentColor" strokeWidth="1" opacity=".35" />
        <circle cx="14" cy="14" r="10" stroke="currentColor" strokeWidth="1.25" />
        <path d="M14 14L21.07 6.93" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        <circle cx="21.07" cy="6.93" r="2.1" fill="currentColor" />
      </svg>}
      <span>{label}</span>
    </button>
    <nav id={panelId} className="section-navigator-panel" aria-label={english ? 'On this page' : '頁內導覽'} hidden={!open}>
      <p className="section-navigator-title">{english ? 'Explore the connections' : '探索座標'}</p>
      <svg className="section-navigator-path" viewBox="0 0 240 24" fill="none" aria-hidden="true" focusable="false">
        <path d="M12 12H228" stroke="currentColor" strokeWidth="1" />
        {items.map((item, index) => <circle key={item.id} cx={items.length > 1 ? 12 + index * 216 / (items.length - 1) : 120} cy="12" r={activeId === item.id ? 4.5 : 3} className={activeId === item.id ? 'is-active' : undefined} />)}
      </svg>
      <ol>{items.map((item, index) => <li key={item.id}>
        <a href={`#${item.id}`} aria-current={activeId === item.id ? 'location' : undefined} onClick={() => navigate(item.id)}>
          <span className="section-navigator-number" aria-hidden="true">{String(index + 1).padStart(2, '0')}</span>
          <span>{item.label}</span>
          <span className="section-navigator-dot" aria-hidden="true" />
        </a>
      </li>)}</ol>
    </nav>
  </div>
}
