import s from './Loader.module.scss'

export const Loader = () => {
  return (
    <div className={s.loaderContainer}>
      <div className={s.spinner}></div>
    </div>
  )
}
