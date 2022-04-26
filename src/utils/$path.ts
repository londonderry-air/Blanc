import type { OptionalQuery as OptionalQuery0 } from '../pages/article'
import type { Query as Query1 } from '../pages/article/entry'

export const pagesPath = {
  article: {
    entry: {
      $url: (url: { query: Query1, hash?: string }) => ({ pathname: '/article/entry' as const, query: url.query, hash: url.hash })
    },
    $url: (url?: { query?: OptionalQuery0, hash?: string }) => ({ pathname: '/article' as const, query: url?.query, hash: url?.hash })
  },
  authenticate: {
    unregistered: {
      $url: (url?: { hash?: string }) => ({ pathname: '/authenticate/unregistered' as const, hash: url?.hash })
    },
    $url: (url?: { hash?: string }) => ({ pathname: '/authenticate' as const, hash: url?.hash })
  },
  content: {
    _slug: (slug: string[]) => ({
      $url: (url?: { hash?: string }) => ({ pathname: '/content/[...slug]' as const, query: { slug }, hash: url?.hash })
    }),
    $url: (url?: { hash?: string }) => ({ pathname: '/content' as const, hash: url?.hash })
  },
  hello: {
    $url: (url?: { hash?: string }) => ({ pathname: '/hello' as const, hash: url?.hash })
  },
  item: {
    _slug: (slug: string[]) => ({
      $url: (url?: { hash?: string }) => ({ pathname: '/item/[...slug]' as const, query: { slug }, hash: url?.hash })
    }),
    $url: (url?: { hash?: string }) => ({ pathname: '/item' as const, hash: url?.hash })
  },
  onbording: {
    $url: (url?: { hash?: string }) => ({ pathname: '/onbording' as const, hash: url?.hash })
  },
  post: {
    edit: {
      _id: (id: string | number) => ({
        $url: (url?: { hash?: string }) => ({ pathname: '/post/edit/[id]' as const, query: { id }, hash: url?.hash })
      })
    },
    $url: (url?: { hash?: string }) => ({ pathname: '/post' as const, hash: url?.hash })
  },
  settings: {
    $url: (url?: { hash?: string }) => ({ pathname: '/settings' as const, hash: url?.hash })
  },
  signin: {
    $url: (url?: { hash?: string }) => ({ pathname: '/signin' as const, hash: url?.hash })
  },
  user: {
    _slug: (slug: string[]) => ({
      $url: (url?: { hash?: string }) => ({ pathname: '/user/[...slug]' as const, query: { slug }, hash: url?.hash })
    }),
    $url: (url?: { hash?: string }) => ({ pathname: '/user' as const, hash: url?.hash })
  },
  welcome: {
    $url: (url?: { hash?: string }) => ({ pathname: '/welcome' as const, hash: url?.hash })
  },
  $url: (url?: { hash?: string }) => ({ pathname: '/' as const, hash: url?.hash })
}

export type PagesPath = typeof pagesPath

export const staticPath = {
  blanc_png: '/blanc.png',
  favicon_png: '/favicon.png',
  image_png: '/image.png',
  moon_png: '/moon.png',
  vercel_svg: '/vercel.svg'
} as const

export type StaticPath = typeof staticPath
