import { ProfileNavigation } from '@/features'

export default function ProfileLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className={'profile-container'}>
      <ProfileNavigation />
      <div className={'profile-content'}>{children}</div>
    </div>
  )
}
