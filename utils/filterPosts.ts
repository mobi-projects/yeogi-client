/**
 * 주어진 게시글 배열과 검색어를 사용하여 검색 결과를 반환한다
 *
 * @param {Post[]} posts - 검색할 게시글 배열
 * @param {string} searchTerm - 검색어 문자열
 * @returns {Post[]} 필터링된 게시글 배열
 */

import { chosungIncludes } from "es-hangul"
import { Post } from "./type"

export const filterPosts = (posts: Post[], searchTerm: string): Post[] => {
    // if (!searchTerm) return []

    const term = searchTerm.toLowerCase()

    return posts.filter(post => {
        const title = post.title ? post.title.toLowerCase() : ""
        const author = post.author ? post.author.toLowerCase() : ""
        const content = post.content ? post.content.toLowerCase() : ""
        const continent = post.continent ? post.continent.toLowerCase() : ""
        const region = post.region ? post.region.toLowerCase() : ""

        return (
            chosungIncludes(title, term) ||
            chosungIncludes(author, term) ||
            chosungIncludes(content, term) ||
            chosungIncludes(continent, term) ||
            chosungIncludes(region, term) ||
            title.includes(term) ||
            author.includes(term) ||
            content.includes(term) ||
            continent.includes(term) ||
            region.includes(term)
        )
    })
}
