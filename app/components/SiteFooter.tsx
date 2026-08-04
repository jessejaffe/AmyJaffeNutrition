/* eslint-disable @next/next/no-img-element -- relative asset paths are required for the static export. */

type SiteFooterProps = {
  pathPrefix: string;
};

const sitemapLinks = [
  { label: "Home", href: "#home" },
  { label: "About Amy", href: "#about" },
  { label: "Areas of Expertise", href: "#expertise" },
  { label: "Services", href: "#services" },
  { label: "Testimonials", href: "testimonials/" },
  { label: "Nutrition Assessment", href: "services/nutrition-assessment/" },
  { label: "Follow-Up Sessions", href: "services/follow-up-sessions/" },
  { label: "Free Introductory Call", href: "free-introductory-call/" },
  { label: "Contact", href: "#contact" },
];

const socialLinks = [
  { name: "Instagram", href: "https://www.instagram.com/stickynotesnutritiontherapist/", icon: "images/social-instagram.svg" },
  { name: "Facebook", href: "https://www.facebook.com/nutritionstickynotesAmyJaffe", icon: "images/social-facebook.svg" },
  { name: "LinkedIn", href: "https://www.linkedin.com/in/amysjaffe/", icon: "images/social-linkedin.svg" },
];

export default function SiteFooter({ pathPrefix }: SiteFooterProps) {
  return (
    <footer>
      <div className="footer-grid">
        <div className="footer-intro">
          <a className="footer-brand" href={`${pathPrefix}#home`}>
            <img src={`${pathPrefix}images/amy-jaffe-logo.avif`} alt="Amy Jaffe Nutrition" />
          </a>
          <div className="footer-summary">
            <p>Serving South Florida and telehealth clients with compassionate, expert nutrition care.</p>
            <div className="social-links" aria-label="Social media">
              {socialLinks.map((social) => (
                <a href={social.href} target="_blank" rel="noreferrer" aria-label={social.name} key={social.name}>
                  <img src={`${pathPrefix}${social.icon}`} alt="" />
                </a>
              ))}
            </div>
          </div>
        </div>

        <nav className="footer-sitemap" aria-labelledby="footer-sitemap-title">
          <h2 id="footer-sitemap-title">Sitemap</h2>
          <ul>
            {sitemapLinks.map((link) => (
              <li key={link.label}><a href={`${pathPrefix}${link.href}`}>{link.label}</a></li>
            ))}
          </ul>
        </nav>

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
            <address>1801 NE 123rd Street, Suite 303<br />Miami, FL 33181</address><span aria-hidden="true">↗</span>
          </a>
        </section>
      </div>
      <small className="footer-copyright">© {new Date().getFullYear()} Amy Jaffe Nutrition</small>
    </footer>
  );
}
