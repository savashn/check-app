import { NextResponse } from 'next/server';

export function middleware(request) {
    const token = request.cookies.get('x-auth-token');
    const { pathname } = request.nextUrl;

    const protectedRoutesRegex = /^\/admin(\/|$)/;

    if (protectedRoutesRegex.test(pathname) && !token) {
        return NextResponse.rewrite(new URL('/404', request.url));
    }

    if (token) {
        if (pathname === '/') {
            return NextResponse.redirect(new URL('/admin/tables', request.url));
        }

        const requestHeaders = new Headers(request.headers);

        requestHeaders.set('x-auth-token', `${token.value}`);

        return NextResponse.next({
            request: {
                headers: requestHeaders,
            },
        });
    }

    return NextResponse.next();
}