import isElectron from 'is-electron';
import React from 'react';
import ReactMarkdown from 'react-markdown';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import rehypeRaw from 'rehype-raw';
import Validate from '../../components/Validate';
import "./Home.css";

function Home() {

    const [content, setContent] = React.useState(localStorage.getItem("readme") || '');
    const navigate = useNavigate();

    React.useEffect(() => {
        if (localStorage.getItem("state")) {
            if (sessionStorage.getItem("session_time"))
                return;

            navigate("/vault")
            sessionStorage.setItem("session_time", Date());
        }

        fetch('https://raw.githubusercontent.com/nura-vault/nura-pwa/master/README.md')
            .then((resp) => resp.text())
            .then((text) => {
                localStorage.setItem("readme", text);
                setContent(text);
            })
    }, []);

    const Navbar = () => {
        if (isElectron())
            return null;

        return (
            <div className="navbar">
                <Link to="/vault"> Vault </Link>

                <Validate
                    localStore={'state'}
                    inverted={true}
                >
                    <Link to="/logout"> Logout </Link>
                </Validate>
                <Validate
                    localStore={'state'}
                >
                    <Link to="/login"> Login </Link>
                </Validate>
            </div>
        );
    }

    return (<>
        <Navbar />
        <div style={{
            display: 'flex',
            justifyContent: 'center',
            paddingTop: '50px'
        }}>
            <div className="markdown" data-aos="fade-up">
                <ReactMarkdown rehypePlugins={[rehypeRaw]} children={content} />,
            </div>
        </div>
    </>);
}

export default Home;
