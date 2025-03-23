import { useForm } from 'react-hook-form'

import {
  ControlledDatePicker,
  ControlledInput,
  ControlledSelectBox,
  ControlledTextArea,
} from '@/shared'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from '@rambo-react/ui-meteors/dist'
import { z } from 'zod'
import { profileSchema } from '@/features'
import s from './GeneralInformationForm.module.scss'

type FormValues = z.infer<typeof profileSchema>

const cities = [
  { value: 'minsk', label: 'Minsk' },
  { value: 'los-angeles', label: 'Los Angeles' },
  { value: 'moscow', label: 'Moscow' },
]
const countries = [
  { value: 'belarus', label: 'Belarus' },
  { value: 'usa', label: 'USA' },
  { value: 'russia', label: 'Russia' },
]

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
        label={
          <>
            Username <span className={s.required}>*</span>
          </>
        }
        name={'username'}
      />
      <ControlledInput
        control={control}
        errorMsg={errors.firstName?.message}
        label={
          <>
            First Name <span className={s.required}>*</span>
          </>
        }
        name={'firstName'}
      />
      <ControlledInput
        control={control}
        errorMsg={errors.lastName?.message}
        label={
          <>
            Last Name <span className={s.required}>*</span>
          </>
        }
        name={'lastName'}
      />
      <div className={s.date}>
        <ControlledDatePicker control={control} label={'Date of Birth'} name={'dateOfBirth'} />
      </div>

      <div className={s.cityAndCountry}>
        <ControlledSelectBox
          control={control}
          label="Select your city"
          name="city"
          options={cities}
          placeholder="Сity"
        />
        <ControlledSelectBox
          control={control}
          label="Select your country"
          name="country"
          options={countries}
          placeholder="Сountry"
        />
      </div>

      <ControlledTextArea
        placeholder={'Text-area'}
        name="aboutMe"
        control={control}
        label="About me"
      />

      <Button disabled={!isValid} type={'submit'}>
        Save Changes
      </Button>
    </form>
  )
}
