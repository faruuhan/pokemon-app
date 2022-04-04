import React, { useEffect, useState } from "react";
import Layout from "../components/Layout";
import Image from "next/image";
import Link from "next/link";
import "bootstrap/dist/css/bootstrap.min.css";

export default function mypokemons() {
  const [myPokeList, setMyPokeList] = useState([]);
  const [pageReady, setPageReady] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    const data = JSON.parse(localStorage.getItem("myPokes"));
    setMyPokeList(data);
    setPageReady(true);
  };

  const RemoveMyPokemons = (item) => {
    let findItem = myPokeList.findIndex((i) => i.id_collect === item.id_collect);
    if (findItem != -1) {
      console.log(findItem);
      myPokeList.splice(findItem, 1);
      console.log(myPokeList);
      localStorage.removeItem("myPokes");
      localStorage.setItem("myPokes", JSON.stringify(myPokeList));
    }
    fetchData();
  };

  return (
    <Layout>
      <div className="container">
        <h1 className="text-center text-dark">My Pokemon's</h1>
        <div className="row my-5">
          <div className="col-lg-12 d-flex gap-3 justify-content-center">
            {pageReady
              ? myPokeList
                ? myPokeList.map((poke) => (
                    <div className="card shadow border-0 text-center" style={{ width: "10rem" }} key={poke.id_collect}>
                      <div className="card-body">
                        <Link href={`detail/${poke.id}`}>
                          <a href="">
                            <Image src={`https://assets.pokemon.com/assets/cms2/img/pokedex/detail/${String(poke.id).padStart(3, "0")}.png`} alt="" height={100} width={100} />
                          </a>
                        </Link>
                        <p className="bg-secondary text-light" style={{ borderRadius: "50px" }}>{`#${String(poke.id).padStart(3, "0")}`}</p>
                        <b>{poke.name[0].toUpperCase() + poke.name.slice(1)}</b>
                        <p className="fst-italic">{poke.nickname}</p>
                      </div>
                      <button className="btn btn-danger btn-sm border rounded-0 rounded-bottom" onClick={() => RemoveMyPokemons(poke)}>
                        Remove!
                      </button>
                    </div>
                  ))
                : ""
              : ""}
          </div>
        </div>
      </div>
    </Layout>
  );
}
