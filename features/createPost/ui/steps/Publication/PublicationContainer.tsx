import { useMemo } from 'react'

import { useMyProfileQuery, useUserProfileByIdQuery } from '@/features'
import { updateDescription } from '@/features/createPost/model'
import { Carousel, DescriptionPost, useAppDispatch, useAppSelector } from '@/shared'

import s from './PublicationContainer.module.scss'

import { LocationPost } from './LocationPost/LocationPost'

export const PublicationContainer = () => {
  {
    const { description, images } = useAppSelector(state => state.createPost.currentPost)
    const filteredImages = useMemo(() => images.map(image => image.filteredImage), [images])

    const { data: myProfile } = useMyProfileQuery()

    const { username } = useUserProfileByIdQuery(myProfile?.id ?? '', {
      selectFromResult: ({ data }) => ({ username: data?.username }),
      skip: !myProfile?.id,
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
