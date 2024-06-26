import { CreatePost, Post } from "@/utils/type"
import { filterPosts } from "@/utils/filterPosts"
import { getPostProps } from "./type"
import { getDefaultPost } from "@/utils/resetFormData"
import { fetchFormAPI } from "@/utils/fetchFormAPI"

const POST_API_URL = "/posts"

// mockData를 위한 임시 함수, result page 들어갈 때 mockPosts와 함께 삭제 예정
export const fetchSearchResultsAPI = async (samplePosts: Post[], searchKeyword: string): Promise<Post[]> => {
    return filterPosts(samplePosts, searchKeyword)
}

/**
 * @function getPost 게시글 목록을 반환
 * @param {string} params.searchType  검색 타입 (CONTENT, NICKNAME, REGION)
 * @param {string} params.searchString 검색어 (선택 사항)
 * @param {string} params.sortCondition 정렬 조건 (LIKES, VIEWS, RECENT)
 * @param {string} params.theme 게시글의 theme (EATING, HOT_PLACE, REST, SHOPPING, ACTIVITY, SIGHTSEEING, PACKAGE)
 * @returns {Promise<Post[]>} post들의 배열을 반환
 */
export const getPost = async ({ searchType, searchString, sortCondition, theme }: getPostProps): Promise<Post[]> => {
    if (!POST_API_URL) throw new Error("API를 가져오는 URL에 문제가 있어요!🥺")
    const queryParams = new URLSearchParams()
    if (!theme) {
        queryParams.append("postSearchType", searchType.toUpperCase())
        queryParams.append("postSortCondition", sortCondition.toUpperCase())
    } else {
        queryParams.append("postSearchType", searchType.toUpperCase())
        queryParams.append("postSortCondition", sortCondition.toUpperCase())
        queryParams.append("theme", theme.toUpperCase())
    }

    if (searchString) queryParams.append("searchString", searchString)

    const response = await fetchFormAPI(POST_API_URL, `posts?${queryParams.toString()}`, { method: "GET" })
    const data = await response.json()
    return data
}

/**
 * @function postPost 새로운 게시글을 등록
 * @param {Partial<CreatePost>} newPost - 등록할 게시글의 정보 (포스트 객체의 일부 속성만 포함)
 * @returns {Promise<CreatePost>} 등록된 post의 내용을 객체로 반환
 */
export const postPost = async (newPost: Partial<CreatePost>): Promise<CreatePost> => {
    const response = await fetchFormAPI(POST_API_URL, "posts", {
        method: "POST",
        body: JSON.stringify(newPost),
    })

    if (!response.ok) throw new Error("게시글 등록에 실패했어요...🥹")

    try {
        const data = await response.json()
        return data as CreatePost
    } catch {
        return getDefaultPost()
    }
}

/**
 * @function putFreePost free-form으로 작성한 게시글의 수정
 * @param {number} postId 수정할 게시글의 ID
 * @returns {Promise<UpdatePost>} 수정된 post의 내용을 객체로 반환
 */
export const putFreePost = async (postId: number, editedPost: Partial<CreatePost>): Promise<Partial<CreatePost>> => {
    const response = await fetchFormAPI(POST_API_URL, `posts/${postId}`, {
        method: "PUT",
        body: JSON.stringify(editedPost),
    })

    if (!response.ok) throw new Error("free-form 게시글 수정에 실패했어요...🥹")

    // const data = await response.json()
    return {
        title: editedPost.title || "",
        content: editedPost.content || "",
        shortPosts: [],
        tripStartDate: editedPost.tripStartDate || "",
        tripEndDate: editedPost.tripEndDate || "",
        continent: editedPost.continent || "아시아",
        region: editedPost.region || "",
        address: editedPost.address || "",
        theme: editedPost.theme || undefined,
    }
}

/**
 * @function putMemoPost memo-form으로 작성한 게시글의 수정
 * @param {number} postId 수정할 게시글의 ID
 * @returns {Promise<CreatePost>} 수정된 post의 내용을 객체로 반환
 */
export const putMemoPost = async (shortPostId: number, editedPost: Partial<CreatePost>): Promise<CreatePost> => {
    const response = await fetchFormAPI(POST_API_URL, `posts/short-posts/${shortPostId}`, {
        method: "PUT",
        body: JSON.stringify(editedPost),
    })

    if (!response.ok) throw new Error("memo-form 게시글 수정에 실패했어요...🥹")
    const data = await response.json()
    return {
        title: editedPost.title || "",
        content: editedPost.content || "",
        continent: editedPost.continent || "",
        region: editedPost.region || "",
        tripStartDate: editedPost.tripStartDate || "",
        tripEndDate: editedPost.tripEndDate || "",
        modifiedAt: editedPost.modifiedAt || "",
        postId: data.postId,
        author: data.author,
        likeCount: data.likeCount,
        viewCount: data.viewCount,
        createdAt: data.createdAt,
        theme: editedPost.theme || undefined,
        address: editedPost.address || "",
    }
}

/**
 * @function deletePost 특정 id의 게시글을 삭제하는 함수
 * @param {number} postId 삭제할 게시글의 id
 * @returns {Promise<void>}
 */
export const deletePost = async (postId: number): Promise<void> => {
    const response = await fetchFormAPI(POST_API_URL, `posts/${postId}`, { method: "DELETE" })

    if (!response.ok) throw new Error("게시글 삭제를 못했어요...🥹")
}

/**
 * @function getPostDetail 특정 id의 게시글 정보를 가져오는 함수
 * @param {number} postId detail 정보를 가져올 게시글의 id
 * @returns {Promise<Post>} 특정 id의 게시글 객체를 반환
 */
export const getPostDetail = async (postId: number): Promise<CreatePost> => {
    if (!POST_API_URL) {
        throw new Error("api url error")
    }
    const response = await fetchFormAPI(POST_API_URL, `posts/${postId}`, { method: "GET" })

    if (!response.ok) {
        throw new Error("response not ok")
    }
    const data = await response.json()
    return data
}
