import type { Metadata } from "next";
import SiteFooter from "../components/SiteFooter";

export const metadata: Metadata = {
  title: "Client Testimonials | Amy Jaffe Nutrition",
  description: "Client stories, Google reviews, and Amy's responses about compassionate, non-diet nutrition care and eating disorder recovery.",
};

const socialLinks = [
  { name: "Instagram", href: "https://www.instagram.com/stickynotesnutritiontherapist/", icon: "../images/social-instagram.svg" },
  { name: "Facebook", href: "https://www.facebook.com/nutritionstickynotesAmyJaffe", icon: "../images/social-facebook.svg" },
  { name: "LinkedIn", href: "https://www.linkedin.com/in/amysjaffe/", icon: "../images/social-linkedin.svg" },
];

type VisualTestimonial = {
  name: string;
  note: string;
  noteAlt: string;
  portrait?: string;
  portraitAlt?: string;
};

type ClientHighlight = {
  name: string;
  highlight: string;
};

type GoogleReview = {
  name: string;
  review: string;
  reply: string;
};

const googleReviewsUrl = "https://www.google.com/search?q=Amy+Jaffe+Nutrition+Inc.+reviews#lrd=0x88d9b798d570deaf:0xdb7f0e34ff8acdc,1,,,,";

const googleReviews: GoogleReview[] = [
  {
    name: "Cata Cata",
    review: "Amy is extremely knowledgeable, kind and compassionate. She’s been extremely helpful to me in my journey to a better relationship with food. She’s encouraged me and I’ve let learned a lot with her. I highly recommend her services.",
    reply: "Thank you so much for your kind and generous review. This means a lot to me🙏🏻! Thanks again",
  },
  {
    name: "Ana Dutton-Franco",
    review: "Amy was such a light and joy to work with! She helped me understand nutrition and what my body was undergoing. She is very kind and professional. I highly recommend her!!!",
    reply: "Ana, it was you who were such a light and joy to work with! I appreciate your kind and generous words…all the best as you continue your journeys ✳️",
  },
  {
    name: "Lori Werner",
    review: "Amy was a great listener and showed my daughter empathy, compassion and a safe space to talk when she was struggling with disordered eating. She was also available to talk if I had any questions or concerns. Thank you, Amy!",
    reply: "You are so welcome! Thank you for your kind words...You know how much I enjoyed working with your lovely daughter. I wish the best for both of you! Amy",
  },
  {
    name: "Madeleine Trueba",
    review: "Amy is amazing! She is very knowledgeable and welcoming. She has helped me for over a year now. I highly recommend seeing her if you need any guidance on nutrition and support in recovery!",
    reply: "Mado, thank you so much for your kind and generous review! You continue to make so much progress and are a joy to work with. It’s an honor to be a witness to your journey ❗️",
  },
  {
    name: "Coco Hull",
    review: "Amy helped me get my life back. I’m not sure where I’d be without her. She changed my life — I’m about a year post seeing her regularly, and I use the tools and mindset she gave me everyday. Thank you, Amy.",
    reply: "Coco! it is gratifying to know that you remembered me and our work together after this much time has gone by. I'm thrilled to hear how well you are doing and know you have been, and will continue to be successful in whatever you endeavor you to accomplish. All my best and a big virtual hug, Amy",
  },
];

const visualTestimonials: VisualTestimonial[] = [
  {
    name: "Abbey Griffith",
    note: "testimonial-note-01.jpg",
    noteAlt: "Handwritten note from Abbey thanking Amy for transforming her relationship with food and her body",
    portrait: "testimonial-note-02.jpeg",
    portraitAlt: "Abbey Griffith",
  },
  {
    name: "Michelle",
    note: "testimonial-note-03.jpeg",
    noteAlt: "Handwritten note from Michelle thanking Amy for her eating disorder recovery support",
    portrait: "testimonial-note-04.jpeg",
    portraitAlt: "Michelle wearing a Stay Hopeful shirt",
  },
  {
    name: "Cristi",
    note: "testimonial-note-05.jpg",
    noteAlt: "Handwritten note from Cristi thanking Amy for years of guidance and encouragement",
  },
  {
    name: "Rachel",
    note: "testimonial-note-06.jpeg",
    noteAlt: "Message from Rachel thanking Amy for helping her enjoy food and life again",
  },
  {
    name: "Karen",
    note: "testimonial-note-07.jpeg",
    noteAlt: "Handwritten note from Karen about overcoming an eating disorder and building a healthy relationship with food",
  },
  {
    name: "Maria",
    note: "testimonial-note-09.png",
    noteAlt: "Handwritten note from Maria calling Amy a trusted nutritionist and friend",
    portrait: "testimonial-note-08.jpg",
    portraitAlt: "Maria wearing a black blouse with pink stripes",
  },
  {
    name: "Morgan Herrick",
    note: "testimonial-note-10.jpeg",
    noteAlt: "Note from Morgan Herrick thanking Amy for helping her find food freedom",
  },
];

const clientTestimonials: ClientHighlight[] = [
  {
    name: "Kim R.",
    highlight: "Kind, compassionate & nonjudgmental.",
  },
  {
    name: "Vicky",
    highlight: "Always reminding me to be kind to myself.",
  },
  {
    name: "Mark E.",
    highlight: "Help, support & laughing at my bad jokes.",
  },
  {
    name: "Becky",
    highlight: "You always gave me grace.",
  },
  {
    name: "Lauren",
    highlight: "You inspired me to find food freedom.",
  },
  {
    name: "Katie F.",
    highlight: "I can trust myself with any and every food.",
  },
  {
    name: "Allison P.",
    highlight: "Professional, understanding & always listening.",
  },
  {
    name: "Janet M.",
    highlight: "She helps me find the CAN in any situation.",
  },
  {
    name: "Josh H.",
    highlight: "Intuitive eating changed my life.",
  },
  {
    name: "Jackie H.",
    highlight: "Strong, healthy & eternally grateful.",
  },
  {
    name: "Melissa L.",
    highlight: "Continued support & wisdom.",
  },
];

export default function TestimonialsPage() {
  return (
    <main className="testimonials-page">
      <header className="site-header">
        <a className="brand" href="../#home" aria-label="Amy Jaffe Nutrition home">
          <span className="brand-mark" aria-hidden="true"><i /><i /><i /><i /><i /></span>
          <span><strong>Amy Jaffe</strong><small>Nutrition</small></span>
        </a>

        <nav className="desktop-nav" aria-label="Primary navigation">
          <a href="../#about">About</a>
          <a href="../#services">Services</a>
          <a href="./" aria-current="page">Testimonials</a>
          <div className="header-social-links" aria-label="Social media">
            {socialLinks.map((social) => (
              <a href={social.href} target="_blank" rel="noreferrer" aria-label={social.name} key={social.name}><img src={social.icon} alt="" /></a>
            ))}
          </div>
        </nav>

        <a className="header-cta" href="../#contact">Let&apos;s talk <span aria-hidden="true">↗</span></a>

        <details className="mobile-menu">
          <summary aria-label="Open navigation"><span /><span /></summary>
          <nav aria-label="Mobile navigation">
            <a href="../#about">About</a><a href="../#services">Services</a>
            <a href="./" aria-current="page">Testimonials</a>
            <a href="../#contact">Contact</a>
            <div className="mobile-social-links" aria-label="Social media">
              {socialLinks.map((social) => (
                <a href={social.href} target="_blank" rel="noreferrer" aria-label={social.name} key={social.name}><img src={social.icon} alt="" /></a>
              ))}
            </div>
          </nav>
        </details>
      </header>

      <section className="testimonials-hero">
        <div className="testimonials-hero-content">
          <p className="eyebrow light">Client experiences</p>
          <h1>Stories of trust,<br /><em>recovery,</em> and<br />food freedom.</h1>
          <p className="testimonials-hero-quote">“Amy helped me navigate my relationship with food, transforming it into a source of joy rather than anxiety.”</p>
        </div>
        <div className="testimonials-hero-portrait">
          <img src="../images/client-testimonial-poster.jpg" alt="Client sharing her experience with Amy Jaffe" />
        </div>
        <div className="testimonials-hero-note"><span>✦</span><p>Every story is shared with permission and presented in the client&apos;s own voice.</p></div>
      </section>

      <section className="google-reviews-section" id="google-reviews" aria-labelledby="google-reviews-title">
        <div className="google-reviews-heading">
          <div>
            <p className="google-brand-heading" aria-label="Google Reviews">
              <span className="google-word" aria-hidden="true">
                <span className="google-blue">G</span><span className="google-red">o</span><span className="google-yellow">o</span><span className="google-blue">g</span><span className="google-green">l</span><span className="google-red">e</span>
              </span>
              <span className="google-reviews-label" aria-hidden="true">Reviews</span>
            </p>
            <h2 id="google-reviews-title">Kind words,<br /><em>answered with care.</em></h2>
          </div>
          <a className="google-rating" href={googleReviewsUrl} target="_blank" rel="noreferrer" aria-label="Read all 26 Google reviews for Amy Jaffe Nutrition">
            <span className="google-rating-score">5.0</span>
            <span className="google-stars" aria-label="5 out of 5 stars">★★★★★</span>
            <span>26 Google reviews</span>
            <strong>Read all reviews <span aria-hidden="true">↗</span></strong>
          </a>
        </div>
        <div className="google-review-grid">
          {googleReviews.map((review) => (
            <article className="google-review-card" key={review.name}>
              <header>
                <div className="google-reviewer-mark" aria-hidden="true">{review.name.charAt(0)}</div>
                <div><h3>{review.name}</h3><span className="google-stars" aria-label="5 out of 5 stars">★★★★★</span></div>
              </header>
              <blockquote>{review.review}</blockquote>
              <div className="google-owner-reply">
                <p>Amy Jaffe Nutrition replied</p>
                <blockquote>{review.reply}</blockquote>
              </div>
            </article>
          ))}
        </div>
        <p className="google-review-source">Selected public reviews and owner responses from Google.</p>
      </section>

      <section className="client-stories-section" id="in-their-words">
        <div className="client-stories-heading">
          <p>Care that stays with you.</p>
          <h2>In their <em>words.</em></h2>
        </div>
        <div className="client-quote-cloud">
          {clientTestimonials.map((testimonial) => (
            <article className="client-quote-bubble" data-client={testimonial.name} key={testimonial.name}>
              <blockquote>{testimonial.highlight}</blockquote>
              <p className="client-quote-name">— {testimonial.name}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="testimonial-gallery-section">
        <div className="testimonial-page-heading">
          <p className="eyebrow">Notes and milestones</p>
          <h2>Messages that mean<br /><em>the world.</em></h2>
        </div>
        <div className="visual-testimonial-grid">
          {visualTestimonials.map((testimonial, index) => (
            <article className={`visual-testimonial-card${testimonial.portrait ? " has-portrait" : ""}`} data-client={testimonial.name} key={testimonial.name}>
              <figure className="visual-testimonial-note">
                <img src={`../images/testimonials/${testimonial.note}`} alt={testimonial.noteAlt} loading={index > 1 ? "lazy" : "eager"} />
              </figure>
              {testimonial.portrait && (
                <figure className="visual-testimonial-portrait">
                  <img src={`../images/testimonials/${testimonial.portrait}`} alt={testimonial.portraitAlt} loading={index > 1 ? "lazy" : "eager"} />
                </figure>
              )}
              <p>{testimonial.name}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="testimonial-page-cta">
        <p className="eyebrow light">Your story matters, too</p>
        <h2>Ready for a gentler<br /><em>way forward?</em></h2>
        <a className="button button-cream" href="../#contact">Request an appointment <span>↗</span></a>
      </section>

      <SiteFooter pathPrefix="../" />
    </main>
  );
}
