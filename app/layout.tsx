// import type React from "react"
// import type { Metadata } from "next"
// import { Montserrat } from "next/font/google"
// import "./globals.css"
// import { Navigation } from "@/components/navigation"
// import { Footer } from "@/components/footer"
// import { CartProvider } from "@/components/cart-context"
// import { FloatingWhatsApp } from "@/components/floating-whatsapp"

// const montserrat = Montserrat({
//   subsets: ["latin"],
//   weight: ["300", "400", "500", "600", "700", "800"],
//   display: "swap",
// })

// export const metadata: Metadata = {
//   title: "Farmer's Dairy - Fresh Farm Milk Delivered",
//   description:
//     "Premium quality farm-fresh milk delivered to your doorstep. Subscribe for daily, weekly, or monthly delivery.",
//     generator: 'v0.dev'
// }

// export default function RootLayout({
//   children,
// }: {
//   children: React.ReactNode
// }) {
//   return (
//     <html lang="en" suppressHydrationWarning>
//       <head>
//         {/* Razorpay Script - Load in head to avoid hydration issues */}
//         <script src="https://checkout.razorpay.com/v1/checkout.js" async defer />
//       </head>
//       <body className={`${montserrat.className} bg-sage-50`} suppressHydrationWarning>
//         <CartProvider>
//           <Navigation />
//           <main>{children}</main>
//           <Footer />
//           <FloatingWhatsApp />
//         </CartProvider>
//       </body>
//     </html>
//   )
// }

import "./globals.css";
import CowVacation from "@/components/CowVacation";
import "@/components/CowVacation.css";

export const metadata = {
  title: "Farmer's Dairy",
  description: "Milk with love",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <CowVacation />
        <div style={{ display: "none" }}>{children}</div>
      </body>
    </html>
  );
}
