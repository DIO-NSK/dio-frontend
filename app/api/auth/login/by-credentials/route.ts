import {NextResponse} from "next/server";
import {serialize} from "cookie";

const BASE_URL = process.env.BASE_URL;

export async function POST(req: Request) {
    const body = await req.json();
    const response = await fetch(`${BASE_URL}/user/login/credentials`, {
        method: 'POST',
        body: JSON.stringify(body),
        headers: {
            'Content-type': 'application/json'
        }
    });

    if (response.ok) {
        const {accessToken} = await response.json();
        const accessTokenCookie = serialize('accessToken', accessToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            path: '/',
            sameSite: 'strict'
        });

        const responseWithCookie = NextResponse.json({accessToken: accessToken});
        responseWithCookie.headers.set('Set-Cookie', accessTokenCookie);

        return responseWithCookie;
    }

    return response;
}