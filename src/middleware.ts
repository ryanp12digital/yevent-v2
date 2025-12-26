import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
    const currentUser = request.cookies.get('admin_session')?.value;

    if (request.nextUrl.pathname.startsWith('/dashboard') && !currentUser) {
        return NextResponse.redirect(new URL('/login', request.url));
    }
}

export const config = {
    matcher: ['/dashboard/:path*'],
};
