"use client"

import Navbar from "@/components/Navbar";
import {useEffect, useState} from "react";
import api from "../../../api";

export default function Dashboard(){

    const [number_profils, setNumberProfils] = useState(0);
    const [number_produits, setNumberProduits] = useState(0);
    const [number_factures, setNumberFactures] = useState(0);

    useEffect(() => {
        api.get('/users')
            .then(response => {
                setNumberProfils(response.data.data.length);
            })
            .catch(error =>{
                alert("Server Error");
                console.log(error.message);
            });
        api.get('/cold-appliances')
            .then(response => {
                setNumberProduits(response.data.data.length);
            })
            .catch(error =>{
                alert("Server Error");
                console.log(error.message);
            });
        api.get('/factures')
            .then(response => {
                setNumberFactures(response.data.data.length);
            })
            .catch(error =>{
                alert("Server Error");
                console.log(error.message);
            });
    }, []);



    return (
        <>
            {/* Navbar */}
            <Navbar/>

            {/* Bienvenue  + Les cards */}
            <div className="container">

                {/* Bienvenue */}
                <div className="row justify-content-center align-items-center">
                    <div className="col-12 text-center">
                        <h1 style={{color:"white"}} className="mt-4">Bienvenue</h1>
                    </div>
                </div>

                {/* Card Profils + Card Appareils + Card Factures de vente */}
                <div className="row justify-content-center align-items-center">

                    <div className="col-12 col-md-4 text-center">
                        <div className="card text-bg-primary mb-3">
                            <div className="card-body">
                                <h5 className="card-title">{ number_profils }</h5>
                                <p className="card-text">PROFILS</p>
                            </div>
                        </div>
                    </div>

                    <div className="col-12 col-md-4 text-center">
                        <div className="card text-bg-secondary mb-3">
                            <div className="card-body">
                                <h5 className="card-title">{ number_produits }</h5>
                                <p className="card-text">APPAREILS</p>
                            </div>
                        </div>
                    </div>

                    <div className="col-12 col-md-4 text-center">
                        <div className="card text-bg-dark mb-3">
                            <div className="card-body">
                                <h5 className="card-title">{ number_factures }</h5>
                                <p className="card-text">FACTURE DE VENTE</p>
                            </div>
                        </div>
                    </div>

                </div>
            </div>

        </>
    )
}