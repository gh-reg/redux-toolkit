import { Outlet } from "react-router-dom";
import Header from "./Header";
import styles from './components.module.scss';

const Layout = () => {
    return (
        <>
            <Header />
            <main className={styles.App}>
                <Outlet />
            </main>
        </>
    );
};

export default Layout;
