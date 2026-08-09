import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.amyjaffenutrition.com"),
  title: "Amy Jaffe Nutrition | Intuitive Eating Dietitian",
  description: "Compassionate, non-diet nutrition counseling in Miami and via telehealth with Amy Jaffe, Registered Dietitian and Certified Intuitive Eating Specialist.",
  alternates: { canonical: "/" },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  verification: { google: "ICtjOUbHVHPZLTb70ac7b9JWeTnHWktjZ-N6nXPPjBI" },
  icons: { icon: "/favicon.svg" },
  openGraph: {
    title: "Amy Jaffe Nutrition",
    description: "A healthier relationship with food.",
    url: "/",
    siteName: "Amy Jaffe Nutrition",
    locale: "en_US",
    type: "website",
    images: [{ url: "/og.png", width: 1200, height: 630, alt: "Amy Jaffe Nutrition - A healthier relationship with food" }],
  },
  twitter: { card: "summary_large_image", images: ["/og.png"] },
};

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": ["ProfessionalService", "LocalBusiness"],
  "@id": "https://www.amyjaffenutrition.com/#business",
  name: "Amy Jaffe Nutrition",
  url: "https://www.amyjaffenutrition.com/",
  image: "https://www.amyjaffenutrition.com/images/amy-jaffe.avif",
  logo: "https://www.amyjaffenutrition.com/images/amy-jaffe-logo.avif",
  telephone: "+1-305-586-6053",
  email: "amysjaffe@gmail.com",
  address: {
    "@type": "PostalAddress",
    streetAddress: "1801 NE 123rd Street, Suite 303",
    addressLocality: "Miami",
    addressRegion: "FL",
    postalCode: "33181",
    addressCountry: "US",
  },
  areaServed: [
    { "@type": "AdministrativeArea", name: "South Florida" },
    { "@type": "State", name: "Florida" },
  ],
  sameAs: [
    "https://www.instagram.com/stickynotesnutritiontherapist/",
    "https://www.facebook.com/nutritionstickynotesAmyJaffe",
    "https://www.linkedin.com/in/amysjaffe/",
  ],
  founder: {
    "@type": "Person",
    name: "Amy Jaffe",
    honorificSuffix: "MS, RD, LD",
  },
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Nutrition counseling services",
    itemListElement: [
      {
        "@type": "Offer",
        itemOffered: { "@type": "Service", name: "Nutrition assessment" },
      },
      {
        "@type": "Offer",
        itemOffered: { "@type": "Service", name: "Nutrition counseling follow-up sessions" },
      },
    ],
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
        {children}
        <script
          type="application/ld+json"
          data-static-script="true"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
      </body>
    </html>
  );
}
