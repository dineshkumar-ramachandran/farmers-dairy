import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  return new NextResponse(
    `
    <!DOCTYPE html>
    <html>
      <head>
        <title>Service Suspended</title>
        <style>
          body{
            font-family:Arial,sans-serif;
            display:flex;
            justify-content:center;
            align-items:center;
            height:100vh;
            margin:0;
            background:#f5f5f5;
            text-align:center;
          }
          .box{
            background:white;
            padding:30px;
            border-radius:10px;
            max-width:600px;
          }
        </style>
      </head>
      <body>
        <div class="box">
          <h1>Website Service Suspended</h1>
          <p>This website is temporarily unavailable.</p>
          <p>Please contact the website administrator.</p>
        </div>
      </body>
    </html>
    `,
    {
      status: 503,
      headers: {
        'Content-Type': 'text/html',
      },
    }
  )
}

export const config = {
  matcher: '/:path*',
}
