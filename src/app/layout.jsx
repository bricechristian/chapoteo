import './globals.scss'
import {isMobile} from 'react-device-detect';

export const metadata = {
  title: 'Chapoteo (Splash)',
  description: 'A small spanish vocabulary flash card app to help me memorize the most popular 1000 spanish words.',
  openGraph: {
    title: 'Chapoteo (Splash)',
    description: 'A small spanish vocabulary flash card app to help me memorize the most popular 1000 spanish words.',
    siteName: "Chapoteo",
    url: `${
      process.env.NEXT_PUBLIC_VERCEL_URL || "http://localhost:3000"
    }`,
    images: [
      {
        url:`${
          process.env.NEXT_PUBLIC_VERCEL_URL || "http://localhost:3000"
        }/OG.png`,
        width: 1200,
        height: 630,
      },
    ],
    locale: "en-US",
    type: "website",
  },
  manifest: `${process.env.NEXT_PUBLIC_VERCEL_URL || "http://localhost:3000"}/site.webmanifest`,
  icons: {
    icon: `${process.env.NEXT_PUBLIC_VERCEL_URL || "http://localhost:3000"}/favicon-32x32.png`,
    shortcut: `${process.env.NEXT_PUBLIC_VERCEL_URL || "http://localhost:3000"}/android-chrome-512x512.png`,
    apple: `${process.env.NEXT_PUBLIC_VERCEL_URL || "http://localhost:3000"}/apple-touch-icon.png`
  },  
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${isMobile ? "mobile" : ""}`}>{children}</body>
    </html>
  )
}
