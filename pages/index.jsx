import React, { useEffect, useState } from "react";
import Layout from "../components/Layout";
import Image from "next/image";
import Link from "next/link";
import "bootstrap/dist/css/bootstrap.min.css";

export default function Home() {
  const [allPokemonList, setAllPokemon] = useState([]);
  const [pageReady, setPageReady] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const res = await fetch("https://pokeapi.co/api/v2/pokemon?limit=150");
    const data = await res.json();

    data.results.forEach((item, index) => {
      item.id = index + 1;
    });

    // console.log(data.results);

    setAllPokemon(data.results);
    setPageReady(true);
  };

  return (
    <Layout>
      <div className="container">
        <h1 className="text-center text-light">Pokemon's</h1>
        <div className="row gap-3 my-5 justify-content-center">
          {pageReady
            ? allPokemonList.map((char) => (
                <div className="card shadow border-0 text-center" style={{ width: "10rem" }} key={char.id}>
                  <p className="text-end fw-bolder">30</p>
                  <div className="card-body">
                    <Link href={`detail/${char.id}`}>
                      <a href="">
                        <Image src={`https://assets.pokemon.com/assets/cms2/img/pokedex/detail/${String(char.id).padStart(3, "0")}.png`} alt="" height={100} width={100} />
                      </a>
                    </Link>
                    <p className="bg-secondary text-light" style={{ borderRadius: "50px" }}>{`#${String(char.id).padStart(3, "0")}`}</p>
                    <b>{char.name[0].toUpperCase() + char.name.slice(1)}</b>
                  </div>
                </div>
              ))
            : "LOADING...."}
        </div>
      </div>
    </Layout>
  );
}
