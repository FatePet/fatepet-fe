import { NextRequest, NextResponse } from 'next/server';

export function middleware(req: NextRequest) {
	const refreshToken = req.cookies.get('refresh');
	const { pathname } = req.nextUrl;

	if (pathname.startsWith('/admin')) {
		// /admin/login 경로일때
		if (pathname === '/admin/login') {
			if (refreshToken) {
				return NextResponse.redirect(new URL('/admin/main', req.url));
			}
			// 로그인 상태 X면 그대로
			return NextResponse.next();
		}
		// /admin/login이 아닌 다른 /admin 하위 경로일 때
		if (!refreshToken) {
			// 로그인 X면 로그인 페이지로 이동
			return NextResponse.redirect(new URL('/admin/login', req.url));
		}
		return NextResponse.next();
	}

	return NextResponse.next();
}

export const config = {
	matcher: ['/admin', '/admin/:path*'],
};
