import NextAuth from "next-auth/next"
import GoogleProvider from "next-auth/providers/google"
import Kakao from "next-auth/providers/kakao"
import Naver from "next-auth/providers/naver"
import { cookies } from "next/headers"

const G_REST_API_KEY = process.env.GOOGLE_CLIENT_ID
const G_CLIENT_SECRET_KEY = process.env.GOOGLE_CLIENT_SECRET
const K_REST_API_KEY = process.env.KAKAO_CLIENT_ID
const K_CLIENT_SECRET_KEY = process.env.KAKAO_CLIENT_SECRET
const N_REST_API_KEY = process.env.NAVER_CLIENT_ID
const N_CLIENT_SECRET_KEY = process.env.NAVER_CLIENT_SECRET
const AUTH_API_URL = process.env.NEXT_PUBLIC_BASE_URL
const handler = NextAuth({
    debug: true,
    secret: process.env.NEXTAUTH_SECRET,
    providers: [
        GoogleProvider({
            clientId: G_REST_API_KEY || "",
            clientSecret: G_CLIENT_SECRET_KEY || "",
        }),
        Kakao({
            clientId: K_REST_API_KEY || "",
            clientSecret: K_CLIENT_SECRET_KEY || "",
        }),
        Naver({
            clientId: N_REST_API_KEY || "",
            clientSecret: N_CLIENT_SECRET_KEY || "",
        }),
    ],

    session: {
        strategy: "jwt",
        maxAge: 60 * 60 * 24 * 30, //30days
    },
    callbacks: {
        async jwt({ token, account, trigger, session }) {
            if (account) {
                if (account.access_token) {
                    token.accessToken = account.access_token
                    token.provider = account.provider

                    const url = `${AUTH_API_URL}auth/generateToken/${account.provider}?token=${token.accessToken}`
                    const response = await fetch(url, {
                        method: "GET",
                        headers: {
                            "Content-Type": "application/json",
                        },
                    })

                    if (response.ok) {
                        const data = await response.json()
                        if (data.token) {
                            token.accessToken = data.token.accessToken // 백엔드에서 받은 토큰 저장
                            token.refreshToken = data.token.refreshToken // 리프레시 토큰이 있다면 저장
                        }
                        cookies().set("my-first-login", data.isFirst)
                        cookies().set("memberId", data.memberId)
                        token.data = JSON.stringify(data)
                    }
                }
            }
            // trigger 옵션이 업데이트인경우 서버의 세션정보를 업데이트할수있음
            if (trigger === "update" && session !== null) {
                const { name, imgUrl } = session
                token.name = name
                token.picture = imgUrl
            }
            return token
        },

        async session({ session, token }) {
            session.accessToken = token.accessToken
            return session
        },
    },
    cookies: {
        sessionToken: {
            name: `session-token`,
            options: {
                // httpOnly: true, //자바스크립트를 통한 쿠키 접근을 방지,클라이언트쪽에서 쿠키 토큰 접근 불가
                sameSite: "lax", //CSRF 공격을 방지하고 일부 크로스 사이트 요청을 허용
                path: "/", //쿠키가 전체 사이트에서 유효하도록 설정
                secure: process.env.NODE_ENV === "production",
                maxAge: 60 * 60 * 24 * 30, //30일
            },
        },
    },
})

export { handler as GET, handler as POST }
