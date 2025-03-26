'use client'

import { Tabs } from '@rambo-react/ui-meteors'
import { usePathname, useRouter } from 'next/navigation'

const tabs = [
  { value: 'General information' },
  { value: 'Devices' },
  { value: 'Account Management' },
  { value: 'My payments' },
]

export const ProfileNavigation = () => {
  const router = useRouter()
  const pathname = usePathname()
  const formatTabValue = (value: string) => value.replace(/\s+/g, '-').toLowerCase()
  const currentTab =
    tabs.find(tab => formatTabValue(tab.value) === pathname.split('/').pop())?.value ||
    'General information'

  return (
    <Tabs
      selected={currentTab}
      tabs={tabs.map(tab => ({
        ...tab,
        onTabClick: () => router.replace(`/profile-info/${formatTabValue(tab.value)}`),
      }))}
    />
  )
}
