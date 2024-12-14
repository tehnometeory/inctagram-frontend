'use client'

import image2 from '@/public/images/expiredEmail.svg'
import image from '@/public/images/sign-up.svg'
import { Carousel } from '@/shared/ui/Carousel'

export default function HomePage() {
  return (
    <div>
      <Carousel images={[image, image2]} type={'Black'} />
    </div>
  )
}
