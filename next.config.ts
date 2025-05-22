import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
	async rewrites() {
		if (process.env.NODE_ENV === 'development') {
			return [
				{
					source: 'api/:path*',
					destination: `${process.env.NEXT_PUBLIC_API}/:path*`,
				},
			];
		}
		return [];
	},
};

export default nextConfig;
