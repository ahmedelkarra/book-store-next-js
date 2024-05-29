"use client"
import Image from "next/image";
import bookImg from '../public/book.jpeg'
import styles from '../style/mainPage.module.css'
import { ReactTyped } from "react-typed";

function MainPage() {
    return (
        <div style={{ position: 'relative', width: '100%', height: '100vh' }}>
            <div className={styles.heroImage}></div>
            <Image src={bookImg} alt="Books Photo" fill className={styles.Image} />
            <h2 className={styles.mainText}>WELCOME</h2>
            <h2 className={styles.textEffect}>
                <ReactTyped
                    strings={["BOOK STORE", "Explosive Books"]}
                    typeSpeed={100}
                    loop
                    backSpeed={40}
                    cursorChar=""
                    showCursor={true}
                />
            </h2>
        </div>
    );
}
export default MainPage;