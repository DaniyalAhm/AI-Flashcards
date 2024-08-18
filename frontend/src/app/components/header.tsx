import React from "react";
import Link from "next/link";
import styles from './css_files/header.module.css'; 
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";

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

            <SignedIn>
                <UserButton />
            </SignedIn>
            <SignedOut>
                <Link href={'/sign-in'} className={styles.a}>
                    Login
                </Link>
                <Link href={'/sign-up'} className={styles.a}>
                    Sign up 
                </Link>
            </SignedOut>
           
        </div>
    );
}
