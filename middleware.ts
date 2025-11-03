// import { NextResponse } from "next/server";
// import type { NextRequest } from "next/server";

// export function middleware(request: NextRequest) {
//   const allowed = [
//     "/maintenance",
//     "/favicon.ico",
//     "/_next",
//     "/public",
//     "/beach-cow.png",
//   ];
//   const path = request.nextUrl.pathname;
//   if (!allowed.some((p) => path.startsWith(p))) {
//     const html = `
//     <!DOCTYPE html>
//     <html lang="en">
//     <head>
//       <meta charset="UTF-8"/>
//       <meta name="viewport" content="width=device-width,initial-scale=1"/>
//       <title>Our cows are on vacation</title>
//       <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500&family=Atma:wght@600&display=swap" rel="stylesheet"/>
//       <style>
//         body {
//           margin:0; padding:0;
//           background: url('/cow-vacation.png') no-repeat center top;
//           background-size: cover;
//           font-family:'Montserrat', sans-serif;
//           color:#2f3e52;
//           display:flex;
//           align-items:center;
//           justify-content:center;
//           text-align:center;
//           height:100vh;
//         }
//         .content {
//           padding: 0 15px;
//         }
//         h1 {
//         font-family:'Montserrat', sans-serif;
//           font-size:2.5rem;
//           margin:0.5em 0 0.3em;
//         }
//         p {
//           font-size:1.2rem;
//           margin:0.3em 0;
//           max-width:90%;
//           line-height:1.5;
//         }
//         @media(max-width:600px) {
//           h1 { font-size:2rem; }
//           p  { font-size:1rem; }
//           body { background-position: center center; }
//         }
//         @media(min-width:601px) and (max-width:1024px) {
//           h1 { font-size:2.2rem; }
//           p  { font-size:1.1rem; }
//         }
//       </style>
//     </head>
//     <body>
//       <div class="content">
//         <h1>Our cows are on vacation 🏖️</h1>
//         <p>Milk is taking a short break while they soak up the sun. Back soon!</p>
//       </div>
//     </body>
//     </html>
//     `;
//     return new NextResponse(html, {
//       headers: { "Content-Type": "text/html" },
//     });
//   }
//   return NextResponse.next();
// }
