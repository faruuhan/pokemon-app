import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout";
import { useRouter } from "next/router";
import Image from "next/image";
import "bootstrap/dist/css/bootstrap.min.css";

export default function Detail() {
  let nickname = React.createRef();
  const router = useRouter();
  const { id } = router?.query;
  const [detailCharPokemon, setCharPokemon] = useState([]);
  const [typesChar, setTypesChar] = useState([]);
  const [statsChar, setStatsChar] = useState([]);
  const [myPokeList, setMyPokeList] = useState([]);

  const [pageReady, setPageReady] = useState(false);

  useEffect(() => {
    if (router.isReady) {
      fetchData();
    }
  }, [router.isReady]);

  const fetchData = async () => {
    setMyPokeList(JSON.parse(localStorage.getItem("myPokes")));
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);

    if (response.ok) {
      const data = await response.json();
      const dataTypes = data.types.map((rslt) => {
        return rslt.type;
      });
      setCharPokemon(data);
      setTypesChar(dataTypes);
      setStatsChar(data.stats);
      setPageReady(true);
    } else {
      console.log(response.status);
    }
  };

  const type = typesChar.map((res) => {
    return (
      <span className="badge bg-dark me-2" key={res.name}>
        {res.name}
      </span>
    );
  });

  const checkNikname = () => {
    let notif;
    if (!nickname.current.value) {
      notif = "Nickname can`t empty!";
      document.getElementById("submitToMyPoke").disabled = true;
    } else {
      if (!myPokeList) {
        notif = "Good Nickname";
      } else {
        let findData = myPokeList.findIndex((i) => i.nickname.toLowerCase() === nickname.current.value.toLowerCase());
        if (findData != -1) {
          notif = "Already Nickname!";
        } else {
          notif = "Good Nickname";
        }
      }
      document.getElementById("submitToMyPoke").disabled = false;
    }
    document.getElementById("notif").innerHTML = notif;
  };

  const addToMyPoke = (items) => {
    if (myPokeList) {
      myPokeList.push(items);
      localStorage.setItem("myPokes", JSON.stringify(myPokeList));
    } else {
      localStorage.setItem("myPokes", JSON.stringify([items]));
    }
  };

  const modalGetGotcha = () => {
    let notif;
    let bsAlert = new bootstrap.Toast(document.getElementById("liveToast"), {});
    let gotchaSuccessModal = new bootstrap.Modal(document.getElementById("testModal"), {});
    gotchaSuccessModal.show();
    document.getElementById("submitToMyPoke").addEventListener("click", () => {
      if (myPokeList) {
        let findData = myPokeList.findIndex((i) => i.nickname.toLowerCase() === nickname.current.value.toLowerCase());
        if (findData != -1) {
          notif = "Nickname must unique!";
        } else {
          detailCharPokemon.id_collect = Math.floor(Math.random() * 1000 + 1);
          detailCharPokemon.nickname = nickname.current.value;
          addToMyPoke(detailCharPokemon);
          gotchaSuccessModal.hide();
          bsAlert.show();
          notif = "";
        }
      } else {
        detailCharPokemon.id_collect = Math.floor(Math.random() * 1000 + 1);
        detailCharPokemon.nickname = nickname.current.value;
        addToMyPoke(detailCharPokemon);
        gotchaSuccessModal.hide();
        bsAlert.show();
        notif = "";
      }
      document.getElementById("notif").innerHTML = notif;
    });
    document.getElementById("submitToMyPoke").disabled = true;
  };

  const btnGotcha = () => {
    let getGacha = Math.floor(Math.random() * 100 + 1);
    let gotchaProcessingModal = new bootstrap.Modal(document.getElementById("gotchaProcessing"), {});
    let gotchaFailedModal = new bootstrap.Modal(document.getElementById("gotchaFailed"), {});
    setTimeout(() => {
      if (getGacha >= 50) {
        gotchaProcessingModal.hide();
        modalGetGotcha();
      } else {
        gotchaProcessingModal.hide();
        gotchaFailedModal.show();
      }
    }, 2000);
    gotchaProcessingModal.show();
  };

  return (
    <Layout>
      <div className="container my-auto">
        <div className="row py-4">
          {pageReady ? (
            <div className="col-lg-12 d-flex">
              <div className="card shadow border-0 d-flex flex-column mx-auto" style={{ width: "18rem" }}>
                <div className="d-flex mx-auto mt-3">
                  <Image src={`https://assets.pokemon.com/assets/cms2/img/pokedex/full/${String(detailCharPokemon.id).padStart(3, "0")}.png`} alt="" height={150} width={150} />
                </div>
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
                  <div className="d-flex flex-wrap text-center gap-3 my-4 justify-content-center">
                    <div className="d-flex flex-column">
                      <strong>{statsChar[0].base_stat}</strong>
                      <p>HP</p>
                    </div>
                    <div className="d-flex flex-column">
                      <strong>{statsChar[1].base_stat}</strong>
                      <p>Attack</p>
                    </div>
                    <div className="d-flex flex-column">
                      <strong>{statsChar[2].base_stat}</strong>
                      <p>Defense</p>
                    </div>

                    <div className="d-flex flex-column">
                      <strong>{statsChar[3].base_stat}</strong>
                      <p>
                        Special <br /> Attack
                      </p>
                    </div>
                    <div className="d-flex flex-column">
                      <strong>{statsChar[4].base_stat}</strong>
                      <p>
                        Special <br />
                        Defense
                      </p>
                    </div>
                    <div className="d-flex flex-column">
                      <strong>{statsChar[5].base_stat}</strong>
                      <p>Speed</p>
                    </div>
                  </div>
                </div>
                <button className="btn btn-primary rounded-0 rounded-bottom" onClick={() => btnGotcha()}>
                  Gotcha!
                </button>
              </div>
            </div>
          ) : (
            "LOADING...."
          )}
        </div>
      </div>

      <div className="position-fixed bottom-0 end-0 p-3" style={{ zIndex: "11" }}>
        <div id="liveToast" className="toast hide" role="alert" aria-live="assertive" aria-atomic="true">
          <div className="toast-header">
            <strong className="me-auto">Notification</strong>
            <small>Just Now</small>
            <button type="button" className="btn-close" data-bs-dismiss="toast" aria-label="Close"></button>
          </div>
          <div className="toast-body">Success Add Pokemon</div>
        </div>
      </div>

      <div className="modal fade" id="gotchaFailed" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Next Lucky!
              </h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">Whoop, you have chance next time!</div>
          </div>
        </div>
      </div>

      <div className="modal fade" id="testModal" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Gotcha!
              </h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            {pageReady ? (
              <div className="modal-body">
                <div className="d-flex flex-column">
                  <div className="d-flex mx-auto">
                    <Image src={`https://assets.pokemon.com/assets/cms2/img/pokedex/full/${String(detailCharPokemon.id).padStart(3, "0")}.png`} alt="" height={150} width={150} />
                  </div>
                  <h3 className="text-center">
                    {detailCharPokemon.name[0].toUpperCase() + detailCharPokemon.name.slice(1)} <span className="text-muted">{`#${String(detailCharPokemon.id).padStart(3, "0")}`}</span>
                  </h3>
                  <div className="d-flex justify-content-center">{type}</div>
                </div>
                <div className="mb-3">
                  <label htmlFor="nickname" className="col-form-label">
                    Nickname:
                  </label>
                  <input type="text" className="form-control" id="nickname" ref={nickname} onChange={() => checkNikname()} />
                </div>
                <div id="notif"></div>
              </div>
            ) : (
              ""
            )}
            <div className="modal-footer">
              <button type="sumbit" className="btn btn-primary" id="submitToMyPoke">
                Save changes
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="modal fade" id="gotchaProcessing" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
        <div className="modal-dialog modal-sm">
          <div className="modal-content">
            <div className="modal-body">
              <div className="d-flex flex-column align-items-center text-center">
                <div className="spinner-border" role="status">
                  <span className="visually-hidden">Loading...</span>
                </div>
                Gotcha processing, wait few moments
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
