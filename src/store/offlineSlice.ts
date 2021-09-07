import { createSlice, PayloadAction } from "@reduxjs/toolkit"

export type OfflineRequestState = Request[]

interface Request {
    host: string
    data: RequestInit
}

export const initialOfflineRequestState: OfflineRequestState = []

const addRequest = (state: OfflineRequestState, action: PayloadAction<Request>): OfflineRequestState => {
    return [...state, action.payload]
}

const clearRequests = (state: OfflineRequestState): OfflineRequestState => {
    return []
}

export const offlineSlice = createSlice({
    name: 'offline',
    reducers: {
        addRequest,
        clearRequests
    },
    initialState: initialOfflineRequestState
})

export const offline = offlineSlice.actions