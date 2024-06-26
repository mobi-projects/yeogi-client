import { getCookieToken } from "@/apis/auth/storageUtils"

export const fetchFormAPI = async (api: string, endPoint: string, options: RequestInit) => {
    
    const token = getCookieToken()

    const response = await fetch(`${api}/${endPoint}`, {
        ...options,
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
        credentials: "include",
    })
    if (!response.ok) {
        throw new Error("response not ok")
    }
    return response
}
