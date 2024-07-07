import type {NextRequest} from 'next/server'
import {NextResponse} from "next/server";
import {parse} from 'cookie';
import {jwtDecode} from "jwt-decode";

const checkProfile = (request : NextRequest, token : string) => {
    if (request.nextUrl.pathname.startsWith('/profile')) {
        if (!accessToken) {
            return NextResponse.redirect(new URL('/', request.url));
        } else {
            const {exp} = jwtDecode(token);

            if (Number.isSafeInteger(exp) && Date.now() > (exp as number) * 1000) {
                return NextResponse.redirect(new URL('/', request.url));
            }

            return NextResponse.next();
        }
    }
}

const checkAdmin = (request : NextRequest, token : string) => {
    if (request.nextUrl.pathname.startsWith('/admin')) {
        if (!accessToken) {
            return NextResponse.redirect(new URL('/', request.url));
        } else {
            const {exp} = jwtDecode(token);

            if (Number.isSafeInteger(exp) && Date.now() > (exp as number) * 1000) {
                return NextResponse.redirect(new URL('/', request.url));
            }

            return NextResponse.next();
        }
    }
}

export function middleware(request: NextRequest) {
    const cookies = parse(request.headers.get('cookie') || '');
    const accessToken = cookies.accessToken;

    checkProfile(request, accessToken);
    checkAdmin(request, accessToken);

    return NextResponse.next();
}

export const config = {
    matcher: '/:path*',
}