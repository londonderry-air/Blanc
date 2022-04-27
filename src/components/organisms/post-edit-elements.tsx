/* eslint-disable @typescript-eslint/no-explicit-any */
// use 'any' because Prisma.JsonValue can't adopt custom type
// https://github.com/prisma/prisma/issues/3219

import { Post, Prisma } from "@prisma/client"
import { BlancElement } from '$/types/_element'
import { useState } from 'react'
import { PostEditElement } from './post-edit-element'

export const PostEditElements = (props: { post: Post }) => {
  const [render, rerender] = useState(false)

  return (
    <>
      {(props.post.elements as Prisma.JsonArray).map((elm: any) => (
        <PostEditElement
          key={elm.id}
          post={props.post}
          element={elm}
          onDelete={() => {
            props.post.elements = (
              props.post.elements as Prisma.JsonArray
            ).filter(
              (e) =>
                (e as unknown as BlancElement).id !== (elm as BlancElement).id
            )
            rerender(!render)
          }}
        />
      ))}
    </>
  )
}
