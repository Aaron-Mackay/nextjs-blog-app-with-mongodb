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