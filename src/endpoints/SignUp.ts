import { SHA256 } from 'crypto-js';
import { config } from '../config';
import { auth } from "../store/authSlice";
import { Dispatch } from "../store/store";

export function signup(dispatch: Dispatch, username: string, mail: string, password: string, success: () => void, error?: (error: string) => void) {
    return fetch(config.host +'/api/signup', {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            'username': username,
            'password': SHA256(password).toString(),
            'mail': mail
        })
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