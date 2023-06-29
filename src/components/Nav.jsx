import Link from 'next/link';


import styles from '../styles/Nav.module.css';

const dbDebug = async () => {
    const res = await fetch('/api/dbDebug');

    const data = await res.json();
    console.log(data)
};

export default function Nav({user}) {

    return (
        <nav className={styles.nav}>
            <ul className={styles.list}>
                <li className={styles.item}>
                    <Link href="/">
                        Your votes
                    </Link>
                </li>
                <li>
                    <Link href="/map">
                        Map
                    </Link>
                </li>
            </ul>
            <div>
                {user ? logoutEl(user) : loginEl()}
            </div>
            <button onClick={() => dbDebug()}>DB debug</button>
        </nav>
    );
}

const logoutEl = (user) => {
    return (
        <>
            Welcome {user.name}! <a href="/api/auth/logout">Logout</a>
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