import { SHA256 } from 'crypto-js';
import { config } from '../config';
import { auth } from "../store/authSlice";
import { Dispatch } from "../store/store";

export function signin(dispatch: Dispatch, mail: string, password: string, success: () => void, error?: (error: string) => void) {
    return fetch(config.host + '/api/signin', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
        },
        body: JSON.stringify({
            'password': SHA256(password).toString(),
            'mail': mail
        })
    }).then(response => response.json()).then(data => {

        if (data.error) {
            error && error(data.error)
            return
        }

        dispatch(auth.setUsername(data.username))
        dispatch(auth.setAccessToken(data.token))
        dispatch(auth.setMail(mail))

        success()
    })
}