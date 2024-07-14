import Image from "next/image"
import { RecommendPaginationProps } from "./type"

const RecommendPagination = ({ currentPage, totalPages, onChangePage }: RecommendPaginationProps) => {
    const maxVisiblePages = 12

    let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2))
    const endPage = Math.min(totalPages, startPage + maxVisiblePages - 1)

    if (endPage - startPage + 1 < maxVisiblePages) {
        startPage = Math.max(1, endPage - maxVisiblePages + 1)
    }

    return (
        <div className="flex justify-end items-center pb-10 gap-4">
            <button
                onClick={() => onChangePage("prev")}
                disabled={currentPage === 1}
                className="w-6 h-6 flex items-center pb-[2px] pr-[1px] justify-center"
            >
                <Image src={"/icons/btn_prev.svg"} alt="prev" width={24} height={24} />
            </button>
            <div className="w-[76px] flex justify-center items-center text-GREY-80">
                <span className=" text-BRAND-50 px-2.5">{currentPage}</span> /{" "}
                <span className="px-2.5">{totalPages}</span>
            </div>
            <button
                onClick={() => onChangePage("next")}
                disabled={currentPage === totalPages}
                className="w-6 h-6 flex items-center pb-[2px] pl-[1px] justify-cente"
            >
                <Image src={"/icons/btn_next.svg"} alt="prev" width={24} height={24} />
            </button>
        </div>
    )
}
export default RecommendPagination
