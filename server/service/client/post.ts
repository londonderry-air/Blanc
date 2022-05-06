import { ClientPost } from '$/types/post'
import { Content } from '@prisma/client'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export const getAllPostWithContent = async (
  slug: string
): Promise<ClientPost[]> => {
  const [contentSlug] = slug ? slug.split('/') : ['']
  const content = await prisma.content.findUnique({
    where: {
      slug: contentSlug
    }
  })
  if (!content) {
    return []
  }
  return await findPublishPosts(content)
}

export const getPostFromSlug = async (
  slug: string
): Promise<ClientPost | ClientPost[] | null> => {
  const [contentSlug, postSlug] = slug
    ? slug.split('/')
    : [undefined, undefined]

  const content = await prisma.content.findUnique({
    where: {
      slug: contentSlug
    }
  })

  if (!content) {
    return null
  }

  const now = new Date()
  const posts = await findPublishPosts(content, postSlug)

  if (posts.length === 0) {
    return null
  }

  // without post slug
  if (postSlug === undefined) {
    return posts
  }

  const target = posts[0]

  // if item is not available, related post will be not-released status
  if (target.item !== null) {
    const isItemPublic = target.item.public
    const isItemReleased = target.item.from < now
    const isItemExpired = target.item.to ? target.item.to < now : false

    const isItemAvailable = isItemPublic && isItemReleased && !isItemExpired

    if (!isItemAvailable) {
      return null
    }
  }

  return target
}

const findPublishPosts = async (content?: Content, slug?: string) => {
  const now = new Date()
  const whereQuery: {
    publish: boolean
    content?: Content
    slug?: string
    from: {
      lt: Date
    }
    to: {
      gte: Date
    }
  } = {
    publish: true,
    from: {
      lt: now
    },
    to: {
      gte: now
    }
  }

  if (content) {
    whereQuery.content = content
  }

  if (slug) {
    whereQuery.slug = slug
  }

  const posts = await prisma.post.findMany({
    select: {
      id: true,
      title: true,
      slug: true,
      elements: true,
      created: true,
      updated: true,
      from: true,
      to: true,
      metaTitle: true,
      metaDescription: true,
      metaOgImage: true,
      metaOgImageId: true,
      metaOgType: true,
      metaTwitterCardType: true,
      category: {
        select: {
          id: true,
          name: true
        }
      },
      item: {
        select: {
          id: true,
          name: true,
          created: true,
          updated: true,
          public: true,
          from: true,
          to: true,
          data: true,
          thumbnail: {
            select: {
              id: true,
              name: true,
              url: true,
              size: true,
              width: true,
              height: true,
              created: true,
              updated: true
            }
          }
        }
      }
    },
    where: whereQuery
  })

  return posts
}
