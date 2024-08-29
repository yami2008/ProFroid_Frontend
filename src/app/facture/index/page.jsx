"use client"

import Navbar from "@/components/Navbar";
import {useEffect, useState} from "react";
import api from "../../../../api";
import Link from "next/link";

export default function ListeDesProduits(){

    const [factures, setFactures] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        api.get('/factures')
            .then(response => {
                setFactures(response.data.data);
                // console.log(response.data.data)
            })
            .catch(error =>{
                alert("Server Error");
                console.log(error.message);
            })
            .finally(() => {
                setLoading(false);
            });
    }, []);




    return (
        <>
            <Navbar/>
            <div className="container">
                <div className="row justify-content-center align-items-center">
                    <div className="col-12 col-md-12 text-center">
                        <h1 style={{color: "white"}} className="mt-4">
                            Liste des factures
                        </h1>
                        <Link href="/facture/create" className="btn btn-primary btn-sm mb-4" tag="button">
                            + Ajouter une facture
                        </Link>
                    </div>

                    <div className="col-12 col-md-12 text-center">
                        <table className="table">
                            <caption style={{color: "grey"}}>List des factures</caption>
                            <thead className="table-dark">
                            <tr>
                                <th scope="col">#</th>
                                <th scope="col">Numéro</th>
                                <th scope="col">Prix Total</th>
                                <th scope="col">-</th>
                            </tr>
                            </thead>
                            <tbody className="table-group-divider">
                            {
                                factures.length === 0
                                ?
                                <tr>
                                    <td colSpan="99">No Data</td>
                                </tr>
                                :
                                factures.map((facture, index) => {
                                    return (
                                        <tr>
                                            <th scope="row">{index + 1}</th>
                                            <td>{facture.numero}</td>
                                            <td>{facture.prix}</td>
                                            <td>
                                                <Link className="btn btn-outline-success btn-sm"
                                                      href={"/factures/"+facture._id}>
                                                    Modifier
                                                </Link>
                                                <button type="button" className="btn btn-outline-danger btn-sm">
                                                    Delete
                                                </button>
                                            </td>
                                        </tr>
                                    );
                                })
                            }
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </>
    )
}