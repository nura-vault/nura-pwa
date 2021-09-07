import { createSlice, PayloadAction } from "@reduxjs/toolkit"

export interface AuthState {
    username: string
    accessToken: string
    mail: string
    masterToken: string
}

export const initialAuthState: AuthState = {
    username: '',
    accessToken: '',
    mail: '',
    masterToken: ''
}

export const setUsername = (state: AuthState, username: PayloadAction<string>): AuthState => {
    return { ...state, username: username.payload }
}

export const setAccessToken = (state: AuthState, token: PayloadAction<string>): AuthState => {
    return { ...state, accessToken: token.payload }
}

export const setMasterToken = (state: AuthState, masterToken: PayloadAction<string>): AuthState => {
    return { ...state, masterToken: masterToken.payload }
}

export const setMail = (state: AuthState, mail: PayloadAction<string>): AuthState => {
    return { ...state, mail: mail.payload }
}

export const authSlice = createSlice({
    name: 'auth',
    initialState: initialAuthState,
    reducers: {
        setUsername,
        setMasterToken,
        setAccessToken,
        setMail
    }
})

export const auth = authSlice.actions