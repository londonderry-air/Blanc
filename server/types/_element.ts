import { Post } from "@prisma/client"

export const blancComponents = [
    "common-text",
    "common-quote",
    "common-image",
    "common-code",
    "common-section",
    "common-link",
] as const
export type BlancComponent = typeof blancComponents[number]

export type BlancElement = {
    id: string,
    component: BlancComponent,
    post: Post
    data: any
}








