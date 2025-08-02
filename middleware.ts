// import { NextResponse } from "next/server";
// import type { NextRequest } from "next/server";

// export function middleware(request: NextRequest) {
//   // Allow access to the maintenance page and assets
//   const allowedPaths = [
//     "/maintenance",
//     "/favicon.ico",
//     "/images",
//     "/_next",
//     "/public",
//   ];
//   const urlPath = request.nextUrl.pathname;

//   const isAllowed = allowedPaths.some((path) => urlPath.startsWith(path));

//   // Redirect all other requests to /maintenance
//   if (!isAllowed) {
//     return NextResponse.redirect(new URL("/maintenance", request.url));
//   }

//   return NextResponse.next();
// }
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const allowedPaths = [
    "/maintenance",
    "/favicon.ico",
    "/images",
    "/_next",
    "/public",
    "/cow-vacation.png",
  ];

  const urlPath = request.nextUrl.pathname;
  const isAllowed = allowedPaths.some((path) => urlPath.startsWith(path));

  if (!isAllowed) {
    const html = `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Cows on Vacation 🐄</title>
        <link href="https://fonts.googleapis.com/css2?family=Atma:wght@600&family=Montserrat:wght@400;500&display=swap" rel="stylesheet">
        <style>
          body {
            margin: 0;
            padding: 0;
            background: url('/cow-vacation.png') center/contain no-repeat, linear-gradient(to bottom right, #fffbe6, #ffe5ec);
            font-family: 'Montserrat', sans-serif;
            height: 100vh;
            width: 100vw;
            display: flex;
            justify-content: center;
            align-items: center;
            text-align: center;
            flex-direction: column;
            background-size: cover;
          }
          h1 {
              font-family: 'Montserrat', sans-serif;
            font-size: 2.5rem;
            color: #5c4033;
            margin: 1rem;
            background-color: #ffffffcc;
            padding: 0.5rem 1rem;
            border-radius: 10px;
          }
          p {
            font-size: 1.2rem;
            color: #333;
            background-color: #ffffffcc;
            padding: 0.75rem 1.25rem;
            border-radius: 10px;
            max-width: 90%;
            line-height: 1.5;
          }
        </style>
      </head>
      <body>
        <h1>Our cows are on vacation🌴</h1>
        <p>Milk will be back soon. They're just recharging under the sun</p>
      </body>
      </html>
    `;

    return new NextResponse(html, {
      status: 200,
      headers: { "Content-Type": "text/html" },
    });
  }

  return NextResponse.next();
}
