"use client"

import { ThemeBanner, ThemeBannerContext } from "@/constants/theme"
import { useSelectionStore } from "@/libs/store"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { ThemeProps } from "./type"

const MainThemeBanner = () => {
    const router = useRouter()
    const { setSelectedTheme } = useSelectionStore()

    const handleClickTheme = (key: string) => {
        router.push(`/search`)
        setSelectedTheme(key as ThemeProps)
    }

    const ThemeEntries = Object.entries(ThemeBanner)
    return (
        <div className="pt-[300px]">
            <div className="w-full flex flex-col justify-center items-center">
                <p className="font-myeongjo text-bg text-GREY-50 py-4">Choose your trip style</p>
                <p className="font-myeongjo text-[44px]">
                    <span className="text-BRAND-50 font-nomal">취향</span>에 맞는 여행 기록을 확인하세요.
                </p>
                <p className="text-bg font-normal pt-6 pb-10">여행 취향을 선택해 필요한 기록들을 확인하세요</p>
            </div>
            <div className="px-4 flex flex-row w-full justify-center items-center py-14">
                <div className="flex flex-row w-[1680px] justify-center items-center gap-5">
                    {ThemeEntries.map(([key, value]) => {
                        const matchContext = ThemeBannerContext.find(context => Object.keys(context)[0] === key)
                        const contextText = matchContext ? matchContext[key] : []
                        return (
                            <div
                                key={key}
                                onClick={() => handleClickTheme(key)}
                                className="group w-[168px] h-[500px] overflow-hidden hover:w-[264px] hover:cursor-pointer transition-all duration-500 rounded-lg relative bg-SYSTEM-black"
                            >
                                <div className="relative w-full h-full">
                                    <Image
                                        src={`/images/${key}.svg`}
                                        alt={key}
                                        layout="fill"
                                        objectFit="cover"
                                        className="rounded-lg opacity-70"
                                    />
                                </div>
                                <div className="w-full h-full absolute top-0 left-0 flex items-center justify-center">
                                    <p className="w-full flex justify-center text-SYSTEM-white text-bg absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 group-hover:top-[30%] transition-all duration-500 ">
                                        {value}
                                    </p>
                                    <div className="w-fit text-SYSTEM-white text-bg opacity-0 group-hover:opacity-100 transition-opacity text-center bottom-0">
                                        {contextText.map((line, index) => (
                                            <p key={index}>{line}</p>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}

export default MainThemeBanner
