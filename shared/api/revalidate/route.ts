import { revalidateTag } from 'next/cache'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  const tag = request.nextUrl.searchParams.get('tag')

  if (!tag) {
    return NextResponse.json({ message: 'Missing tag param', status: 400 })
  }

  revalidateTag(tag)

  return NextResponse.json({
    now: Date.now(),
    revalidated: true,
    tag: tag,
  })
}
