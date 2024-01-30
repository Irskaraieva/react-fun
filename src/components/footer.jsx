import { Link } from "react-router-dom";
const Footer = () => {
    return (
        <>
            <footer className="hero-foot">
                <nav className="tabs">
                    <div className="container">
                        <Link to={'https://github.com/Irskaraieva'} target="_blank" className="footer-link">Created by me</Link>
                    </div>
                </nav>
            </footer>
        </>
    );
}

export default Footer;