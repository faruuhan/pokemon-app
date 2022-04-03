import React from "react";
import Head from "next/head";
import Navbar from "./Navbar";
import Footer from "./Footer";

export default function Layout(props) {
  return (
    <main
      role="main"
      style={{
        background: "linear-gradient(63deg, rgba(205,217,104,1) 0%, rgba(241,235,178,1) 0%, rgba(249,231,153,1) 100%)",
        minHeight: "100vh",
      }}
      className="d-flex flex-column"
    >
      <Head>
        <title>Pokemon Apps</title>
        <meta name="description" content="Pokemon Apps by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navbar />
      {props.children}

      <Footer />
      <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-ka7Sk0Gln4gmtz2MlQnikT1wXgYsOg+OMhuP+IlRH9sENBO0LRn5q+8nbTov4+1p" crossOrigin="anonymous"></script>
    </main>
  );
}
