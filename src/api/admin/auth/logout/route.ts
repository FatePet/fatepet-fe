import { NextResponse } from 'next/server';

export async function POST() {
	const response = NextResponse.json({ status: 200, message: '로그아웃 성공' });

	// refresh 쿠키 삭제
	response.cookies.set('refresh', '', {
		path: '/token',
		httpOnly: true,
		secure: true,
		maxAge: 0,
	});
	return response;
}
