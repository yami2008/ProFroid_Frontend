"use client"

import Navbar from "@/components/Navbar";
import {useEffect, useState} from "react";
import api from "../../../../api";
import Link from "next/link";

export default function ListeDesProduits(){

    const [produits, setProduits] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        api.get('/cold-appliances')
            .then(response => {
                setProduits(response.data.data);
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


    const deleteProduit = (idProduit) => {
        if (confirm("Etes vous sure de vouloir supprimer ce produit ?")){
            api.delete('/cold-appliances/' + idProduit)
                .then(response => {
                    alert("Produit supprimé avec succès !");
                    let tmp = produits.filter(produit => produit._id !== idProduit)
                    console.log(tmp);
                    setProduits(tmp);
                })
                .catch(error => {
                    alert("Erreur lors de la suppression du produit.");
                    console.log(error.message);
                });
        }
    }




    return (
        <>
            <Navbar/>
            <div className="container">
                <div className="row justify-content-center align-items-center">
                    <div className="col-12 col-md-12 text-center">
                        <h1 style={{color: "white"}} className="mt-4">
                            Liste des produits
                        </h1>
                        <Link href="/produits/create" className="btn btn-primary btn-sm mb-4" tag="button">
                            + Ajouter un produit
                        </Link>
                    </div>

                    <div className="col-12 col-md-12 text-center">
                        <table className="table">
                            <caption style={{color: "grey"}}>List of products</caption>
                            <thead className="table-dark">
                            <tr>
                                <th scope="col">#</th>
                                <th scope="col">Name</th>
                                <th scope="col">Brand</th>
                                <th scope="col">Serial Number</th>
                                <th scope="col">Type</th>
                                <th scope="col">Price</th>
                                <th scope="col">-</th>
                            </tr>
                            </thead>
                            <tbody className="table-group-divider">
                            {
                                produits.length === 0
                                ?
                                <tr>
                                    <td colSpan="99">No Data</td>
                                </tr>
                                :
                                produits.map((produit, index) => {
                                    return (
                                        <tr>
                                            <th scope="row">{index + 1}</th>
                                            <td>{produit.name}</td>
                                            <td>{produit.brand}</td>
                                            <td>{produit.serial_number}</td>
                                            <td>{produit.type}</td>
                                            <td>{produit.price}</td>
                                            <td>
                                                <Link className="btn btn-outline-success btn-sm"
                                                      href={"/produits/"+produit._id}>
                                                    Modifier
                                                </Link>
                                                <button type="button" className="btn btn-outline-danger btn-sm" onClick={ () => deleteProduit(produit._id)}>
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