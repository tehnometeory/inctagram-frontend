import s from './UserProfile.module.scss'
export const StatItem = ({ label, value }: { label: string; value: number }) => (
  <span className={s.statistic}>
    {value}
    <br />
    <small className={s.textStatistic}>{label}</small>
  </span>
)
