import { createComment } from "@/apis/commentApi"
import { useState } from "react"
import { CommentProps } from "../type"
import FailModal from "@/components/commons/failModal"

const CreateComment = ({ postId }: CommentProps) => {
    const [content, setContent] = useState<string>("")
    const [isError, setIsError] = useState<boolean>(false)

    const handleSubmit = async () => {
        if (content.trim() === "") {
            alert("댓글을 입력해주세요")
            return
        }

        try {
            await createComment({ content, postId })
            setContent("")
            setIsError(false)
            window.location.reload()
        } catch (error) {
            setIsError(true)
        }
    }

    const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault()
            handleSubmit()
        }
    }

    return (
        <form
            className="w-[1000px] rounded-2xl"
            onSubmit={e => {
                e.preventDefault()
                handleSubmit()
            }}
        >
            <textarea
                className="w-full h-[260px] rounded-2xl pt-[25px] pl-[20px] bg-comment-pattern bg-SYSTEM-bone border-2 border-GREY-80 focus:outline-none "
                placeholder="댓글을 입력해주세요"
                value={content}
                onChange={e => setContent(e.target.value)}
                onKeyDown={handleKeyDown}
            />
            <FailModal
                isOpen={isError}
                setIsOpen={() => setIsError(isError)}
                title="댓글 등록"
                context="댓글이 등록되지 않았어요"
            />
        </form>
    )
}
export default CreateComment
