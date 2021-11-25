import { SHA256 } from 'crypto-js';
import { config } from '../config';
import { auth } from "../store/authSlice";
import { Dispatch } from "../store/store";
import CryptoJS from "crypto-js"

export function signin(dispatch: Dispatch, mail: string, password: string, success: () => void, error?: (error: string) => void) {
    return fetch(config.host + '/api/signin', {
        method: 'GET',
        headers: {
            'Authorization': CryptoJS.enc.Base64.stringify(
                CryptoJS.enc.Utf8.parse(`${mail}:${SHA256(password).toString()}`)
            ),
        }
    }).then(response => response.json()).then(data => {

        if (data.message) {
            error && error(data.message)
            return
        }

        dispatch(auth.setUsername(data.username))
        dispatch(auth.setAccessToken(data.token))
        dispatch(auth.setMail(mail))

        success()
    })
}