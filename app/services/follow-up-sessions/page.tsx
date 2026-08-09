import type { Metadata } from "next";
import SiteFooter from "../../components/SiteFooter";

export const metadata: Metadata = {
  title: "Nutrition Counseling Follow-Up Sessions | Amy Jaffe Nutrition",
  description: "Goal-centered nutrition counseling follow-up sessions with Amy Jaffe, including grocery outings, mindful meal outings, intuitive eating support, and food exposures.",
  alternates: { canonical: "/services/follow-up-sessions/" },
  openGraph: {
    title: "Nutrition Counseling Follow-Up Sessions | Amy Jaffe Nutrition",
    description: "Goal-centered nutrition counseling follow-up sessions with Amy Jaffe, including grocery outings, mindful meal outings, intuitive eating support, and food exposures.",
    url: "/services/follow-up-sessions/",
    siteName: "Amy Jaffe Nutrition",
    type: "website",
    images: [{ url: "/og.png", width: 1200, height: 630, alt: "Amy Jaffe Nutrition - A healthier relationship with food" }],
  },
};

const socialLinks = [
  { name: "Instagram", href: "https://www.instagram.com/stickynotesnutritiontherapist/", icon: "../../images/social-instagram.svg" },
  { name: "Facebook", href: "https://www.facebook.com/nutritionstickynotesAmyJaffe", icon: "../../images/social-facebook.svg" },
  { name: "LinkedIn", href: "https://www.linkedin.com/in/amysjaffe/", icon: "../../images/social-linkedin.svg" },
];

const sessionOptions = [
  {
    number: "01",
    title: "The Intuitive Eating framework",
    body: "Intuitive eating is an evidence-based model, an integration between mind and body that works by either cultivating or removing obstacles to body awareness, known as interoceptive awareness. The way people respond to this awareness can provide a powerful portal for identifying their needs at any given time or in any situation. The Intuitive Eating framework will guide our work together, helping you move from structure toward flexibility and greater freedom with food.",
  },
  {
    number: "02",
    title: "Food exposures",
    body: "Clients can bring fear or “forbidden” foods to the session, in person or virtually. Exposure means “facing your fears” and is the opposite of avoidance. When we avoid a food that we fear, the fear only gets stronger: by avoiding, we do not get to learn anything about our ability to cope.",
  },
  {
    number: "03",
    title: "Mindful meal outings",
    body: "There is a difference between discussing food, food habits, eating patterns, and related concerns and actually having support during a meal or snack. These sessions are typically held at local restaurants or cafés, or we meet there together virtually.",
  },
  {
    number: "04",
    title: "Grocery outings",
    body: "When there is a need to provide a more hands-on, direct experience in a supermarket setting, the session is held at a local grocery store, or we meet there together virtually.",
  },
];

export default function FollowUpSessionsPage() {
  return (
    <main className="assessment-page follow-up-page">
      <header className="site-header">
        <a className="brand" href="../../#home" aria-label="Amy Jaffe Nutrition home">
          <span className="brand-mark" aria-hidden="true"><i /><i /><i /><i /><i /></span>
          <span><strong>Amy Jaffe</strong><small>Nutrition</small></span>
        </a>

        <nav className="desktop-nav" aria-label="Primary navigation">
          <a href="../../#about">About</a>
          <a href="../../#services" aria-current="page">Services</a>
          <a href="../../testimonials/">Testimonials</a>
          <div className="header-social-links" aria-label="Social media">
            {socialLinks.map((social) => (
              <a href={social.href} target="_blank" rel="noreferrer" aria-label={social.name} key={social.name}><img src={social.icon} alt="" /></a>
            ))}
          </div>
        </nav>

        <a className="header-cta" href="../../#contact">Let&apos;s talk <span aria-hidden="true">↗</span></a>

        <details className="mobile-menu">
          <summary aria-label="Open navigation"><span /><span /></summary>
          <nav aria-label="Mobile navigation">
            <a href="../../#about">About</a><a href="../../#services" aria-current="page">Services</a>
            <a href="../../testimonials/">Testimonials</a>
            <a href="../../#contact">Contact</a>
            <div className="mobile-social-links" aria-label="Social media">
              {socialLinks.map((social) => (
                <a href={social.href} target="_blank" rel="noreferrer" aria-label={social.name} key={social.name}><img src={social.icon} alt="" /></a>
              ))}
            </div>
          </nav>
        </details>
      </header>

      <section className="assessment-detail-hero follow-up-detail-hero">
        <div className="assessment-detail-hero-content">
          <a className="assessment-back-link" href="../../#services"><span aria-hidden="true">←</span> Back to services</a>
          <p className="eyebrow light">30-60 minutes · individualized support</p>
          <h1>Nutrition counseling<br /><em>follow-up sessions.</em></h1>
          <p className="assessment-detail-lede">Each session builds on the goals we created together, with support shaped by your progress, successes, and challenges.</p>
        </div>
        <div className="assessment-detail-number" aria-hidden="true">02</div>
      </section>

      <section className="assessment-detail-content follow-up-detail-content">
        <div className="assessment-detail-heading">
          <p className="eyebrow">Follow-up sessions</p>
          <h2>Progress shapes<br /><em>the next step.</em></h2>
        </div>
        <div className="assessment-detail-copy">
          <p>The follow-up sessions are based on the goals determined during the initial nutrition assessment.</p>
          <p className="assessment-review-copy">The direction of each session is based on progress toward goal completion; both successes and challenges are used to promote change.</p>
          <p>The frequency of follow-up sessions is agreed upon collaboratively, regularly assessed for necessity, and ultimately decreased as progress is achieved.</p>
        </div>
      </section>

      <section className="follow-up-options-section">
        <div className="section-heading-row">
          <div>
            <p className="eyebrow">Session options</p>
            <h2>Support that meets you<br /><em>where life happens.</em></h2>
          </div>
          <p className="section-intro">Follow-up care can move beyond the office when hands-on, real-life support would be helpful.</p>
        </div>

        <div className="follow-up-options-grid">
          {sessionOptions.map((option) => (
            <article className="follow-up-option-card" key={option.title}>
              <span className="follow-up-option-number">{option.number}</span>
              <h3>{option.title}</h3>
              <p>{option.body}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="assessment-detail-cta">
        <p className="eyebrow light">Continue your progress</p>
        <h2>Let&apos;s choose the support<br /><em>that fits you.</em></h2>
        <a className="button button-cream" href="../../free-introductory-call/">Sign up for a free introductory call <span aria-hidden="true">↗</span></a>
      </section>

      <SiteFooter pathPrefix="../../" />
    </main>
  );
}
