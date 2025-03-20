'use client'
import { GeneralInformation } from '@/features/profileInfo/ui/GeneralInformation'
import { notFound } from 'next/navigation'

const tabs = {
  'general-information': GeneralInformation,
}

export default function ProfileTab({ params }: { params?: { tab?: string } }) {
  if (!params?.tab) {
    return notFound()
  }
  const Component = tabs[params.tab as keyof typeof tabs]

  if (!Component) {
    return notFound()
  }

  return <Component />
}
