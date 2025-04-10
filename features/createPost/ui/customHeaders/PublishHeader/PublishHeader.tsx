import { usePublishPost } from '@/features/createPost/hooks/usePublishPost'
import { ArrowIosBack, Button } from '@rambo-react/ui-meteors'

import s from '../customHeaders.module.scss'

export const PublishHeader = () => {
  const { goBackHandler, isLoading, publishPostHandler } = usePublishPost()

  return (
    <div className={s.headerContainer}>
      <button className={s.leftButton} onClick={goBackHandler} type={'button'}>
        <ArrowIosBack height={24} width={24} />
      </button>
      <p className={s.title}>Publication</p>
      <Button
        className={s.rightButton}
        disabled={isLoading}
        onClick={publishPostHandler}
        variant={'text'}
      >
        Publish
      </Button>
    </div>
  )
}
