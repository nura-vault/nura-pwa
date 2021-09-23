import React from 'react';
import Validate from '../../components/Validate';
import rehypeRaw from 'rehype-raw'
import ReactMarkdown from 'react-markdown';
import "./Home.css";
import { Link } from 'react-router-dom';
import isElectron from 'is-electron';

function Home() {

    const [content, setContent] = React.useState('');

    React.useEffect(() => {
        fetch('https://raw.githubusercontent.com/nura-vault/nura-pwa/master/README.md')
            .then((resp) => resp.text())
            .then((text) => setContent(text))
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
        <div className="markdown">
            <br />
            <br />
            <br />
            <ReactMarkdown rehypePlugins={[rehypeRaw]} children={content} />,
        </div>
    </>);
}

export default Home;