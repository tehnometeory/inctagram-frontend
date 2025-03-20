import { useForm } from 'react-hook-form'

import { ControlledInput } from '@/shared'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button, SelectBox } from '@rambo-react/ui-meteors/dist'
import { z } from 'zod'
import { profileSchema } from '@/features'
import s from './GeneralInformationForm.module.scss'

type FormValues = z.infer<typeof profileSchema>

export const GeneralInformationForm = () => {
  const {
    control,
    formState: { errors, isValid },
    handleSubmit,
  } = useForm<FormValues>({
    mode: 'onBlur',
    resolver: zodResolver(profileSchema),
  })

  function onFormSubmit() {
    console.log('click')
  }

  return (
    <form className={s.form} onSubmit={handleSubmit(onFormSubmit)}>
      <ControlledInput
        control={control}
        errorMsg={errors.username?.message}
        label={'Username'}
        name={'username'}
      />
      <ControlledInput
        control={control}
        errorMsg={errors.firstName?.message}
        label={'First Name'}
        name={'firstName'}
      />
      <ControlledInput
        control={control}
        errorMsg={errors.lastName?.message}
        label={'Last Name'}
        name={'lastName'}
      />
      <ControlledInput
        control={control}
        errorMsg={errors.dateOfBirth?.message}
        label={'Date of Birth'}
        name={'dateOfBirth'}
        placeholder={'ДД.ММ.ГГГГ'}
      />
      <div className={s.cityAndCountry}>
        <SelectBox />
        <ControlledInput
          control={control}
          errorMsg={errors.country?.message}
          label={'Country'}
          name={'country'}
        />
      </div>

      <ControlledInput
        control={control}
        errorMsg={errors.aboutMe?.message}
        label={'About Me'}
        name={'aboutMe'}
      />

      <Button disabled={!isValid} type={'submit'}>
        Save Changes
      </Button>
    </form>
  )
}
