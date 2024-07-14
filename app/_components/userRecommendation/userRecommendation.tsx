import { getUserInfo } from "@/apis/userApi"
import { useEffect, useState } from "react"
import { Post } from "@/types/post"
import { getPost } from "@/apis/postApi"
import { getCookieToken } from "@/apis/auth/storageUtils"
import { useRecommendPagination } from "@/hook/useRecommendPagination"
import PostList from "./PostList"
import { User } from "@/app/(afterLogin)/user/[userId]/_components/myMap/type"
import RecommendationHeader from "./recommendationHeader"

const UserRecommendation = () => {
    const [userInfo, setUserInfo] = useState<User>()
    const [posts, setPosts] = useState<Post[]>([])
    const postsPerPage = 4

    const {
        currentPage,
        currentItems: currentPosts,
        totalPages,
        onChangePage,
    } = useRecommendPagination({
        items: posts,
        itemsPerPage: postsPerPage,
    })

    const getToken = getCookieToken()

    useEffect(() => {
        const fetchUser = async () => {
            if (getToken) {
                const response = await getUserInfo()
                setUserInfo(response)
            }

            const postResponse = await getPost({
                searchType: "CONTENT",
                sortCondition: "VIEWS",
                searchString: "",
            })
            setPosts(postResponse)
        }
        fetchUser()
    }, [])

    return (
        <div className="w-[1680px] mt-24">
            <RecommendationHeader userInfo={userInfo} getToken={getToken} />
            <PostList
                currentPosts={currentPosts}
                currentPage={currentPage}
                totalPages={totalPages}
                onChangePage={onChangePage}
            />
        </div>
    )
}

export default UserRecommendation