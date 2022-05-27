import React from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom';
import styled from 'styled-components';
import { Button, Container, Input, Parent } from '../../components/styled/Formular';
import Alert from 'react-s-alert';
import 'react-s-alert/dist/s-alert-css-effects/slide.css';
import 'react-s-alert/dist/s-alert-default.css';
import { requestResetPassword, resetPassword } from '../../endpoints/Reset';

const LeftPanel = styled.div`
    width: 50%;
    padding: 40px;

    display: flex;
    flex-direction: column;
    flex-wrap: nowrap;
    justify-content: center;
    align-items: center;
    align-content: center;
`

const RightPanel = styled.div`
	width: 50%;
	min-height: 100%;
	overflow: hidden;

    padding: 40px;

    background: #FF416C;
    background: linear-gradient(to right, #FF4B2B, #FF416C);
    background-repeat: no-repeat;
    background-size: cover;
    background-position: 0 0;
`

const Reset: React.FunctionComponent = (props) => {

    const navigate = useNavigate();

    const [searchParams] = useSearchParams();
    const [token] = React.useState<string | null>(searchParams.get("token"))

    const mailRef: React.RefObject<HTMLInputElement> = React.createRef()
    const passwordRef: React.RefObject<HTMLInputElement> = React.createRef()

    const request = () => {
        if (!mailRef.current)
            return

        requestResetPassword(mailRef.current.value, () => {
            Alert.success("Request has been send!", {
                position: 'bottom',
                effect: 'slide',
                timeout: 1500
            });

            setTimeout(() => {
                navigate("/logout")
            }, 1500)
        })
    }

    const reset = () => {
        if (!token || !passwordRef.current || !mailRef.current) return

        resetPassword(token, passwordRef.current.value, mailRef.current.value, () => {
            Alert.success("Password has been successfully reset", {
                position: 'bottom',
                effect: 'slide',
                timeout: 1500
            });

            setTimeout(() => {
                navigate("/logout")
            }, 1500)
        }, (error) => {
            Alert.error(error, {
                position: 'bottom',
                effect: 'slide',
                timeout: 1500
            });
        })
    }

    return <Parent>
        <Container>
            {token ? (<>
                <LeftPanel>
                    <h1>Enter new password:</h1>
                    <Input type="email" placeholder="Email" ref={mailRef} />
                    <Input type="password" placeholder="Password" ref={passwordRef} />
                    <Button onClick={reset}>Reset</Button>
                </LeftPanel>
                <RightPanel>
                    <h1>Want to create a secure password?</h1>
                    <p> Your password is the first obstacle for attackers. Make sure to <b>NOT</b>: </p>
                    <ul>
                        <li> re-use parts of your mail or username </li>
                        <li> use any name at all </li>
                        <li> use dates or existing words </li>
                    </ul>
                    <p>
                        To generate secure passwords for your accounts,
                        it is recommended to use the build-in
                        password generate feature
                    </p>
                </RightPanel>
            </>) : (<>
                <LeftPanel>
                    <h1>Enter your mail:</h1>
                    <Input type="email" placeholder="Email" ref={mailRef} />
                    <Button onClick={request}>Reset</Button>
                </LeftPanel>
                <RightPanel>
                    <h1>Want to reset your password?</h1>
                    <p>
                        In case an account is associated with this mail address, an email will be sent.
                        Make sure to check your mails.
                    </p>
                    <p>
                        If you no longer have access to your email address, contect your administrator.
                    </p>
                    <p>
                        For security reasons you will not be informed whether this mail is connected to an account.
                    </p>
                </RightPanel>
            </>)}
        </Container>
    </Parent>
}

export default Reset;