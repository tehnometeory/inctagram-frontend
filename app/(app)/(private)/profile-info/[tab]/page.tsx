'use client'

import { AccountManagement, Devices, GeneralInformation, MyPayments } from '@/features'
import { notFound } from 'next/navigation'
import React from 'react'

const tabs = {
  'general-information': GeneralInformation,
  devices: Devices,
  'my-payments': MyPayments,
  'account-management': AccountManagement,
} as const // 🔹 Фиксируем объект как константный

export default function ProfileTab({ params }: { params: Promise<{ tab?: string }> }) {
  const resolvedParams = React.use(params)
  const tab = resolvedParams?.tab as keyof typeof tabs | undefined

  if (!tab || !(tab in tabs)) return notFound()

  const Component = tabs[tab]

  return <Component />
}
