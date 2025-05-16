import { NextResponse } from 'next/server';

export async function POST() {
	const response = NextResponse.json({ success: true });

	// refresh 쿠키 삭제
	response.cookies.set('refresh', '', {
		path: '/token',
		httpOnly: true,
		secure: true,
		maxAge: 0,
	});
	return response;
}
