import Link from 'next/link';

import styles from '../styles/Nav.module.css';

const dbDebug = async () => {
            const res = await fetch('/api/dbDebug');

            const data = await res.json();
            console.log(data)
    };

export default function Nav() {
    return (
        <nav className={styles.nav}>
            <ul className={styles.list}>
                <li className={styles.item}>
                    <Link href="/">
                        Home
                    </Link>
                </li>
                <li>
                    <Link href="/map">
                        Map
                    </Link>
                </li>
            </ul>
            <button onClick={()=> dbDebug()}>DB debug</button>
        </nav>
    );
}