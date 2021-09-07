import React from 'react'
import Alert from 'react-s-alert';
import { useHistory } from 'react-router-dom';
import { signin } from '../../api/SignIn';
import { signup } from '../../api/SignUp';
import { Form, Input, Button, Parent } from '../../components/styled/Formular';

import { useDispatch } from '../../store/store';

import './Login.css'
import 'react-s-alert/dist/s-alert-default.css';
import 'react-s-alert/dist/s-alert-css-effects/slide.css';

const Login = () => {

    const signInPassword: React.RefObject<HTMLInputElement> = React.createRef();
    const signInMail: React.RefObject<HTMLInputElement> = React.createRef();

    const signUpUsername: React.RefObject<HTMLInputElement> = React.createRef();
    const signUpPassword: React.RefObject<HTMLInputElement> = React.createRef();
    const signUpPasswordRepeat: React.RefObject<HTMLInputElement> = React.createRef();
    const signUpMail: React.RefObject<HTMLInputElement> = React.createRef();

    const dispatch = useDispatch();
    const history = useHistory();

    function singIn() {
        if (!signInMail.current || !signInPassword.current)
            return;

        if (signInMail.current.value === '' || signInPassword.current.value === '') {
            Alert.error('Please fill in all fields', {
                position: 'bottom',
                effect: 'slide'
            });
            return;
        }

        signin(dispatch, signInMail.current.value, signInPassword.current.value, () => {
            history.push("/login/token")
        }, (error) => {
            Alert.error(error, {
                position: 'bottom',
                effect: 'slide',
                timeout: 1500
            });
        })
    }


    function signUp() {
        if (!signUpUsername.current || !signUpMail.current || !signUpPassword.current || !signUpPasswordRepeat.current)
            return;

        if (signUpUsername.current.value === '' || signUpMail.current.value === '' || signUpPassword.current.value === '' || signUpPasswordRepeat.current.value === '') {
            Alert.error('Please fill in all fields', {
                position: 'bottom',
                effect: 'slide'
            });
            return;
        }

        if (signUpPassword.current.value !== signUpPasswordRepeat.current.value) {
            Alert.error("Passwords don't match", {
                position: 'bottom',
                effect: 'slide',
                timeout: 1500
            });
            return;
        }

        signup(dispatch, signUpUsername.current.value, signUpMail.current.value, signUpPassword.current.value, () => {
            history.push("/login/token")
        }, (error) => {
            Alert.error(error, {
                position: 'bottom',
                effect: 'slide',
                timeout: 1500
            });
        })
    }

    React.useEffect(() => {
        const signUpButton = document.getElementById('signUp')
        const signInButton = document.getElementById('signIn')
        const container = document.getElementById('login-container')

        const login = document.querySelector(".sign-in-container")
        const signup = document.querySelector(".sign-up-container")

        signUpButton?.addEventListener('click', () => {
            container?.classList.add("right-panel-active")
            login?.classList.add("hide")
            signup?.classList.remove("hide")
        });

        signInButton?.addEventListener('click', () => {
            container?.classList.remove("right-panel-active")
            login?.classList.remove("hide")
            signup?.classList.add("hide")
        });
    }, [])

    return (
        <Parent>
            <div className="login-container" id="login-container">
                <div className="form-container sign-in-container">
                    <Form>
                        <h1>Sign in</h1>
                        <br />
                        <Input type="email" placeholder="Email" ref={signInMail} />
                        <Input type="password" placeholder="Password" ref={signInPassword} />
                        {/* <a href="#">Forgot your password?</a> */}
                        <br />
                        <Button onClick={singIn}>Sign In</Button>
                    </Form>
                </div>
                <div className="form-container sign-up-container">
                    <Form>
                        <h1>Create Account</h1>
                        <br />
                        <Input type="username" placeholder="Name" ref={signUpUsername} />
                        <Input type="email" placeholder="Email" ref={signUpMail} />
                        <Input type="password" placeholder="Password" ref={signUpPassword} />
                        <Input type="password" placeholder="Repeat Password" ref={signUpPasswordRepeat} />
                        <br />
                        <Button onClick={signUp}>Sign Up</Button>
                    </Form>
                </div>
                <div className="overlay-container">
                    <div className="overlay">
                        <div className="overlay-panel overlay-left">
                            <h1>Welcome Back!</h1>
                            <p>Please login with your personal info</p>
                            <Button className="ghost" id="signIn">Sign In</Button>
                        </div>
                        <div className="overlay-panel overlay-right">
                            <h1>Hello, there!</h1>
                            <p>Enter your personal details to start your journey</p>
                            <Button className="ghost" id="signUp">Sign Up</Button>
                        </div>
                    </div>
                </div>
            </div>
        </Parent>
    );
}

export default Login;