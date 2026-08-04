const socialLinks = [
  { name: "Instagram", href: "https://www.instagram.com/stickynotesnutritiontherapist/", icon: "images/social-instagram.svg" },
  { name: "Facebook", href: "https://www.facebook.com/nutritionstickynotesAmyJaffe", icon: "images/social-facebook.svg" },
  { name: "LinkedIn", href: "https://www.linkedin.com/in/amysjaffe/", icon: "images/social-linkedin.svg" },
];

const services = [
  {
    number: "01",
    title: "Nutrition assessment",
    meta: "90 minutes",
    body: <p>A thoughtful look at your health, eating patterns, and goals - followed by a practical plan created together.</p>,
    href: "services/nutrition-assessment/",
    ariaLabel: "Learn more about the nutrition assessment",
  },
  {
    number: "02",
    title: "Nutrition counseling follow-up sessions",
    meta: "Ongoing support",
    body: <p>Goal-centered sessions that build on your assessment, celebrate progress, and use challenges to support meaningful change.</p>,
    href: "services/follow-up-sessions/",
    ariaLabel: "Learn more about nutrition counseling follow-up sessions",
  },
  {
    number: "03",
    title: "Telehealth sessions",
    meta: "Wherever you are",
    body: <p>Private video appointments for clients in Florida and beyond, with the same warm, collaborative care.</p>,
    href: null,
    ariaLabel: "Ask about telehealth sessions",
  },
];

const resources = [
  ["Intuitive eating", "Reconnect with hunger, fullness, satisfaction, and the wisdom already within your body."],
  ["Body image", "Move away from comparison and toward a more peaceful, respectful relationship with yourself."],
  ["Eating support", "Compassionate nutrition care for disordered eating, chronic dieting, and food anxiety."],
];

const expertiseAreas = [
  "Bariatric Surgery",
  "Body Image",
  "Eating Disorders, Disordered Eating",
  "GI Issues",
  "GLP-1 Nutrition Support",
  "Heart Disease",
  "Intuitive Eating",
  "Menopause",
  "Metabolic Syndrome",
  "Overeating/Emotional Eating",
  "PMOS (PCOS)",
  "Pregnancy",
  "Type 2 Diabetes",
  "Weight Cycling",
];

export default function Home() {
  return (
    <main>
      <header className="site-header">
        <a className="brand" href="#home" aria-label="Amy Jaffe Nutrition home">
          <span className="brand-mark" aria-hidden="true"><i /><i /><i /><i /><i /></span>
          <span>
            <strong>Amy Jaffe</strong>
            <small>Nutrition</small>
          </span>
        </a>

        <nav className="desktop-nav" aria-label="Primary navigation">
          <a href="#about">About</a>
          <a href="#services">Services</a>
          <a href="testimonials/">Testimonials</a>
          <a href="#resources">Resources</a>
          <div className="header-social-links" aria-label="Social media">
            {socialLinks.map((social) => (
              <a href={social.href} target="_blank" rel="noreferrer" aria-label={social.name} key={social.name}>
                <img src={social.icon} alt="" />
              </a>
            ))}
          </div>
        </nav>

        <a className="header-cta" href="#contact">Let&apos;s talk <span aria-hidden="true">↗</span></a>

        <details className="mobile-menu">
          <summary aria-label="Open navigation"><span /><span /></summary>
          <nav aria-label="Mobile navigation">
            <a href="#about">About</a><a href="#services">Services</a>
            <a href="testimonials/">Testimonials</a><a href="#resources">Resources</a>
            <a href="#contact">Contact</a>
            <div className="mobile-social-links" aria-label="Social media">
              {socialLinks.map((social) => (
                <a href={social.href} target="_blank" rel="noreferrer" aria-label={social.name} key={social.name}>
                  <img src={social.icon} alt="" />
                </a>
              ))}
            </div>
          </nav>
        </details>
      </header>

      <section className="hero" id="home">
        <video className="hero-video" autoPlay muted loop playsInline preload="metadata" poster="images/purple-flowers-breeze-poster.jpg" aria-hidden="true">
          <source src="video/purple-flowers-breeze-slow.mp4" type="video/mp4" />
        </video>
        <div className="hero-wash" />
        <div className="hero-content">
          <p className="eyebrow light">Nutrition counseling · South Florida &amp; telehealth</p>
          <h1>Food can feel<br /><em>good again.</em></h1>
          <p className="hero-lede">Find freedom from eating disorders, diets, food rules, and body struggles - delivered with care and compassion, curiosity, not judgment.</p>
          <div className="hero-actions">
            <a className="button button-cream" href="#contact">Request an appointment <span>↗</span></a>
            <a className="text-link light" href="#about">Meet Amy <span>↓</span></a>
          </div>
        </div>

        <div className="hero-note" aria-label="Practice details">
          <span className="note-dot" />
          <p><strong>Currently accepting new clients</strong><br />In-person in South Florida and via secure telehealth</p>
        </div>

      </section>

      <section className="belief-strip" aria-label="Amy's approach">
        <p>Eating disorder recovery.</p><span>✦</span><p>GLP-1 support.</p><span>✦</span><p>Less food fear.</p><span>✦</span><p>More body trust.</p>
      </section>

      <section className="about section" id="about">
        <div className="about-image-wrap">
          <div className="about-video-frame">
            <video controls playsInline preload="metadata" poster="images/amy-video-poster.jpg" aria-label="Meet Amy Jaffe">
              <source src="video/nutritioncounselingflorida.mp4?v=20260731-6" type="video/mp4" />
            </video>
          </div>
          <div className="experience-badge"><strong>20+</strong><span>years of<br />experience</span></div>
        </div>

        <div className="about-copy">
          <h2 className="about-title"><span>Meet Amy Jaffe,</span><em>MS, RD, LD</em></h2>
          <p className="about-subheadline">Providing care that considers your <em>whole person.</em></p>
          <p className="large-copy">I&apos;m a nationally registered, state-licensed dietitian/nutritionist and Certified Intuitive Eating Specialist.</p>
          <p className="approach-copy">My approach is highly individualized and comprehensive. We work collaboratively - never from a place of judgment or rigid rules - to help you develop a healthier relationship with food and your body.</p>
          <div className="credentials">
            <span>Nationally Registered and Licensed Nutritionist/Dietitian</span><span>Certified Intuitive Eating Specialist</span>
          </div>
          <a className="text-link" href="#services">Explore how we can work together <span>→</span></a>
        </div>

        <div className="about-awards" aria-labelledby="recognition-title">
          <div className="about-awards-heading">
            <p className="eyebrow">Recognition</p>
            <h3 id="recognition-title">Honored for care in our community.</h3>
          </div>
          <div className="award-grid">
            <figure className="award-card">
              <div className="award-image">
                <img src="images/award-businessrate-2026.webp" alt="BusinessRate Best of 2026 Award Winner for Best Nutritionist in North Miami" />
              </div>
              <figcaption><strong>Best Nutritionist in North Miami</strong><span>BusinessRate · 2026</span></figcaption>
            </figure>
            <figure className="award-card">
              <div className="award-image">
                <img src="images/award-businessrate-2025.webp" alt="BusinessRate Best of 2025 Nutritionist recognition for Amy Jaffe Nutrition" />
              </div>
              <figcaption><strong>Best of BusinessRate</strong><span>North Miami · 2025</span></figcaption>
            </figure>
            <figure className="award-card">
              <div className="award-image">
                <img src="images/award-marquis-whos-who-2025.webp" alt="Marquis Who's Who Honored Listee 2025 badge" />
              </div>
              <figcaption><strong>Honored Listee</strong><span>Marquis Who&apos;s Who · 2025</span></figcaption>
            </figure>
            <figure className="award-card">
              <div className="award-image">
                <img src="images/award-quality-business-2024.avif" alt="Quality Business Awards 2024 Winner badge with a quality rating over 95 percent" />
              </div>
              <figcaption><strong>Quality Business Award</strong><span>Winner · 2024</span></figcaption>
            </figure>
          </div>
        </div>
      </section>

      <section className="quote-section">
        <p className="quote-mark" aria-hidden="true">“</p>
        <blockquote>It&apos;s not only about calories, cholesterol, and other numbers. It&apos;s about your relationship with food. It&apos;s about challenging your beliefs and ending the struggle… so you can build a life of balance, confidence, and peace.</blockquote>
        <p className="quote-caption">- Amy Jaffe</p>
      </section>

      <section className="expertise section" id="expertise">
        <div className="expertise-intro">
          <p className="eyebrow">Specialized support</p>
          <h2>Areas of<br /><em>expertise.</em></h2>
          <p className="expertise-age"><span aria-hidden="true" />Ages 13 and up</p>
        </div>
        <ul className="expertise-list">
          {expertiseAreas.map((area) => (
            <li className="expertise-item" key={area}>
              <span className="expertise-icon" aria-hidden="true">✦</span>
              <strong>{area}</strong>
            </li>
          ))}
        </ul>
      </section>

      <section className="services section" id="services">
        <div className="section-heading-row">
          <div><p className="eyebrow">Ways to work together</p><h2>Nutrition support that meets<br /><em>you where you are.</em></h2></div>
          <p className="section-intro">There is no one-size-fits-all path to feeling at home in your body. We&apos;ll start with your story and build from there.</p>
        </div>
        <div className="service-list">
          {services.map((service) => service.href ? (
            <a className="service-card service-card-detail" href={service.href} aria-label={service.ariaLabel} key={service.number}>
              <span className="service-number">{service.number}</span>
              <div><p className="service-meta">{service.meta}</p><h3>{service.title}</h3><div className="service-body">{service.body}</div></div>
              <span className="service-card-arrow" aria-hidden="true">↗</span>
            </a>
          ) : (
            <article className="service-card" key={service.number}>
              <span className="service-number">{service.number}</span>
              <div><p className="service-meta">{service.meta}</p><h3>{service.title}</h3><div className="service-body">{service.body}</div></div>
              <a href="#contact" aria-label={`Ask about ${service.title}`}>↗</a>
            </article>
          ))}
        </div>
      </section>

      <section className="testimonial section" id="testimonials">
        <div className="testimonial-video-wrap">
          <video controls playsInline preload="metadata" poster="images/client-testimonial-poster.jpg" aria-label="Client testimonial">
            <source src="video/client-testimonial.mp4?v=20260731" type="video/mp4" />
          </video>
        </div>
        <div className="testimonial-copy">
          <p className="eyebrow light">Client story</p>
          <div className="stars" aria-label="Five stars">★★★★★</div>
          <blockquote>“Amy helped me navigate my relationship with food, transforming it into a source of joy rather than anxiety. With her guidance, I&apos;ve learned to appreciate the rainbow of possibilities that healthy eating brings into our lives.”</blockquote>
          <p className="testimonial-name">Former client · Miami</p>
          <div className="testimonial-links">
            <a className="text-link light" href="testimonials/">See more testimonials <span>→</span></a>
            <a className="text-link light" href="#contact">Begin your own story <span>→</span></a>
          </div>
        </div>
      </section>

      <section className="resources section" id="resources">
        <div className="resource-title"><p className="eyebrow">A gentler way forward</p><h2>Start with<br /><em>understanding.</em></h2></div>
        <div className="resource-list">
          {resources.map(([title, body], index) => (
            <article key={title}>
              <span>0{index + 1}</span><div><h3>{title}</h3><p>{body}</p></div>
            </article>
          ))}
        </div>
      </section>

      <section className="insurance section">
        <p className="eyebrow">Insurance</p>
        <div>
          <h2>Simple, transparent care.</h2>
          <p>Our office is out of network for most insurance companies. We can provide monthly superbills for you to submit, and any reimbursement goes directly to you or toward your deductible.</p>
        </div>
      </section>

      <section className="intro-call-cta" aria-labelledby="intro-call-cta-title">
        <div>
          <p className="eyebrow">A simple first step</p>
          <h2 id="intro-call-cta-title">Start with a free<br /><em>introductory call.</em></h2>
        </div>
        <div>
          <p>We&apos;ll make space for your questions and see whether working together feels like the right fit.</p>
          <a className="button button-plum" href="free-introductory-call/">Sign up for a free introductory call <span aria-hidden="true">↗</span></a>
        </div>
      </section>

      <section className="contact" id="contact">
        <div className="contact-intro">
          <p className="eyebrow light">Take the first step</p>
          <h2>Let&apos;s make peace<br /><em>with food.</em></h2>
          <p>Have a general question about working together? Send a note and Amy will be in touch.</p>
          <div className="contact-details">
            <a href="tel:3055866053">305-586-6053</a>
            <a href="mailto:amysjaffe@gmail.com">amysjaffe@gmail.com</a>
            <p>1801 NE 123rd Street, Suite 303<br />Miami, FL 33181</p>
          </div>
        </div>
        <form className="contact-form" action="https://formsubmit.co/amysjaffe@gmail.com" method="post">
          <input type="hidden" name="_subject" value="Website inquiry - General homepage form" />
          <input type="hidden" name="Form type" value="General homepage inquiry" />
          <input type="hidden" name="_template" value="table" />
          <input type="hidden" name="_url" value="https://jessejaffe.github.io/AmyJaffeNutrition/" />
          <div className="form-honeypot" aria-hidden="true"><label>Leave this field empty<input type="text" name="_honey" tabIndex={-1} autoComplete="off" /></label></div>
          <label>First name<input type="text" name="First name" autoComplete="given-name" required /></label>
          <label>Last name<input type="text" name="Last name" autoComplete="family-name" required /></label>
          <label className="full">Email<input type="email" name="email" autoComplete="email" required /></label>
          <label className="full">What would you like support with?<textarea name="Support request" rows={3} placeholder="Please keep this message general and do not include private medical details." required /></label>
          <button type="submit">Send general inquiry <span>↗</span></button>
          <small>Please do not include private medical details in this form.</small>
        </form>
      </section>

      <footer>
        <div className="footer-grid">
          <a className="footer-brand" href="#home"><img src="images/amy-jaffe-logo.avif" alt="Amy Jaffe Nutrition" /></a>

          <section className="footer-location" aria-labelledby="footer-location-title">
            <h2 id="footer-location-title">Location</h2>
            <div className="footer-map">
              <iframe
                src="https://www.google.com/maps?q=1801%20NE%20123rd%20Street%2C%20Suite%20303%2C%20Miami%2C%20FL%2033181&amp;output=embed"
                title="Map of Amy Jaffe Nutrition in Miami"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                allowFullScreen
              />
            </div>
            <a
              className="footer-address"
              href="https://www.google.com/maps/dir/?api=1&amp;destination=1801%20NE%20123rd%20Street%2C%20Suite%20303%2C%20Miami%2C%20FL%2033181"
              target="_blank"
              rel="noreferrer"
              aria-label="Get directions to Amy Jaffe Nutrition"
            >
              <address>1801 NE 123rd Street, Suite 303<br />Miami, FL 33181</address>
              <span aria-hidden="true">↗</span>
            </a>
          </section>

          <div className="footer-summary">
            <p>Serving Miami and telehealth clients with compassionate, non-diet nutrition care.</p>
            <div className="social-links" aria-label="Social media">
              {socialLinks.map((social) => (
                <a href={social.href} target="_blank" rel="noreferrer" aria-label={social.name} key={social.name}>
                  <img src={social.icon} alt="" />
                </a>
              ))}
            </div>
          </div>
        </div>
        <small className="footer-copyright">© {new Date().getFullYear()} Amy Jaffe Nutrition</small>
      </footer>
    </main>
  );
}
