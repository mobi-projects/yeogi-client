import { CountryByContinent } from "@/app/(afterLogin)/createPost/_components/region/type"
import { FloatingIcon } from "@/app/(afterLogin)/detailPost/[postId]/_components/floating/type"
import { UserRequest } from "@/app/auth/_components/signin/type"
import { Continent } from "@/constants/continents"
import { Post, UpdatePost } from "@/types/post"
import { ThemeProps } from "@/types/theme"
import { UseMutationResult } from "@tanstack/react-query"
import { Dispatch, SetStateAction } from "react"

export type CountryProps = {
    countriesByContinent: CountryByContinent
    searchTerm: string
    selectedContinent: Continent
}
export type UserResponse = {
    accessToken: string
    refreshToken: string
}
export type SignInProps = {
    email: string
    password: string
}
export type updateFreeProps = {
    postId: number
    editedFields: Partial<UpdatePost>
}
export type SigninResult = UseMutationResult<UserResponse, Error, UserRequest> & {
    isOpen: boolean
    formState: "success" | "fail" | null
    handleOverlay: (isOpen: boolean, state?: "success" | "fail" | null) => void
}
export type useHandleClickProps = {
    postId?: string
    post?: Post
    setIconState: Dispatch<SetStateAction<FloatingIcon[]>>
}

export type postCommentResponse = {
    id: number
    content: string
    nickname: string
    createdAt: string
    modifiedAt: string
    likeCount: number
    postId: number
}

export type postCommentRequest = {
    content: string
    postId: number
}

export type putCommentResponse = {
    commentId: number
    content: string
    postId: number
}

export type putCommentRequest = {
    commentId: number
    content: string
    postId: number
}
export type useGetPostProps = {
    sortCondition: "LIKES" | "VIEWS" | "RECENT"
    searchKeyword: string
    searchTheme: ThemeProps | ThemeProps[]
}
