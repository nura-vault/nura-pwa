import { Button, Input } from "./styled/Formular"
import React from 'react'
import { useNavigate } from "react-router";

interface Props {
    onSuccess: () => void
}

export const WebsiteLock: React.FunctionComponent<Props> = (props) => {

    const [value, setValue] = React.useState<string>()

    return <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'fixed',
        width: '100vw',
        height: '100vh',
        backgroundColor: 'rgb(244, 247, 252)',
        color: 'black'
    }}>
        <div style={{
            boxShadow: 'rgb(60 66 87 / 12%) 0px 7px 14px 0px, rgb(0 0 0 / 12%) 0px 3px 6px 0px',
            borderRadius: '5px',
            padding: '2rem'
        }}>
            <div>
                <h3 style={{ padding: 0, margin: 0 }}> Welcome to nura </h3>
                <br />
                This webpage is a private service and only usable with a password <br />
                provided by an administrator
            </div>
            <div style={{ marginTop: '1rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Input type="password" placeholder="PASSWORD" onChange={(event) => {
                    setValue(event.target.value)
                }} />
                <Button style={{ marginLeft: '1rem', borderRadius: '2px', border: '1px solid black', maxWidth: 'fit-content', backgroundColor: '#212121' }} onClick={() => {
                    if (value !== process.env.REACT_APP_PASSWORD) 
                        return
                    
                    props.onSuccess()
                }}>SUBMIT</Button>
            </div>
        </div>
    </div>
}