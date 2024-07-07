import type {NextRequest} from 'next/server'
import {NextResponse} from 'next/server'

export function middleware(request: NextRequest) {
    const {nextUrl, headers} = request;
    const ip = headers.get('x-forwarded-for') || request.ip;
    console.log(request.headers);

    if (nextUrl.pathname === '/healthycheck') {
        if (ip === process.env.YANDEX_BALANCER_IP) {
            return NextResponse.next();
        }
    }
}

export const config = {
    matcher: '/:path*',
}