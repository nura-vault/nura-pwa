import React from 'react';
import Validate from '../../components/Validate';
import rehypeRaw from 'rehype-raw'
import ReactMarkdown from 'react-markdown';
import "./Home.css";
import { Link } from 'react-router-dom';
import isElectron from 'is-electron';

function Home() {

    const [content, setContent] = React.useState(localStorage.getItem('home-content') || '');

    React.useEffect(() => {
        fetch('https://raw.githubusercontent.com/nura-vault/nura-pwa/master/README.md')
            .then((resp) => resp.text())
            .then((text) => {
                localStorage.setItem('home-content', text);
                setContent(text)
            })
    }, []);

    const Navbar = () => {
        if (isElectron())
            return null;

        return (
            <div className="navbar">
                <Link to="/vault"> Vault </Link>
                <Link to="/logout"> Logout </Link>
            </div>
        );
    }

    return (<>
        <Navbar />
        <div className="markdown">
            <br />
            <br />
            <ReactMarkdown rehypePlugins={[rehypeRaw]} children={content} />,
        </div>
    </>);
}

export default Home;