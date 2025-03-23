'use client'

import { AccountManagement, Devices, GeneralInformation, MyPayments } from '@/features'
import { notFound } from 'next/navigation'

const tabs = {
  'general-information': GeneralInformation,
  devices: Devices,
  'my-payments': MyPayments,
  'account-management': AccountManagement,
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
