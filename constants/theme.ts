export const Theme: ThemeType = {
    REST: "휴식",
    HOT_PLACE: "핫 플레이스",
    PACKAGE: "패키지",
    SHOPPING: "쇼핑",
    EATING: "맛집",
    SIGHTSEEING: "관광",
    ACTIVITY: "액티비티",
} as const

export const ThemeBanner: ThemeType = {
    REST: "휴식",
    HOT_PLACE: "인기명소",
    PACKAGE: "패키지",
    SHOPPING: "쇼핑",
    EATING: "맛집",
    SIGHTSEEING: "관광",
    ACTIVITY: "액티비티",
    SUPER_LUXURY: "초호화",
    COST_EFFECTIVENESS: "가성비",
} as const

export type Theme = (typeof Theme)[keyof typeof Theme]

export type ThemeType = {
    [key: string]: string
}

export const ThemeBannerContext: { [key: string]: string[] }[] = [
    { EATING: ["여행은 음식!", "맛집 여행의", "기록을 확인할 수 있어요!"] },
    { HOT_PLACE: ["북적북적한 여행!", "핫플 여행의", "기록을 확인할 수 있어요!"] },
    { REST: ["지친 몸을 풀 쉴수 있는!", "휴양지 여행의", "기록을 확인할 수 있어요!"] },
    { SHOPPING: ["여행할 땐 아끼지 않고!", "쇼핑 여행의", "기록을 확인할 수 있어요!"] },
    { ACTIVITY: ["지루할 틈이 없는!", "액티비티 여행의", "기록을 확인할 수 있어요!"] },
    { SIGHTSEEING: ["여긴 꼭 가아해!", "관광명소 여행의", "기록을 확인할 수 있어요!"] },
    { PACKAGE: ["계획대로 척척!", "패키지 여행의", "기록을 확인할 수 있어요!"] },
    { SUPER_LUXURY: ["고급, 고급, 고급!", "초호화 여행의", "기록을 확인할 수 있어요!"] },
    { COST_EFFECTIVENESS: ["여행도 알뜰하게!", "가성비 여행의", "기록을 확인할 수 있어요!"] },
]
