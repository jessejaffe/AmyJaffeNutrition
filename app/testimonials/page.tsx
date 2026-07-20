import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Client Testimonials | Amy Jaffe Nutrition",
  description: "Client stories, Google reviews, and Amy's responses about compassionate, non-diet nutrition care and eating disorder recovery.",
};

const socialLinks = [
  { name: "Facebook", href: "https://www.facebook.com/nutritionstickynotesAmyJaffe", icon: "../images/social-facebook.svg" },
  { name: "Instagram", href: "https://www.instagram.com/stickynotesnutritiontherapist/", icon: "../images/social-instagram.svg" },
  { name: "LinkedIn", href: "https://www.linkedin.com/in/amysjaffe/", icon: "../images/social-linkedin.svg" },
];

type VisualTestimonial = {
  name: string;
  note: string;
  noteAlt: string;
  portrait?: string;
  portraitAlt?: string;
};

type WrittenTestimonial = {
  name: string;
  paragraphs: string[];
  image?: string;
  imageAlt?: string;
  role?: string;
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
    portrait: "testimonial-note-08.jpg",
    portraitAlt: "Karen",
  },
  {
    name: "Maria",
    note: "testimonial-note-09.png",
    noteAlt: "Handwritten note from Maria calling Amy a trusted nutritionist and friend",
  },
  {
    name: "Morgan Herrick",
    note: "testimonial-note-10.jpeg",
    noteAlt: "Note from Morgan Herrick thanking Amy for helping her find food freedom",
  },
];

const clientTestimonials: WrittenTestimonial[] = [
  {
    name: "Kim R.",
    image: "testimonial-note-11.jpeg",
    imageAlt: "Kim R.",
    paragraphs: ["I am so thankful to have found such a kind, compassionate, and nonjudgmental nutritionist. You have helped me pave my road to recovery!"],
  },
  {
    name: "Becky",
    paragraphs: [
      "I don't know if you remember me. I just wanted to let you know I am finally in recovery. We found out I have autism and ARFID, which is an eating disorder highly linked to autism.",
      "I wanted to text you because I know you probably value hearing from past clients, and I just wanted to say thank you for always giving me grace and realizing it was always a bit bigger than what everyone else saw. I have restored weight in the past year and I am so happy. Always grateful for you. Thanks, Amy.",
    ],
  },
  {
    name: "Vicky",
    paragraphs: ["Thank you for the great work you do and for reminding me to always be kind to myself!"],
  },
  {
    name: "Markey",
    paragraphs: ["Thank you so much for all of your help and support, as well as laughing at my bad jokes!"],
  },
  {
    name: "Lauren",
    paragraphs: [
      "Hi Amy, This is Lauren. I know it has been a few years but I wanted to let you know that as of a few days ago I am officially a Registered Dietitian.",
      "I wanted to thank you for inspiring me to go down this path and for all of your help in allowing me to find food freedom. I hope to work with clients like myself and make a difference in their lives like how you did in mine. Thank you so much for everything.",
    ],
  },
  {
    name: "Katie F.",
    paragraphs: [
      "I wanted to share and say THANK YOU!!!!! I am so pleased to be considered one of your successful clients. It makes a lot of sense NOW that this is the one approach that could give me the ability to trust myself with any and every food, and allow me the ability to really trust you when you tell me using this approach will make the difference with my long-term success.",
      "It actually clicked for me because it's not a magic pill or new fad diet. It's using my own body, mind and some solid tips to nourish myself - finally. I finally know how to successfully do that. For teaching me this most important skill, I will be forever grateful to you!!!!",
    ],
  },
  {
    name: "Allison P.",
    paragraphs: ["After working with Amy Jaffe for over a year, I can say that it's a pleasure to work with someone as professional and understanding as her. Amy focuses on nutrition, but it's very important for her to understand what's going on in my life that may be affecting my eating behavior. What makes all of my visits worth it is that she always listens carefully to all my thoughts and considers them important material to work with, no matter how simple I may consider them."],
  },
  {
    name: "Janet M.",
    paragraphs: ["Amy has been my nutritionist for years. She empowers me to make my own nutrition choices and doesn't make the food intimidating. She works with you and where you are and still challenges you to get a little closer to your nutrition goals. Can't isn't a word with Amy and she helps me find the CAN in any situation. I couldn't imagine working through my food issues with anyone else."],
  },
  {
    name: "Josh H.",
    paragraphs: ["I want to thank you for your guidance with your nutrition videos. I worked with you a couple years ago when you taught me about intuitive eating and it changed my life. I found great value in your videos. Thanks!"],
  },
  {
    name: "Jackie H.",
    paragraphs: ["It's been about one and a half years since I saw you but I wanted to send a quick note to say how eternally grateful I am for the time I spent with you sharing my struggles. Thank you for speaking the truth to my distorted thinking and helping me make changes mentally, physically, spiritually and socially. I am feeling strong and healthy. I haven't weighed myself or purged in almost 2 years!"],
  },
  {
    name: "Melissa L.",
    image: "testimonial-note-12.jpeg",
    imageAlt: "Melissa L.",
    paragraphs: ["Amy, thank you for your continued support and wisdom. You truly are a gift to this world and to me. Thank you."],
  },
];

const longerStories: WrittenTestimonial[] = [
  {
    name: "Irene C.",
    paragraphs: [
      "I want to thank Amy Jaffe RD, LD, MS, Nutritionist and Certified Intuitive Eating Specialist, from the Miami Resource and Counseling Center, for the exceptional and amazing services she provided in facing my nutritional and weight issues.",
      "After following my physician's recommendations to be evaluated by a dietician since my weight, blood pressure, and A1C levels were rising and getting out of control, I was given Amy Jaffe's information and she was highly recommended. I must say I was very reluctant in making the appointment. Being in the health field I thought I knew everything I needed to know about losing the weight. I just needed to focus, eat lots of salads, limited carbs, little sugars, and lots of exercise. Simple! Boy was I wrong! I was schooled by Amy.",
      "Reluctantly I went ahead and scheduled the appointment. As I was driving to the appointment, instead of looking forward, I was feeling overwhelmed in adding another appointment to my busy schedule, more driving around town, more sitting around in a cold, uncomfortable, packed and boring office setting with a TV set to repetitive medical news. I must admit I almost turned around a few times, but amazingly I made it to the appointment. I can say it was and still is one of the best decisions I have made in my life!",
      "I was content with the office location and parking accessibility. As I entered the office I was stumped by the ambience. The waiting area was super cozy, with a non-clinical setting and definitely not intimidating at all. I enjoyed the soft, relaxing sounds of a waterfall scene playing on the TV and the fragrance of a beautiful bouquet of flowers sitting on the center table. The office staff was amazing, very professional and courteous. I felt my anxiety level decreasing.",
      "Less than 10 minutes had passed when I heard a soft voice calling my name. It was Amy! She greeted me with a big smile and a soft handshake and directed me to her office, also cozy and non-intimidating, plus very homey.",
      "During our initial visit Amy completed a nutritional assessment by gathering all my information about my nutrition, including my physical and emotional status, and developed a plan of action for me to follow on a weekly basis. I was stumped to learn that she uses a non-diet approach and introduced me to the 10 principles of Intuitive Eating: rejecting the diet mentality, honoring my hunger, making peace with food, challenging the food police, respecting my fullness, discovering the satisfaction factor, respecting my body, exercising, honoring my feelings, and honoring my health.",
      "She also introduced me to the Recovery Record electronic app, where I logged my meals, snacks, thoughts, feelings and coping skills. By inviting her, she was able to access my logs and send me messages, reminders and encouragement throughout the week. She definitely helped me work toward greater body acceptance and a healthy relationship with food. She allowed me to take challenges at my own pace and get out of my comfort zone under her guidance. Every meeting with Amy brought an aha moment that freed me from my issues with food.",
      "Through the weeks and months I spent with Amy, I always looked forward to our next sessions, following up on previous goals and setting new ones. Today I can say I am more conscious about what I eat and drink, not depriving myself of the foods I enjoy, especially napoleons, tres leches, tapas, arepas, patty-like croquettes, rice, beans, and all the delicious Cuban foods that I love. Amy is very knowledgeable about most of the ethnic cuisine in the Miami area, and that is a plus in a nutritionist who understands the different cuisines of the community.",
      "I am very happy to report that my blood pressure and A1C levels have decreased to a manageable level and my weight has been decreasing slowly but steadily, having lost approximately 30 pounds in less than a year and a half. There have been easy days and a few hard days, but even on a hard day, intuitive eating is easier than a hard day dieting.",
      "Leaving the best for last, let me tell you about my dietician. She is an amazing professional, super skilled in her profession, very supportive, down to earth, patient, warm, empathetic, creative, compassionate, inspiring, and an excellent listener. She always makes sure to have a kind word to say and is very accessible by text, email or phone. Amy has been amazing to me!",
      "In conclusion, Amy, I love what you have done for me! You rock! You are the best!",
    ],
  },
  {
    name: "Morgan H.",
    image: "testimonial-note-13.jpeg",
    imageAlt: "Morgan H.",
    paragraphs: [
      "12 months ago I was caught in a never-ending cycle of bingeing and restricting, and I had a terrible relationship with my body. I had lived this way for years, and I 100% believed that recovery was not possible for me. My therapist kept encouraging me to meet with a nutritionist, but honestly, I was terrified. I didn't want to be put on a diet plan. I didn't want to be told I needed to gain or lose weight. I didn't want someone to know what I did or did not let myself eat.",
      "But I did know that I couldn't live that life anymore. Something needed to change. So, I got the guts to schedule my first appointment with Amy. And I can honestly say that is the best thing I have ever done for myself. Amy introduced me to intuitive eating and it changed my life. She helped me break up with dieting and develop a positive relationship with food.",
      "I started seeing Amy 12 months ago, and it has been 8 months since I last binged. 8 MONTHS!!!!! I would not be where I am today without the support of this woman. She helped me get my life back, and I am eternally grateful.",
    ],
  },
  {
    name: "Rachael P.",
    image: "testimonial-note-14.jpg",
    imageAlt: "Rachael P.",
    paragraphs: [
      "I worked with Amy Jaffe in the capacity of my registered dietician from April through November 2018. Initially we worked face-to-face while I was working in Miami; however, we continued meeting for weekly sessions on the telephone and FaceTime. Amy was always most attentive to my needs as an individual and was very quick to learn about my own personal circumstances: I suffer from anorexia, complex-PTSD, and dissociation.",
      "Within a matter of weeks Amy had a concrete grasp of my various diagnoses and had become very adept at adjusting her approach to best meet my needs on any given day. She liaised frequently with my therapists and family members and communicated with me on a near-daily basis through text messages and an online recovery application for people with eating disorders. Amy's understanding of my unique needs and her continued support enabled me to continue setting and attaining achievable goals.",
      "When I moved back to Houston, she provided a detailed handover for my new dietician, which helped with this transition in location and team members. Amy is a brilliantly skilled and knowledgeable dietician who really comprehends the brutal nature and psyche of an eating disorder and the psychological trauma this illness wreaks in people's lives. Yet, it was her constant dedication, kindness, and thoughtfulness that made my experience working with Amy such an important part of my recovery process.",
      "I am really grateful to her for all her support in my journey and feel honored to have had the opportunity to work with such a personality. As the popular adage goes, every cloud has a silver lining. Having anorexia is more so a storm than a mere cloud, but Amy has been one of my silver linings in my journey to health, happiness, and fulfillment.",
    ],
  },
  {
    name: "Dr. Sammi Siegel",
    role: "Licensed Mental Health Counselor",
    image: "testimonial-note-15.jpeg",
    imageAlt: "Dr. Sammi Siegel",
    paragraphs: ["I can't do my job without Amy Jaffe! I would be remiss if I did not enlist the collaboration with her in working with my clients who struggle with their relationship with food. Having her working with my clients gives me the peace of mind that they are well taken care of for the nutrition piece so that I can focus on the psychotherapy aspects of eating disorder treatment. She is the peanut butter to my jelly, the yin to my yang."],
  },
  {
    name: "Carlos C.",
    image: "testimonial-note-16.jpg",
    imageAlt: "Carlos C.",
    paragraphs: [
      "Several years ago, I was overweight with pain in my right knee. I wanted to reduce my weight but not follow a diet that might last some months only. Instead, I was looking for a long-term solution by changing my eating habits.",
      "I met Amy at that moment, and I have to say that she was outstanding in helping me accomplish my goals. She knows how to help you change your eating habits in ways that later impact a healthy lifestyle. I highly recommend Amy for her professionalism and human quality.",
    ],
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
          <a href="../#resources">Resources</a>
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
            <a href="./" aria-current="page">Testimonials</a><a href="../#resources">Resources</a>
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
          <p>Real reflections from clients and colleagues who have worked with Amy through eating disorder recovery, intuitive eating, and a more compassionate relationship with food.</p>
        </div>
        <div className="testimonials-hero-note"><span>✦</span><p>Every story is shared with permission and presented in the client&apos;s own voice.</p></div>
      </section>

      <section className="google-reviews-section" aria-labelledby="google-reviews-title">
        <div className="google-reviews-heading">
          <div>
            <p className="eyebrow">Google reviews</p>
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

      <section className="client-stories-section">
        <div className="testimonial-page-heading story-heading">
          <p className="eyebrow light">In their words</p>
          <h2>Care that stays<br /><em>with you.</em></h2>
        </div>
        <div className="client-quote-grid">
          {clientTestimonials.map((testimonial, index) => (
            <article className={`client-quote-card${testimonial.image ? " has-client-photo" : ""}`} data-client={testimonial.name} key={testimonial.name}>
              <div className="client-quote-top">
                <span className="quote-number">{String(index + 1).padStart(2, "0")}</span>
                {testimonial.image && <img src={`../images/testimonials/${testimonial.image}`} alt={testimonial.imageAlt} loading="lazy" />}
              </div>
              <blockquote>{testimonial.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}</blockquote>
              <p className="client-quote-name">{testimonial.name}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="long-stories-section">
        <div className="testimonial-page-heading">
          <p className="eyebrow">Recovery stories</p>
          <h2>What changed<br /><em>along the way.</em></h2>
        </div>
        <div className="long-story-list">
          {longerStories.map((story, index) => (
            <article className={`long-story${story.image ? " has-client-photo" : ""}`} data-client={story.name} key={story.name}>
              <header>
                {story.image && <img src={`../images/testimonials/${story.image}`} alt={story.imageAlt} loading="lazy" />}
                <span>{String(index + 1).padStart(2, "0")}</span><h3>{story.name}</h3>{story.role && <p>{story.role}</p>}
              </header>
              <blockquote>{story.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}</blockquote>
            </article>
          ))}
        </div>
      </section>

      <section className="testimonial-page-cta">
        <p className="eyebrow light">Your story matters, too</p>
        <h2>Ready for a gentler<br /><em>way forward?</em></h2>
        <a className="button button-cream" href="../#contact">Request an appointment <span>↗</span></a>
      </section>

      <footer>
        <div className="footer-grid">
          <a className="footer-brand" href="../#home"><img src="../images/amy-jaffe-logo.avif" alt="Amy Jaffe Nutrition" /></a>
          <section className="footer-location" aria-labelledby="testimonials-footer-location-title">
            <h2 id="testimonials-footer-location-title">Location</h2>
            <div className="footer-map">
              <iframe src="https://www.google.com/maps?q=1801%20NE%20123rd%20Street%2C%20Suite%20303%2C%20Miami%2C%20FL%2033181&amp;output=embed" title="Map of Amy Jaffe Nutrition in Miami" loading="lazy" referrerPolicy="no-referrer-when-downgrade" allowFullScreen />
            </div>
            <a className="footer-address" href="https://www.google.com/maps/dir/?api=1&amp;destination=1801%20NE%20123rd%20Street%2C%20Suite%20303%2C%20Miami%2C%20FL%2033181" target="_blank" rel="noreferrer" aria-label="Get directions to Amy Jaffe Nutrition">
              <address>1801 NE 123rd Street, Suite 303<br />Miami, FL 33181</address><span aria-hidden="true">↗</span>
            </a>
          </section>
          <div className="footer-summary">
            <p>Serving Miami and telehealth clients with compassionate, non-diet nutrition care.</p>
            <div className="social-links" aria-label="Social media">
              {socialLinks.map((social) => (
                <a href={social.href} target="_blank" rel="noreferrer" aria-label={social.name} key={social.name}><img src={social.icon} alt="" /></a>
              ))}
            </div>
          </div>
        </div>
        <small className="footer-copyright">© {new Date().getFullYear()} Amy Jaffe Nutrition</small>
      </footer>
    </main>
  );
}
