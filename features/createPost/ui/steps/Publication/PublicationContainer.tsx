import { useUserProfileByIdQuery } from '@/features'
import { updateDescription } from '@/features/createPost/model'
import { Carousel, DescriptionPost, useAppDispatch, useAppSelector } from '@/shared'
import { useParams } from 'next/navigation'

import s from './PublicationContainer.module.scss'

import { LocationPost } from './LocationPost/LocationPost'

export const PublicationContainer = () => {
  {
    const { description, images } = useAppSelector(state => state.createPost.currentPost)
    const filteredImages = images.map(image => image.filteredImage)
    const { userId } = useParams()
    const { username } = useUserProfileByIdQuery(userId as string, {
      selectFromResult: ({ data }) => ({ username: data?.username }),
    })
    const dispatch = useAppDispatch()

    const handleDescriptionChange = (newDescription: string) => {
      dispatch(updateDescription({ newDescription }))
    }

    return (
      <div className={s.container}>
        <Carousel images={filteredImages} />
        <DescriptionPost
          description={description}
          sendNewPostDescription={handleDescriptionChange}
          showSeparator
          userName={username}
        >
          <LocationPost />
        </DescriptionPost>
      </div>
    )
  }
}
