import styles from '../styles/Nav.module.css';
import Link from "next/link";
import Image from "next/image";

export default function Nav({user}) {
    return (
        <nav className="navbar navbar-expand-lg fixed-top navbar-light bg-light">
            <div className="container-fluid">
                <a className="navbar-brand" href="#">
                    <Image src="/election.png" height={34} width={40} alt={"US Election logo"}/>
                </a>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse"
                        data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
                        aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className={styles.item}>
                            <Link href="/">
                                Your votes
                            </Link>
                        </li>
                        <li>
                            <Link href="/allvotes">
                                All Votes
                            </Link>
                        </li>
                    </ul>

                </div>
                <form className="d-flex">
                    {user ? logoutEl(user) : loginEl()}
                </form>
            </div>
        </nav>
    );
}

const logoutEl = (user) => {
    return (
        <>
            Welcome {user.name}!&nbsp;<a href="/api/auth/logout">Logout</a>
        </>
    )
}

const loginEl = () => {
    return (
        <>
            <a href="/api/auth/login">Login</a>;
        </>
    )
}