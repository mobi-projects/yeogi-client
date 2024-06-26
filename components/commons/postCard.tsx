import likeIcon from "@/public/icons/like.svg"
import commentIcon from "@/public/icons/comment.svg"
import locationIcon from "@/public/icons/gps.svg"
import Image from "next/image"
import { PostCardProps } from "./type"
import Sample from "@/public/images/sampleThumbnail.svg"
import SampleProfile from "@/public/images/sampleProfile.svg"
import ProtectedLink from "../protectedLink"
import { formatISODateString } from "@/utils/formatDate"

const PostCard = ({
    post_id = 0,
    title,
    likeCount,
    commentCount,
    continent,
    user_nickname,
    user_profile,
    thumbnail,
    created_At,
}: PostCardProps) => {
    return (
        <div className="w-[360px] h-[381px] rounded-[24px] bg-SYSTEM-white overflow-hidden shadow-lg relative">
            <ProtectedLink href={`/detailPost/${post_id}`}>
                {/* 게시글 썸네일 이미지 */}
                <Image
                    width={360}
                    height={244}
                    className="w-[360px] h-[244px] object-cover"
                    src={thumbnail ?? Sample}
                    alt="post thumbnail"
                />
                {/* 유저가 방문한 대륙 표시 */}
                <div className="absolute top-5 left-5 inline-flex gap-[2px] px-[7px] py-1 pl-[5px] items-center justify-start w-auto h-[32px] bg-SYSTEM-white rounded-[8px] shadow-md">
                    <Image src={locationIcon} alt="location_Icon" width={16} height={16} />
                    <p className="text-sm text-BRAND-50">{continent}</p>
                </div>
                {/* 게시일 */}
                <div className="p-5">
                    <div className="font-bold text-sm ">{title}</div>
                    <p className="text-GREY-50 text-sm">게시일 : {formatISODateString(created_At)}</p>
                </div>
                {/* 좋아요 코멘트 */}
                <div className="px-5 flex justify-between items-center ">
                    <div className="bg-SYSTEM-white flex gap-3">
                        <div className="flex items-center gap-[3px]">
                            <Image src={likeIcon} alt="like_Icon" width={16} height={16} />
                            <p className="text-GREY-50 text-xxs">{likeCount} 개</p>
                        </div>
                        <div className="flex gap-[3px]">
                            <Image src={commentIcon} alt="comment_Icon" width={16} height={16} className="w-[16px] h-[16px]" />
                            <p className="text-GREY-50  text-xxs">{commentCount} 개</p>
                        </div>
                    </div>
                    {/* 유저프로필 */}
                    <div className="flex gap-2">
                        <Image
                            src={user_profile ? user_profile : SampleProfile}
                            width={24}
                            height={24}
                            alt="User Profile"
                            className="rounded-[63px]"
                        />
                        <p className="text-SYSTEM-black text-xxs">{user_nickname}</p>
                    </div>
                </div>
            </ProtectedLink>
        </div>
    )
}

export default PostCard
