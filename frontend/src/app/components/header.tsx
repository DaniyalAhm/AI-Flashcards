import React from "react";
import Link from "next/link";
import styles from './css_files/header.module.css'; 

export default function Header() {
    return (
        <div className={styles.header}>
            <h1>
                Quizletter, the Better quizlet app (Don't Sue me)
            </h1>
            <Link href={'/premuim'} className={styles.a}>
                Buy Premium
            </Link>
            <Link href={'/AI'} className={styles.a}>
               Make Flashcards with A.I
            </Link>
            <Link href={'/Browse'} className={styles.a}>
                Browse
            </Link>

            <Link href={'/Sign'} className={styles.a}>
                Sign up or Login
            </Link>
        </div>
    );
}
