import { Link } from "react-router-dom";
const Footer = () => {
    return (
        <>
            <footer className="hero-foot">
                <nav className="tabs">
                    <div className="container has-text-centered py-3 mb-1">
                        <Link to={'https://github.com/Irskaraieva'} target="_blank" className="login-link has-text-grey-dark">Created by me</Link>
                    </div>
                </nav>
            </footer>
        </>
    );
}

export default Footer;