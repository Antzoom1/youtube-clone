"use client";

import Image from "next/image";
import styles from "./navbar.module.css";
import Link from "next/link";
import SignIn from "./sign-in";
import { onAuthStateChangedHelper } from "../firebase/firebase";
import { useEffect, useState } from "react";
import { onAuthStateChanged } from "@firebase/auth";
import { User } from "firebase/auth";
import Upload from "./upload";

export default function Navbar() {
  // Init user State
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChangedHelper((user) => {
      setUser(user);
    });
    // Cleanup subscription
    return () => unsubscribe();
  });

  return (
    <nav className={styles.nav}>
      <Link href="/">
        <Image
          width={90}
          height={20}
          src="/youtube-logo.svg"
          alt="YouTube Logo"
        />
      </Link>
      {user && <Upload />}
      <SignIn user={user} />
    </nav>
  );
}
