'use client'

import image3 from '@/public/images/216f93efca95a8c000725a6ba9b0d4cd31c39921_high.webp'
import image2 from '@/public/images/expiredEmail.svg'
import image from '@/public/images/sign-up.svg'
import { Carousel } from '@/shared/ui/Carousel'

export default function HomePage() {
  return (
    <div>
      <Carousel images={[image, image2, image3]} type={'Gray'} />
    </div>
  )
}
