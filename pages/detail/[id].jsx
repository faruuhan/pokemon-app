import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout";
import { useRouter } from "next/router";
import Image from "next/image";

import "bootstrap/dist/css/bootstrap.min.css";

export default function Detail() {
  const router = useRouter();
  const { id } = router.query;
  const [detailCharPokemon, setCharPokemon] = useState([]);
  const [typesChar, setTypesChar] = useState([]);
  const [statsChar, setStatsChar] = useState([]);

  const [pageReady, setPageReady] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
    const data = await res.json();

    setCharPokemon(data);
    const dataTypes = data.types.map((rslt) => {
      return rslt.type;
    });
    setTypesChar(dataTypes);
    setStatsChar(data.stats);
    setPageReady(true);
  };

  const type = typesChar.map((res) => {
    return (
      <span className="badge bg-dark me-2" key={res.name}>
        {res.name}
      </span>
    );
  });

  return (
    <Layout>
      <div className="container my-auto">
        <div className="row py-4 justify-content-center">
          {pageReady ? (
            <div className="card shadow border-0 d-flex flex-column" style={{ width: "22rem" }}>
              <img src={`https://assets.pokemon.com/assets/cms2/img/pokedex/full/${String(detailCharPokemon.id).padStart(3, "0")}.png`} alt="" height={150} width={150} className="mx-auto my-4" />
              <div className="card-body">
                <h3 className="card-title text-center">
                  {detailCharPokemon.name[0].toUpperCase() + detailCharPokemon.name.slice(1)} <span className="text-muted">{`#${String(detailCharPokemon.id).padStart(3, "0")}`}</span>
                </h3>
                <div className="d-flex justify-content-center">{type}</div>
                <div className="d-flex flex-wrap text-center gap-4 my-4 justify-content-center">
                  <div className="d-flex flex-column">
                    <strong>{parseFloat(detailCharPokemon.weight * 2.2046).toFixed(0)} lbs</strong>
                    <p>Weight</p>
                  </div>
                  <div className="d-flex flex-column">
                    <strong>{detailCharPokemon.abilities[0].ability.name[0].toUpperCase() + detailCharPokemon.abilities[0].ability.name.slice(1)} </strong>
                    <p>Abilities</p>
                  </div>
                </div>
                <div className="d-flex flex-wrap text-center gap-4 my-4 justify-content-center">
                  <div className="d-flex flex-column flex-wrap">
                    <strong>{statsChar[0].base_stat}</strong>
                    <p>HP</p>
                  </div>
                  <div className="d-flex flex-column flex-wrap">
                    <strong>{statsChar[1].base_stat}</strong>
                    <p>Attack</p>
                  </div>
                  <div className="d-flex flex-column flex-wrap">
                    <strong>{statsChar[2].base_stat}</strong>
                    <p>Defense</p>
                  </div>
                  <div className="d-flex flex-column flex-wrap">
                    <strong>{statsChar[5].base_stat}</strong>
                    <p>Speed</p>
                  </div>
                  <div className="d-flex flex-column flex-wrap">
                    <strong>{statsChar[3].base_stat}</strong>
                    <p>
                      Special <br /> Attack
                    </p>
                  </div>
                  <div className="d-flex flex-column flex-wrap">
                    <strong>{statsChar[4].base_stat}</strong>
                    <p>
                      Special <br />
                      Defense
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            "LOADING...."
          )}
        </div>
      </div>
    </Layout>
  );
}
