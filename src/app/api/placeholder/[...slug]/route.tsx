import { NextRequest, NextResponse } from 'next/server';

export async function GET(
  request: NextRequest,
  { params }: { params: { slug: string[] } }
) {
  const [widthStr, heightStr] = params.slug;
  const width = parseInt(widthStr) || 300;
  const height = parseInt(heightStr) || 200;
  
  // Get text from query param, e.g. ?text=News
  const { searchParams } = new URL(request.url);
  const text = searchParams.get('text') || `${width}x${height}`;

  // Generate a simple SVG placeholder
  const svg = `
    <svg width="${width}" height="${height}" version="1.1" xmlns="http://www.w3.org/2000/svg">
      <rect width="100%" height="100%" fill="#e2e8f0"/>
      <text x="50%" y="50%" font-family="sans-serif" font-size="16" font-weight="bold" fill="#64748b" dominant-baseline="middle" text-anchor="middle">
        ${text}
      </text>
    </svg>
  `;

  return new NextResponse(svg, {
    headers: {
      'Content-Type': 'image/svg+xml',
      'Cache-Control': 'public, max-age=31536000, immutable',
    },
  });
}
