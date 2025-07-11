class AccessTokenHelper {
    static #instance: AccessTokenHelper
    #accessToken: string = ''
    constructor() {
        if (AccessTokenHelper.#instance) {
            return AccessTokenHelper.#instance
        }
    }
    public getAccessToken() {
        return this.#accessToken
    }
    public setAccessToken(token: string) {
        this.#accessToken = token
    }
}

export const accessTokenHelper = new AccessTokenHelper()