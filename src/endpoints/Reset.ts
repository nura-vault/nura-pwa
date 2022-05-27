import { SHA256 } from "crypto-js";
import { config } from "../config";

export function requestResetPassword(mail: string, success?: (message: string) => void) {
    fetch(config.host + '/api/reset/password', {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            'mail': mail
        })
    }).then(result => result.json()).then(data => {
        if (!data.message) return
        success && success(data.message)
    })
}

export function resetPassword(token: string, password: string, mail: string, success?: (message: string) => void, error?: (message: string) => void) {
    fetch(config.host + '/api/reset/password', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            'token': token,
            'mail': mail,
            'password': SHA256(password).toString()
        })
    }).then(response => {
        return {
            json: response.json(),
            code: response.status
        }
    }).then((data: any) => {
        console.log(data)

        const failed: boolean = data.code > 400

        data.json.then((json: any) => {
            if (!failed) success && success(json.message)
            else error && error(json.message)
        })
    })
}