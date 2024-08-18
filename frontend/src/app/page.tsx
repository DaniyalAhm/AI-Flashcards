'use client';

import Image from "next/image";
import styles from "./page.module.css";

import Header from './components/header'
import Collection from './components/Collections'
import Router from "next/router";
import { BrowserRouter, Routes, Route } from "react-router-dom";

export default function Home() {
  return (
    <main className={styles.main}>
      
    <BrowserRouter>
    <Header></Header>

<Collection ></Collection>
  
    
    </BrowserRouter>



      </main>

  );
}
