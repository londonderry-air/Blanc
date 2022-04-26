export type PublishStatus = 'publish' 
    | 'draft' 
    | 'comingsoon' 
    | 'expired'

export type ActiveStatus = 'active' 
    | 'inactive'

export type StatusText = {
    local: string,
    global?: string
}