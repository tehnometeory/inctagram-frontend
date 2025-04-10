export type PostType = {
  createdAt: string
  description: string
  id: string
  photos: Photo[]
  privateStatus: boolean
  updatedAt: string
  user: {
    username: string
  }
  userId: string
}

export type Photo = {
  createdAt: string
  id: string
  url: string
}
