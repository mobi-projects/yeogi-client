export type CommentContentsProps = {
    author: string
    content: string
    date: string
    commentId: number
    likes: number
    initialLiked: boolean
    isReplying?: boolean
    onReplyClick: (commentId: number) => void
    setIsError: (isError: boolean) => void
}

export type LikeToComments = {
    likes: number
    comments: number
}

export type CommentMenuProps = {
    commentId: number
}

export type LikeButtonProps = {
    commentId: number
    initialLikes: number
    initialLiked: boolean
    setIsError: (isError: boolean) => void
    size: number
    textSize: string
}

export type CommentCountProps = {
    size: number
    commentCount: number
    textSize: string
}
