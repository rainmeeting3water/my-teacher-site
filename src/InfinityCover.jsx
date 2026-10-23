import { useCallback, useEffect, useId, useRef, useState } from 'react'
import './InfinityCover.css'

const copy = {
  zh: {
    eyebrow: '江致劼 · 數學與教育',
    title: ['讓每一次探索，', '走向自己的光。'],
    intro: '從一個問題出發，讓數學連結故事、生活與更多可能。',
    phrases: ['讓好奇，成為學習的起點', '讓理解，從探索中發生', '用故事，連結數學與生活', '做一輪月亮，陪繁星發光'],
    enter: '從這裡，開始認識我',
    skip: '直接看作品',
    pause: '暫停動態',
    resume: '繼續動態',
    reduced: '已減少動態',
    replay: '再看一次',
    insight: '在無限的可能裡，慢慢走近理解。',
    convergence: '從探索，走向理解',
    accumulation: '讓一點一滴，累積成理解',
    figure: '無限符號的光軌，在點擊後轉成拋物線與切線。函數 f(x) 等於 x 平方，在點 (1, 1) 的切線斜率是 2。接著，區間 0 到 1 依序分為 4、8、16 個等寬區間，以中點函數值作長方形高度。當分割數趨近無限，這些面積和趨近定積分三分之一。',
  },
  en: {
    eyebrow: 'ChihChieh Chiang · Mathematics & Education',
    title: ['Every exploration,', 'a light of its own.'],
    intro: 'Begin with a question. Connect mathematics with stories, everyday life, and new possibilities.',
    phrases: ['Let curiosity begin the journey', 'Let understanding grow through exploration', 'Connect mathematics, stories, and life', 'Be a moon that helps every star shine'],
    enter: 'Start the journey',
    skip: 'Explore my work',
    pause: 'Pause motion',
    resume: 'Resume motion',
    reduced: 'Reduced motion',
    replay: 'Replay the opening',
    insight: 'Among endless possibilities, understanding comes into focus.',
    convergence: 'From exploration to understanding',
    accumulation: 'Small discoveries add up to understanding',
    figure: 'A trail of light traces an infinity symbol. On activation, it becomes the parabola f(x) equals x squared, with a tangent of slope 2 at (1, 1). Next, 4, 8, and 16 equal subintervals of the interval from 0 to 1 form midpoint rectangles. As the number of subdivisions tends to infinity, their area sums approach the definite integral, one third.',
  },
}

export default function InfinityCover({ language = 'zh', onEnter, onSkip, entered = false }) {
  const text = copy[language] || copy.zh
  const [phrase, setPhrase] = useState(0)
  const [paused, setPaused] = useState(false)
  const [visible, setVisible] = useState(true)
  const [documentVisible, setDocumentVisible] = useState(() => !document.hidden)
  const [reduced, setReduced] = useState(() => window.matchMedia('(prefers-reduced-motion: reduce)').matches)
  const [phase, setPhase] = useState('loop')
  const section = useRef(null)
  const pending = useRef([])
  const transitioning = useRef(false)
  const id = useId().replace(/:/g, '')
  const active = !paused && !reduced && visible && documentVisible && phase === 'loop'
  const accumulating = phase.startsWith('riemann-') || phase === 'arrived'

  const clearTransition = useCallback(() => {
    pending.current.forEach(timer => window.clearTimeout(timer))
    pending.current = []
    transitioning.current = false
  }, [])

  const finish = useCallback(() => {
    clearTransition()
    setPhase('arrived')
    onEnter?.()
  }, [clearTransition, onEnter])

  useEffect(() => {
    const preference = window.matchMedia('(prefers-reduced-motion: reduce)')
    const update = event => {
      setReduced(event.matches)
      if (event.matches && transitioning.current) finish()
    }
    preference.addEventListener('change', update)
    return () => preference.removeEventListener('change', update)
  }, [finish])

  useEffect(() => {
    const update = () => setDocumentVisible(!document.hidden)
    document.addEventListener('visibilitychange', update)
    const updateVisibility = isVisible => {
      setVisible(isVisible)
    }
    const checkPosition = () => {
      const bounds = section.current?.getBoundingClientRect()
      if (bounds) updateVisibility(bounds.bottom > 82 && bounds.top < window.innerHeight)
    }
    const observer = 'IntersectionObserver' in window
      ? new IntersectionObserver(entries => updateVisibility(entries[0].isIntersecting), { threshold: 0.05 })
      : null
    if (observer) observer.observe(section.current)
    else {
      window.addEventListener('scroll', checkPosition, { passive: true })
      window.addEventListener('resize', checkPosition)
    }
    return () => {
      document.removeEventListener('visibilitychange', update)
      observer?.disconnect()
      window.removeEventListener('scroll', checkPosition)
      window.removeEventListener('resize', checkPosition)
      clearTransition()
    }
  }, [clearTransition])

  useEffect(() => {
    if (!active) return undefined
    const interval = window.setInterval(() => setPhrase(current => (current + 1) % text.phrases.length), 4300)
    return () => window.clearInterval(interval)
  }, [active, text.phrases.length])

  useEffect(() => {
    if (!entered || !transitioning.current) return undefined
    clearTransition()
    const frame = window.requestAnimationFrame(() => setPhase('arrived'))
    return () => window.cancelAnimationFrame(frame)
  }, [entered, clearTransition])

  function enter(event) {
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || event.button > 0) return
    event.preventDefault()
    if (transitioning.current) return
    if (reduced || paused || phase === 'arrived') {
      finish()
      return
    }
    transitioning.current = true
    setPhase('converging')
    pending.current = [
      window.setTimeout(() => setPhase('derivative'), 600),
      window.setTimeout(() => setPhase('riemann-4'), 1250),
      window.setTimeout(() => setPhase('riemann-8'), 1650),
      window.setTimeout(() => setPhase('riemann-16'), 2050),
      window.setTimeout(finish, 2900),
    ]
  }

  function skip(event) {
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || event.button > 0) return
    event.preventDefault()
    clearTransition()
    setPhase('arrived')
    onSkip?.()
  }

  return <section ref={section} id="cover" className="infinity-cover" hidden={entered} data-phase={phase} data-paused={!active} data-entered={entered} aria-labelledby={`${id}-title`}>
    <div className="infinity-atmosphere" aria-hidden="true" />
    <div className="infinity-cover-inner">
      <div className="infinity-copy">
        <p className="infinity-eyebrow">{text.eyebrow}</p>
        <h1 id={`${id}-title`}>{text.title[0]}<br /><em>{text.title[1]}</em></h1>
        <p className="infinity-intro">{text.intro}</p>
        <div className="infinity-actions">
          <a className="infinity-enter" href="#top" aria-controls="portfolio-content" aria-expanded={entered} onClick={enter}><span>{text.enter}</span><span aria-hidden="true">↗</span></a>
          <a className="infinity-skip" href="#works" onClick={skip}>{text.skip}<span aria-hidden="true"> ↓</span></a>
        </div>
      </div>
      <figure className="infinity-scene" aria-label={text.figure}>
        <button type="button" className="infinity-symbol-trigger" aria-controls="portfolio-content" aria-expanded={entered} aria-label={language === 'en' ? 'Follow the infinity symbol into the portfolio' : '點擊無限符號，進入作品集'} onClick={enter}><svg className="infinity-diagram" viewBox="0 0 520 340" aria-hidden="true" focusable="false">
          <defs>
            <linearGradient id={`${id}-gold`} x1="0" x2="1"><stop stopColor="#8db4cc" /><stop offset=".48" stopColor="#f7d899" /><stop offset="1" stopColor="#c18d49" /></linearGradient>
            <radialGradient id={`${id}-halo`}><stop stopColor="#edc580" stopOpacity=".2" /><stop offset="1" stopColor="#edc580" stopOpacity="0" /></radialGradient>
          </defs>
          <ellipse cx="260" cy="160" rx="245" ry="152" fill={`url(#${id}-halo)`} />
          <g className="infinity-construction" fill="none" stroke="#afc2d0" strokeWidth=".7">
            <ellipse cx="260" cy="160" rx="228" ry="126" />
            <ellipse cx="260" cy="160" rx="172" ry="144" transform="rotate(-22 260 160)" />
            <path d="M25 160H495M260 12V308" strokeDasharray="2 7" />
          </g>
          <g className="infinity-loop">
            <path className="infinity-loop-base" d="M260 160C165 48 60 100 60 160C60 220 165 272 260 160C355 48 460 100 460 160C460 220 355 272 260 160" fill="none" stroke={`url(#${id}-gold)`} strokeWidth="2.6" />
            <path className="infinity-loop-light" pathLength="100" d="M260 160C165 48 60 100 60 160C60 220 165 272 260 160C355 48 460 100 460 160C460 220 355 272 260 160" fill="none" stroke="#fff0c5" strokeWidth="4" strokeLinecap="round" strokeDasharray="2 98" />
            <circle cx="260" cy="160" r="5" fill="#f5dca4" />
            <circle cx="60" cy="160" r="3" fill="#c5dbe8" />
            <circle cx="460" cy="160" r="3" fill="#f1cd88" />
          </g>
          <g className="infinity-calculus" fill="none" strokeLinecap="round">
            {[4, 8, 16].map(n => <g className="infinity-riemann-layer" key={n} data-n={n} data-sum={1 / 3 - 1 / (12 * n * n)}>
              {Array.from({ length: n }, (_, index) => {
                const midpoint = (index + 0.5) / n
                const value = midpoint * midpoint
                return <rect key={index} x={180 + 120 * index / n} y={260 - 80 * value} width={120 / n} height={80 * value} data-midpoint={midpoint} data-value={value} fill="#e9bc70" fillOpacity=".27" stroke="#f1cb87" strokeOpacity=".8" strokeWidth=".65" vectorEffect="non-scaling-stroke" />
              })}
            </g>)}
            <path d="M140 260H415M180 285V40" stroke="#99b5ca" strokeWidth="1" />
            <path d="M300 256V264M176 180H184" stroke="#b7cad6" strokeWidth="1" />
            <path d="M180 180H300V260" stroke="#7595ad" strokeWidth=".8" strokeDasharray="3 5" />
            <path className="infinity-parabola" d="M150 255Q261 292 372 55.2" stroke="#f5d38b" strokeWidth="3.3" />
            <path className="infinity-tangent" d="M240 260L378 76" stroke="#8ebfda" strokeWidth="2" />
            <circle cx="300" cy="180" r="4.5" fill="#fff0c6" stroke="none" />
            <g fill="#cfdae2" stroke="none" fontSize="14" fontFamily="Georgia, serif"><text x="423" y="265">x</text><text x="160" y="36">y</text><text x="154" y="281">0</text><text x="296" y="283">1</text><text x="160" y="185">1</text><text x="321" y="163">(1, 1)</text><text x="387" y="58">f(x) = x²</text></g>
          </g>
          <g className="infinity-star-points" fill="#f0d7a1"><path d="M448 50v12m-6-6h12M95 254v10m-5-5h10" stroke="#e4cc99" strokeWidth="1" /><circle cx="140" cy="58" r="1.4" /><circle cx="402" cy="274" r="1.4" /><circle cx="45" cy="89" r="1.1" /></g>
        </svg></button>
        <figcaption className="infinity-phrases">
          <span className="infinity-current-phrase" key={`${language}-${phrase}`} aria-hidden="true">{phase === 'loop' ? text.phrases[phrase] : accumulating ? text.accumulation : text.convergence}</span>
          <span className="sr-only">{text.phrases.join(language === 'en' ? '. ' : '。')}</span>
          <span className="infinity-equation infinity-derivative-equation" aria-hidden="true">f′(1) = lim<sub>h→0</sub> <span className="infinity-fraction"><span>(1 + h)² − 1</span><span>h</span></span> = 2</span>
          <span className="infinity-equation infinity-integral-equation" aria-hidden="true"><span className="infinity-riemann-formula">lim<sub>n→∞</sub> <span className="infinity-sum">∑<sup>n</sup><sub>k=1</sub></span> <span>[(k − ½)/n]² · 1/n</span></span><span className="infinity-integral-result">= ∫<sub>0</sub><sup>1</sup> x² dx = ⅓</span></span>
        </figcaption>
      </figure>
    </div>
    <div className="infinity-cover-bottom">
      <p>{text.insight}</p>
      <div className="infinity-controls">{reduced ? <span className="infinity-motion-status">{text.reduced}</span> : <button type="button" className="infinity-motion" aria-pressed={paused} onClick={() => setPaused(current => !current)}><span aria-hidden="true">{paused ? '▷' : 'Ⅱ'}</span>{paused ? text.resume : text.pause}</button>}</div>
    </div>
  </section>
}
