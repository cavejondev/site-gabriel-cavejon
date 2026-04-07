import { ArrowUpRight, Github, Instagram, Mail, MapPin, Phone } from 'lucide-react'
import type { IconType } from 'react-icons'
import {
  SiGo,
  SiNestjs,
  SiNodedotjs,
  SiPhp,
  SiReact,
  SiSharp,
  SiTypescript,
} from 'react-icons/si'
import {
  startTransition,
  useDeferredValue,
  useEffect,
  useEffectEvent,
  useState,
} from 'react'

const sectionIds = ['inicio', 'stack', 'contato'] as const

type SectionId = (typeof sectionIds)[number]

type NavItem = {
  id: SectionId
  label: string
}

type Highlight = {
  label: string
  value: string
  detail: string
}

type Technology = {
  label: string
  icon: IconType
  color: string
}

const navItems: NavItem[] = [
  { id: 'inicio', label: 'Início' },
  { id: 'stack', label: 'Stack' },
  { id: 'contato', label: 'Contato' },
]

const highlights: Highlight[] = [
  {
    label: 'Cargo',
    value: 'Supervisor de Sistemas',
    detail: 'Nootech Sistemas',
  },
  {
    label: 'Experiência',
    value: '+3 anos',
    detail: 'software, ERP e operação',
  },
  {
    label: 'Conquista',
    value: '3º lugar WorldSkills 2024',
    detail: 'Web Design',
  },
  {
    label: 'Base',
    value: 'SENAI Dois Vizinhos',
    detail: 'formação técnica e prática real',
  },
]

const technologies: Technology[] = [
  { label: 'C#', icon: SiSharp, color: '#7c3aed' },
  { label: 'TypeScript', icon: SiTypescript, color: '#2563eb' },
  { label: 'Node.js', icon: SiNodedotjs, color: '#3f8f3f' },
  { label: 'NestJS', icon: SiNestjs, color: '#e11d48' },
  { label: 'Go', icon: SiGo, color: '#0891b2' },
  { label: 'React', icon: SiReact, color: '#06b6d4' },
  { label: 'React Native', icon: SiReact, color: '#38bdf8' },
  { label: 'PHP', icon: SiPhp, color: '#6366f1' },
]

const extraSkills = [
  '.NET',
  'ASP.NET Core',
  'Windows Forms',
  'JavaScript',
  'SQL',
  'HTML',
  'CSS',
  'Git',
  'ERP',
  'Food Service',
  'Varejo',
  'Liderança de pessoas',
]

const socialLinks = [
  {
    label: 'GitHub',
    href: 'https://github.com/cavejondev',
    icon: Github,
  },
  {
    label: 'Instagram',
    href: 'https://www.instagram.com/gabrielcavejon_/',
    icon: Instagram,
  },
]

const isSectionId = (value: string): value is SectionId =>
  sectionIds.some((sectionId) => sectionId === value)

function SectionHeading({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string
  title: string
  description: string
}) {
  return (
    <div className="max-w-3xl space-y-3" data-reveal>
      <p className="section-kicker">{eyebrow}</p>
      <h2 className="font-heading text-[1.9rem] leading-[0.98] tracking-[-0.05em] text-[var(--ink)] sm:text-4xl">
        {title}
      </h2>
      <p className="max-w-2xl text-base leading-7 text-[var(--muted-ink)] sm:text-lg sm:leading-8">
        {description}
      </p>
    </div>
  )
}

function PhotoPanel({
  src,
  alt,
  objectPosition,
  imageClassName = '',
}: {
  src: string
  alt: string
  objectPosition: string
  imageClassName?: string
}) {
  const [hasError, setHasError] = useState(false)

  if (hasError) {
    return (
      <div className="panel flex min-h-[18rem] items-center justify-center px-6 py-8 text-center text-sm text-[var(--muted-ink)]">
        Imagem indisponível no momento.
      </div>
    )
  }

  return (
    <div className="photo-panel panel overflow-hidden p-2">
      <img
        src={src}
        alt={alt}
        className={`w-full rounded-[28px] object-cover ${imageClassName}`}
        style={{ objectPosition }}
        onError={() => setHasError(true)}
      />
    </div>
  )
}

function App() {
  const [activeSection, setActiveSection] = useState<SectionId>('inicio')
  const deferredActiveSection = useDeferredValue(activeSection)

  const activateSection = useEffectEvent((nextSection: string) => {
    if (!isSectionId(nextSection)) {
      return
    }

    startTransition(() => {
      setActiveSection(nextSection)
    })
  })

  useEffect(() => {
    const sections = Array.from(document.querySelectorAll<HTMLElement>('[data-section]'))

    const observer = new IntersectionObserver(
      (entries) => {
        const visibleEntry = entries
          .filter((entry) => entry.isIntersecting)
          .sort((entryA, entryB) => entryB.intersectionRatio - entryA.intersectionRatio)[0]

        if (visibleEntry?.target.id) {
          activateSection(visibleEntry.target.id)
        }
      },
      {
        threshold: [0.2, 0.45, 0.7],
        rootMargin: '-16% 0px -34% 0px',
      },
    )

    sections.forEach((section) => observer.observe(section))

    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    const revealElements = Array.from(document.querySelectorAll<HTMLElement>('[data-reveal]'))
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)')

    if (reduceMotion.matches) {
      revealElements.forEach((element) => element.classList.add('is-visible'))
      return
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) {
            return
          }

          entry.target.classList.add('is-visible')
          observer.unobserve(entry.target)
        })
      },
      {
        threshold: 0.16,
        rootMargin: '0px 0px -10% 0px',
      },
    )

    revealElements.forEach((element) => observer.observe(element))

    return () => observer.disconnect()
  }, [])

  return (
    <div className="relative min-h-screen overflow-hidden">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
        <div className="halo left-[-10rem] top-[-9rem] h-[28rem] w-[28rem]" />
        <div className="halo halo-secondary right-[-9rem] top-[7rem] h-[24rem] w-[24rem]" />
        <div className="halo halo-tertiary bottom-[-10rem] left-1/2 h-[26rem] w-[26rem]" />
        <div className="grid-fade absolute inset-0" />
      </div>

      <header className="sticky top-0 z-50 px-2.5 pt-2.5 md:px-8 md:pt-5">
        <nav className="header-shell mx-auto flex max-w-7xl items-center justify-between gap-2 px-3 py-2.5 sm:gap-4 sm:px-4 sm:py-3 md:px-6">
          <a href="#inicio" className="flex min-w-0 items-center gap-2.5 sm:gap-3">
            <span className="brand-mark">GC</span>
            <span className="hidden min-w-0 text-left md:block">
              <span className="block text-sm font-semibold tracking-[0.12em] text-[var(--ink)]">
                Gabriel Cavejon
              </span>
              <span className="block text-[0.72rem] uppercase tracking-[0.28em] text-[var(--muted-ink)]">
                Full-Stack Developer
              </span>
            </span>
          </a>

          <div className="hidden items-center gap-2 rounded-full border border-white/40 bg-white/55 p-1 md:flex">
            {navItems.map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                className={`nav-pill ${
                  deferredActiveSection === item.id ? 'nav-pill-active' : ''
                }`}
              >
                {item.label}
              </a>
            ))}
          </div>

          <a href="#contato" className="primary-button header-cta">
            Falar comigo
            <ArrowUpRight size={16} />
          </a>
        </nav>
      </header>

      <main className="mx-auto flex max-w-7xl flex-col gap-8 px-2.5 pb-12 pt-4 sm:px-3 md:gap-12 md:px-8 md:pb-16 md:pt-7 lg:px-10">
        <section
          id="inicio"
          data-section
          className="grid items-center gap-5 py-2 lg:grid-cols-[1.02fr_0.98fr]"
        >
          <div className="space-y-6">
            <div className="flex flex-wrap gap-3" data-reveal>
              <span className="chip">Supervisor de Sistemas</span>
              <span className="chip">Nootech Sistemas</span>
              <span className="chip">Dois Vizinhos, Paraná</span>
            </div>

            <div className="space-y-4" data-reveal>
              <p className="section-kicker">Gabriel Rodrigo Cavejon</p>
              <h1 className="max-w-4xl text-[2.35rem] font-heading leading-[0.92] tracking-[-0.07em] text-[var(--ink)] sm:text-5xl md:text-6xl xl:text-[5.3rem]">
                Transformo necessidades do
                <span className="gradient-text"> negócio em soluções</span>
                <br className="hidden md:block" /> com tecnologia.
              </h1>
              <p className="max-w-2xl text-base leading-7 text-[var(--muted-ink)] sm:text-lg sm:leading-8">
                Trabalho na Nootech Sistemas há mais de 3 anos e hoje atuo como Supervisor de
                Sistemas. Minha atuação conecta desenvolvimento full stack, ERP para food e varejo
                e visão prática de operação.
              </p>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row" data-reveal>
              <a href="mailto:gabriel.rc.dev.2006@gmail.com" className="primary-button">
                Falar por e-mail
                <ArrowUpRight size={16} />
              </a>
              <a href="#stack" className="secondary-button">
                Ver stack
              </a>
            </div>

            <div className="grid gap-3 sm:grid-cols-2" data-reveal>
              {highlights.map((item) => (
                <article key={item.label} className="panel p-4 sm:p-5">
                  <p className="section-kicker">{item.label}</p>
                  <h2 className="mt-2 font-heading text-[1.45rem] leading-tight tracking-[-0.04em] text-[var(--ink)] sm:text-[1.65rem]">
                    {item.value}
                  </h2>
                  <p className="mt-2 text-sm leading-6 text-[var(--muted-ink)]">{item.detail}</p>
                </article>
              ))}
            </div>
          </div>

          <div className="space-y-4" data-reveal>
            <PhotoPanel
              src="/profile-main.png"
              alt="Gabriel Rodrigo Cavejon em retrato profissional"
              objectPosition="center 8%"
              imageClassName="h-[24rem] sm:h-[30rem] lg:h-[36rem]"
            />

            <article className="nootech-card p-5 sm:p-6">
              <div className="space-y-4">
                <p className="section-kicker section-kicker-dark">Hoje na Nootech</p>
                <p className="text-base leading-7 text-white/74">
                  Faço parte de um ambiente voltado para produto, software comercial e operação B2B,
                  com responsabilidade sobre sistemas, pessoas e evolução contínua.
                </p>
              </div>

              <a
                href="https://nootech.com.br/"
                target="_blank"
                rel="noreferrer"
                className="dark-link mt-6"
              >
                Conhecer a Nootech
                <ArrowUpRight size={16} />
              </a>
            </article>
          </div>
        </section>

        <section id="stack" data-section className="space-y-6 py-2">
          <SectionHeading
            eyebrow="Stack"
            title="Tecnologias organizadas de um jeito mais direto e objetivo."
            description="Minha base principal está em C#, TypeScript, Node.js, NestJS, Go, React, React Native e PHP, sempre conectando código com contexto real de negócio."
          />

          <article className="panel p-5 sm:p-6" data-reveal>
            <div className="flex flex-wrap gap-3">
              {technologies.map((tech) => (
                <div
                  key={tech.label}
                  className="inline-flex items-center gap-3 rounded-full border border-[rgba(15,94,247,0.08)] bg-white/88 px-4 py-3 text-sm font-semibold text-[var(--ink)]"
                >
                  <tech.icon size={18} style={{ color: tech.color }} />
                  <span>{tech.label}</span>
                </div>
              ))}
            </div>

            <div className="mt-6 flex flex-wrap gap-2.5">
              {extraSkills.map((skill) => (
                <span key={skill} className="chip chip-strong">
                  {skill}
                </span>
              ))}
            </div>
          </article>
        </section>

        <section id="contato" data-section className="py-2">
          <div className="grid gap-3 lg:grid-cols-[1.02fr_0.98fr]">
            <article className="panel-dark p-5 sm:p-7" data-reveal>
              <p className="section-kicker section-kicker-dark">Contato</p>
              <h2 className="mt-4 font-heading text-[2rem] leading-[0.98] tracking-[-0.05em] text-white sm:text-4xl">
                Contato direto.
              </h2>
              <p className="mt-3 max-w-xl text-sm leading-7 text-white/74 sm:text-base sm:leading-8">
                Base full stack, experiência real em software comercial e visão prática de entrega.
              </p>

              <div className="mt-5 grid gap-2.5 sm:mt-7 sm:gap-3">
                <a href="mailto:gabriel.rc.dev.2006@gmail.com" className="contact-card">
                  <div className="icon-chip icon-chip-dark">
                    <Mail size={18} />
                  </div>
                  <div>
                    <p className="section-kicker section-kicker-dark">E-mail</p>
                    <p className="mt-2 text-base font-medium text-white">
                      gabriel.rc.dev.2006@gmail.com
                    </p>
                  </div>
                </a>

                <a href="tel:+5546999142748" className="contact-card">
                  <div className="icon-chip icon-chip-dark">
                    <Phone size={18} />
                  </div>
                  <div>
                    <p className="section-kicker section-kicker-dark">Telefone</p>
                    <p className="mt-2 text-base font-medium text-white">(46) 99914-2748</p>
                  </div>
                </a>

                <div className="contact-card">
                  <div className="icon-chip icon-chip-dark">
                    <MapPin size={18} />
                  </div>
                  <div>
                    <p className="section-kicker section-kicker-dark">Base</p>
                    <p className="mt-2 text-base font-medium text-white">
                      Dois Vizinhos, Paraná, Brasil
                    </p>
                  </div>
                </div>
              </div>
            </article>

            <article className="panel p-5 sm:p-7" data-reveal>
              <p className="section-kicker">Links</p>

              <div className="mt-4 space-y-2.5 sm:mt-5 sm:space-y-3">
                {socialLinks.map((item) => (
                  <a
                    key={item.label}
                    href={item.href}
                    target="_blank"
                    rel="noreferrer"
                    className="link-card"
                  >
                    <div className="flex min-w-0 items-center gap-3 sm:gap-4">
                      <div className="icon-chip">
                        <item.icon size={18} />
                      </div>
                      <div className="min-w-0">
                        <p className="section-kicker">{item.label}</p>
                        <p className="mt-2 break-all text-sm font-medium text-[var(--ink)] sm:text-base">
                          {item.href}
                        </p>
                      </div>
                    </div>
                    <ArrowUpRight size={18} className="text-[var(--muted-ink)]" />
                  </a>
                ))}
              </div>

              <div className="mt-4 overflow-hidden rounded-[24px] border border-[rgba(15,94,247,0.08)] bg-white/82 p-2 sm:mt-5">
                <img
                  src="/profile-worldskills.png"
                  alt="Gabriel Cavejon na WorldSkills Paraná"
                  className="h-[26rem] w-full rounded-[18px] object-cover sm:h-[30rem]"
                  style={{ objectPosition: 'center center' }}
                />
                <div className="px-2 pb-2 pt-4">
                  <p className="section-kicker">WorldSkills Paraná</p>
                  <p className="mt-2 text-sm leading-6 text-[var(--muted-ink)] sm:text-base sm:leading-7">
                    Medalhista com 3º lugar em Web Design na edição de 2024, resultado que reforça
                    minha base prática, disciplina e foco em entrega.
                  </p>
                </div>
              </div>
            </article>
          </div>
        </section>

        <footer className="flex flex-col gap-3 border-t border-[rgba(15,94,247,0.12)] py-6 text-sm text-[var(--muted-ink)] md:flex-row md:items-center md:justify-between">
          <p>Gabriel Rodrigo Cavejon • Full-Stack Developer</p>
          <p className="font-mono text-xs uppercase tracking-[0.24em]">
            Nootech • SENAI • Dois Vizinhos
          </p>
        </footer>
      </main>
    </div>
  )
}

export default App
