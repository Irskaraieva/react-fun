import { Outlet } from "react-router-dom";
import Header from "../components/header";
import Footer from "../components/footer";

const Layout = () => {

    return (
        <section className="hero is-fullheight">
            <Header />
            <div className="hero-body is-flex is-align-items-flex-start">
                <Outlet />
            </div>
            <Footer />
        </section>
    );
}

export default Layout;