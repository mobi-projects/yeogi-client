import { CreatePost } from "./type"

export const getDefaultPost = (): CreatePost => ({
    postId: 0,
    continent: "",
    region: "",
    author: "",
    title: "",
    content: "",
    likeCount: 0,
    viewCount: 0,
    createdAt: "",
    modifiedAt: "",
    tripEndDate: "",
    tripStartDate: "",
    address: "",
    themeList: [],
})
