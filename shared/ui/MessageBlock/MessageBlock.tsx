import styles from '@/app/auth/confirmed-email/ConfirmedEmail.module.scss'

type MessageBlockProps = {
  description: string
  title: string
}

export const MessageBlock = ({ description, title }: MessageBlockProps) => (
  <div>
    <h1 className={styles.title}>{title}</h1>
    <p className={styles.description}>{description}</p>
  </div>
)
