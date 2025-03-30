import { AvatarLoader } from '@/features/avatarImage'
import { GeneralInformationForm } from '@/features/profileInfo/ui/GeneralInformation/GeneralInformationForm/GeneralInformationForm'

import s from './GeneralInformation.module.scss'

export const GeneralInformation = () => {
  return (
    <div className={s.generalInformationFormContainer}>
      <AvatarLoader />
      <GeneralInformationForm />
    </div>
  )
}
