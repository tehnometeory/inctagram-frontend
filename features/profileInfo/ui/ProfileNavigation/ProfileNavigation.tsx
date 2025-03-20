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

  const currentTab = pathname.split('/').pop() || 'General Information'

  return (
    <Tabs
      selected={currentTab}
      tabs={tabs.map(tab => ({
        ...tab,
        onTabClick: () =>
          router.replace(`/profile-info/${tab.value.replace(/\s+/g, '-').toLowerCase()}`),
      }))}
    />
  )
}
