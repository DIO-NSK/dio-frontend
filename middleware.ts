import type {NextRequest} from 'next/server'
import {NextResponse} from 'next/server'

export function middleware(request: NextRequest) {
    const {nextUrl, headers} = request;
    const ip = headers.get('x-forwarded-for') || request.ip;

    if (nextUrl.pathname === '/healthycheck') {
        return NextResponse.next();
    }
}

export const config = {
    matcher: '/:path*',
}