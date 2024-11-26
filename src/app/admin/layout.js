import Image from 'next/image';
import styles from '@/app/page.module.css';
import { BsTelephone } from "react-icons/bs";
import { MdOutlinePlace } from "react-icons/md";
import { FaRegEnvelope, FaGithub } from "react-icons/fa";
import Link from 'next/link';

export default function Layout({ children }) {
    return (
        <div>
            <header className={styles.header}>
                <Image
                    src={"/ispanaklogo.png"}
                    alt="Ispanak Cafe & Bar"
                    width={250}
                    height={100}
                    priority
                />
            </header>

            <nav className={styles.adminNav}>
                <ul className={styles.navLinks}>

                    <Link className={styles.navLink} href={'/admin/orders'}>
                        <li>
                            TÜM SİPARİŞLER
                        </li>
                    </Link>

                    <Link className={styles.navLink} href={'/admin/add/table'}>
                        <li>
                            MASA EKLE
                        </li>
                    </Link>

                    <Link className={styles.navLink} href={'/admin/categories'}>
                        <li>
                            KATEGORİLER
                        </li>
                    </Link>

                    <Link className={styles.navLink} href={'/admin/add/category'}>
                        <li>
                            KATEGORİ EKLE
                        </li>
                    </Link>

                </ul>
                <br />
                <hr />
                <br />
            </nav>

            {children}

            <footer className={styles.footer}>
                <h4>
                    Ispanak Cafe Bar &copy; 2024
                </h4>
                <br />
                <p>
                    <MdOutlinePlace />
                    <span style={{ paddingLeft: '0.4rem' }}>
                        Katip Mustafa Çelebi Mah. Tel Sk. No: 7 Beyoğlu, İstanbul
                    </span>
                </p>
                <br />
                <p>
                    <BsTelephone />
                    <span style={{ paddingLeft: '0.4rem' }}>
                        (0212) 249 8456
                    </span>
                </p>
                <br />
                <a href='mailto:info@example.com' style={{ textDecoration: 'none', color: 'black' }}>
                    <FaRegEnvelope />
                    <span style={{ paddingLeft: '0.4rem' }}>
                        info@ispanakcafe.com
                    </span>
                </a>
                <br />
                <a href='https://github.com/savashn' style={{ textDecoration: 'none', color: 'black' }}>
                    <FaGithub />
                    <span style={{ paddingLeft: '0.4rem' }}>
                        GitHub
                    </span>
                </a>
            </footer>
        </div >
    )
}