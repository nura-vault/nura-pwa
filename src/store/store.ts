import { configureStore } from "@reduxjs/toolkit";
import {
    TypedUseSelectorHook,
    useDispatch as useReduxDispatch,
    useSelector as useReduxSelector
} from 'react-redux';
import { archiveSlice } from "./archiveSlice";
import { authSlice, AuthState, initialAuthState } from "./authSlice";
import { initialOfflineRequestState, OfflineRequestState, offlineSlice } from "./offlineSlice";
import { initialPasswordListState, PasswordListState, vaultSlice } from "./vaultSlice";

export const store = configureStore({
    devTools: true,
    reducer: {
        auth: authSlice.reducer,
        vault: vaultSlice.reducer,
        archive: archiveSlice.reducer,
        offline: offlineSlice.reducer
    },
    preloadedState: {
        ...loadFromStorage()
    }
})

function loadFromStorage(): { auth: AuthState, vault: PasswordListState, offline: OfflineRequestState, archive: PasswordListState } {
    const item = localStorage.getItem('state')
    if (!item)
        return { auth: initialAuthState, vault: initialPasswordListState, offline: initialOfflineRequestState, archive: initialPasswordListState }
    return JSON.parse(item)
}

store.subscribe(() => {
    localStorage.setItem('state', JSON.stringify(store.getState()))
})

export type Dispatch = typeof store.dispatch
export type State = ReturnType<typeof store.getState>

export const useDispatch = (): Dispatch => useReduxDispatch<Dispatch>()
export const useSelector: TypedUseSelectorHook<State> = useReduxSelector