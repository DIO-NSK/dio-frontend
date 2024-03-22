export type AccessTokenData = {
    sub: string,
    userID: number,
    role: string,
    sessionID: number,
    iat: number,
    exp: number
}

export type Auth = {
    accessToken : string,
    refreshToken : string
}