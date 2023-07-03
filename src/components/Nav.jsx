import styles from '../styles/Nav.module.css';

export default function Nav({user}) {
    return (
        <nav className={styles.nav}>
            <div>
                {user ? logoutEl(user) : loginEl()}
            </div>
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