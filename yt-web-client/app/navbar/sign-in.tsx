'use client';

import { Fragment } from "react";
import styles from './sign-in.module.css'
import { signInWithGoogle, signOut } from "../firebase/firebase";


export default function SignIn() {
    return (
        <Fragment>
            <button className={styles.signin} onClick={signOut}>
                Sign Out
            </button>
            <button className={styles.signin} onClick={signInWithGoogle}>
                Sign In
            </button>
        </Fragment>
    )
}