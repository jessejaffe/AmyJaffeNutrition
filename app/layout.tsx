import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.amyjaffenutrition.com"),
  title: "Amy Jaffe Nutrition | Intuitive Eating Dietitian",
  description: "Compassionate, non-diet nutrition counseling in Miami and via telehealth with Amy Jaffe, Registered Dietitian and Certified Intuitive Eating Specialist.",
  openGraph: {
    title: "Amy Jaffe Nutrition",
    description: "A healthier relationship with food.",
    images: [{ url: "/og.png", width: 1200, height: 630, alt: "Amy Jaffe Nutrition — A healthier relationship with food" }],
  },
  twitter: { card: "summary_large_image", images: ["/og.png"] },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}
