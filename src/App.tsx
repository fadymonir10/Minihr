import { useEffect, useRef, useState } from "react"

const A = "/assets"

const featureSets = {
  Me: [
    ["1ec41.svg", "My Profile", "Personal and job details in one place."],
    ["761c8.svg", "Leave & Attendance", "Balances, requests and their status."],
    ["cfa11.svg", "Payslips", "Every payslip when you need it."],
    ["88079.svg", "Benefits & Compensation", "See what your package includes."],
  ],
  Career: [
    [
      "3505b.svg",
      "Goals & Reviews",
      "Keep progress, feedback and goals together.",
    ],
    ["4d44c.svg", "Learning", "Build skills with a clear development path."],
    ["7c325.svg", "Career Path", "See opportunities and plan what comes next."],
    ["b8144.svg", "Feedback", "Share timely feedback with your team."],
  ],
  Company: [
    ["66530.svg", "Directory", "Find the right person across the company."],
    ["028bf.svg", "Announcements", "Keep everyone informed and aligned."],
    ["44b30.svg", "Documents", "Policies and files in one easy place."],
    [
      "a4bbe.svg",
      "Organization",
      "Understand teams, roles and reporting lines.",
    ],
  ],
}

const planFeatures = {
  small: [
    "Simple flat price per employee",
    "Pay only for the team you have",
    "Add employees any time",
  ],
  popular: [
    "Discount applied to every employee",
    "Same simple per-employee pricing",
    "Add employees any time",
  ],
  custom: [
    "Pricing designed for your size",
    "Custom setup and onboarding",
    "Dedicated point of contact",
  ],
}

function useReveal<T extends HTMLElement>() {
  const ref = useRef<T>(null)
  useEffect(() => {
    const element = ref.current
    if (!element) return
    const observer = new IntersectionObserver(
      ([entry]) => entry.isIntersecting && element.classList.add("is-visible"),
      { threshold: 0.12 },
    )
    observer.observe(element)
    return () => observer.disconnect()
  }, [])
  return ref
}

function Logo({ light = false }: { light?: boolean }) {
  return (
    <a
      className={`logo ${light ? "logo--light" : ""}`}
      href="#top"
      aria-label="PeopleSync home"
    >
      <img src={`${A}/${light ? "2f51f.svg" : "13737.svg"}`} alt="" />
      <span>PeopleSync</span>
    </a>
  )
}

function Nav() {
  const [open, setOpen] = useState(false)
  return (
    <nav className="nav" aria-label="Primary navigation">
      <Logo />
      <button
        className="menu-button"
        onClick={() => setOpen(!open)}
        aria-expanded={open}
        aria-label="Toggle menu"
      >
        <span />
        <span />
      </button>
      <div className={`nav__links ${open ? "is-open" : ""}`}>
        <a href="#modules" onClick={() => setOpen(false)}>
          Modules
        </a>
        <a href="#price" onClick={() => setOpen(false)}>
          Price
        </a>
        <a href="#contact" onClick={() => setOpen(false)}>
          Contact
        </a>
      </div>
      <div className="nav__actions">
        <a className="button button--primary" href="#contact">
          Request a demo
        </a>
        <button className="language" type="button" aria-label="Switch language">
          <img src={`${A}/66530.svg`} alt="" />
          العربية
        </button>
      </div>
    </nav>
  )
}

function Segmented({
  options,
  value,
  onChange,
  dark = false,
}: {
  options: string[]
  value: string
  onChange: (value: string) => void
  dark?: boolean
}) {
  return (
    <div
      className={`segmented ${dark ? "segmented--dark" : ""}`}
      role="tablist"
    >
      {options.map((option) => (
        <button
          key={option}
          type="button"
          role="tab"
          aria-selected={value === option}
          className={value === option ? "is-active" : ""}
          onClick={() => onChange(option)}
        >
          {option}
        </button>
      ))}
    </div>
  )
}

function Dashboard() {
  const [view, setView] = useState("Employee view")
  return (
    <div className="dashboard reveal reveal--late">
      <Segmented
        options={["Employee view", "Manager view"]}
        value={view}
        onChange={setView}
        dark
      />
      <div className="browser">
        <div className="browser__bar">
          <span />
          <span />
          <span />
        </div>
        <div className="browser__content">
          <img
            src={`${A}/e3ed0.png`}
            alt={`${view} dashboard showing attendance and employee information`}
          />
        </div>
      </div>
    </div>
  )
}

function Hero() {
  return (
    <header className="hero" id="top">
      <div className="hero__glow" aria-hidden="true" />
      <div className="reveal is-visible">
        <h1>
          Every HR task,{" "}
          <span>
            one calm
            <br />
            place.
          </span>
        </h1>
        <p>
          Leave, payslips, benefits and approvals for employees and
          <br className="desktop-only" /> managers, without emails and
          spreadsheets.
        </p>
        <div className="hero__actions">
          <a className="button button--primary button--large" href="#contact">
            Request a demo
          </a>
          <a className="button button--outline button--large" href="#modules">
            See the modules
          </a>
        </div>
      </div>
      <Dashboard />
    </header>
  )
}

function Features() {
  const ref = useReveal<HTMLElement>()
  const [active, setActive] = useState<keyof typeof featureSets>("Me")
  return (
    <section className="section reveal" id="modules" ref={ref}>
      <div className="section-heading">
        <h2>
          Everything your people need,
          <br /> grouped simply.
        </h2>
        <p>Pick an area to see what is inside.</p>
      </div>
      <Segmented
        options={Object.keys(featureSets)}
        value={active}
        onChange={(v) => setActive(v as keyof typeof featureSets)}
        dark
      />
      <div className="feature-grid">
        {featureSets[active].map(([icon, title, description]) => (
          <article className="feature-card" key={title}>
            <img src={`${A}/${icon}`} alt="" />
            <h3>{title}</h3>
            <p>{description}</p>
          </article>
        ))}
      </div>
    </section>
  )
}

function CheckList({
  items,
  inverted = false,
}: {
  items: string[]
  inverted?: boolean
}) {
  return (
    <ul className="check-list">
      {items.map((item) => (
        <li key={item}>
          <img src={`${A}/${inverted ? "b1100.svg" : "7af9b.svg"}`} alt="" />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  )
}

function Plans() {
  const ref = useReveal<HTMLElement>()
  const [billing, setBilling] = useState("Monthly")
  const yearly = billing === "Yearly"
  return (
    <section className="section plans reveal" id="price" ref={ref}>
      <div className="section-heading">
        <h2>
          Pay per employee. The bigger
          <br className="desktop-only" /> the team, the better the rate.
        </h2>
        <p>
          One simple price per employee, with a discount as your team grows and
          a tailored plan for larger companies.
        </p>
      </div>
      <Segmented
        options={["Monthly", "Yearly"]}
        value={billing}
        onChange={setBilling}
      />
      <div className="plan-grid">
        <article className="plan-card">
          <div>
            <h3>1 to 12 employees</h3>
            <p>For small teams getting started.</p>
          </div>
          <div className="price">EGP {yearly ? "630" : "700"}</div>
          <span className="per">Per employee / month</span>
          <CheckList items={planFeatures.small} />
          <a className="button button--outline" href="#contact">
            Get Started
          </a>
        </article>
        <article className="plan-card plan-card--popular">
          <div>
            <span className="popular-label">Most Popular</span>
            <h3>13 to 24 employees</h3>
            <p>For growing teams, at a lower rate.</p>
          </div>
          <div className="price">EGP {yearly ? "900" : "1000"}</div>
          <span className="per">Per employee / month</span>
          <CheckList items={planFeatures.popular} inverted />
          <a className="button button--white" href="#contact">
            Get Started
          </a>
        </article>
        <article className="plan-card">
          <div>
            <h3>25+ employees</h3>
            <p>A plan built around your company.</p>
          </div>
          <div className="price">Customized</div>
          <span className="per">Built for your organization</span>
          <CheckList items={planFeatures.custom} />
          <a className="button button--outline" href="#contact">
            Talk to us
          </a>
        </article>
      </div>
      <p className="pricing-note">
        Prices in Egyptian pounds. The discounted rate for 13 to 24 employees is
        a placeholder until confirmed.
      </p>
    </section>
  )
}

function PhoneShowcase() {
  const ref = useReveal<HTMLElement>()
  return (
    <section className="phone-section reveal" ref={ref}>
      <div className="phone-heading">
        <h2>
          <span>PeopleSync</span> for your phone
        </h2>
        <p>Available for iPhone and Android</p>
      </div>
      <div className="phone-stage">
        <div className="phone-glow" />
        <img
          className="phone phone--left"
          src={`${A}/5a33e.png`}
          alt="PeopleSync leave screen on iPhone"
        />
        <img
          className="phone phone--center"
          src={`${A}/84d22.png`}
          alt="PeopleSync dashboard on iPhone"
        />
        <img
          className="phone phone--right"
          src={`${A}/1aa01.png`}
          alt="PeopleSync payslip screen on iPhone"
        />
        <div className="phone-callout phone-callout--leave">
          <img src={`${A}/2bc5f.svg`} alt="" />
          <span>
            <strong>Leaves & Attendance</strong>Request and track in seconds
          </span>
        </div>
        <div className="phone-callout phone-callout--pay">
          <img src={`${A}/357f5.svg`} alt="" />
          <span>
            <strong>Payslips on demand</strong>Always available, always current
          </span>
        </div>
        <div className="phone-callout phone-callout--benefit">
          <img src={`${A}/c0e61.svg`} alt="" />
          <span>
            <strong>Benefits in one place</strong>See your package anywhere
          </span>
        </div>
      </div>
      <div className="download-card">
        <div>
          <h3>Get the app now</h3>
          <p>
            Visit the App Store, Google Play, or scan with your phone to
            download instantly.
          </p>
        </div>
        <div className="store-buttons">
          <a href="#contact" aria-label="Download on the App Store">
            <img src={`${A}/1eb16.png`} alt="Download on the App Store" />
          </a>
          <a href="#contact" aria-label="Get it on Google Play">
            <img src={`${A}/7c203.png`} alt="Get it on Google Play" />
          </a>
        </div>
      </div>
    </section>
  )
}

function Footer() {
  const ref = useReveal<HTMLElement>()
  return (
    <footer className="footer reveal" id="contact" ref={ref}>
      <div className="footer__card">
        <img className="footer__flare" src={`${A}/d5538.svg`} alt="" />
        <div className="footer__content">
          <Logo light />
          <h2>Let's set up your demo.</h2>
          <p>
            Tell us about your team and we will walk you through the modules
            that matter most to you.
          </p>
          <div className="contact-line">
            <span>Email</span>
            <a href="mailto:fndevcs@info.com">fndevcs@info.com</a>
          </div>
          <div className="contact-line">
            <span>Customer Service</span>
            <a href="tel:0123456678">0123456678</a>
          </div>
        </div>
      </div>
      <div className="footer__bottom">
        <span>PeopleSync 2026</span>
        <div>
          <a href="#top">Privacy</a>
          <a href="#top">Terms</a>
          <a href="#contact">Contact</a>
        </div>
      </div>
    </footer>
  )
}

export default function App() {
  return (
    <div className="page">
      <div className="container">
        <Nav />
        <main>
          <Hero />
          <Features />
          <Plans />
          <PhoneShowcase />
        </main>
        <Footer />
      </div>
    </div>
  )
}
