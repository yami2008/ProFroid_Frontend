"use client"

import React, {useEffect, useState} from "react";
import api from "../../../../api";
import Navbar from "@/components/Navbar";

export default function DetailProduit({ params }){

    const [facture, setFacture] = useState({});
    const [numero, setNumero] = useState("");
    const [prix, setPrix] = useState("");

    const [selectedProduitId, setSelectedProduitId] = useState('');
    const [quantite, setQuantite] = useState(1);
    const [produits, setProduits] = useState([]);


    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        api.get('/factures/'+params.id)
            .then(response => {
                setFacture(response.data.data);
                setNumero(response.data.data.numero);
                setPrix(response.data.data.prix);
                console.log(response.data.data);
                // setName(response.data.data.name);
            })
            .catch(error => {
                alert("Error")
                console.log(error.message)
            })
            .finally(() => {});

        api.get('/cold-appliances')
            .then(response => {
                setProduits(response.data.data);
            })
            .catch(error => {
                console.error('Erreur lors du chargement des produits', error);
            });

    }, []);


    // Gestion de l'ajout du produit
    const handleAddProduit = async () => {
        try {
            const response = await api.post(`/factures/${facture._id}/produits`, {
                produitId: selectedProduitId,
                quantite
            });
            alert('Produit ajouté à la facture avec succès !');
            // Mise à jour de l'interface ou autre logique après l'ajout du produit
        } catch (error) {
            console.error('Erreur lors de l\'ajout du produit:', error);
            alert('Erreur lors de l\'ajout du produit');
        }
    };

    const handleUpdateFacture = (e) => {
        e.preventDefault();
        const data = {numero}
        api.put('/factures/' + params.id, data)
            .then(response => {
                alert("La facture a été mise à jour avec succès !");
            })
            .catch(error => {
                alert("Erreur lors de la mise à jour de la facture.");
                console.log(error.message);
            });
    }

    const deleteProductFromFacture = (productid) => {
        if (confirm("Etes cous sure de vouloir supprimer ce produit ?")){
            api.delete(`/factures/${params.id}/produits/${productid}`, facture)
                .then(response => {
                    alert("Produit supprimé de la facture avec succès !");
                    window.location.reload();
                })
                .catch(error => {
                    alert("Erreur lors de la mise à jour de la facture.");
                    console.log(error.message);
                });
        }

    }

    return (
        <>
            <Navbar/>
            <div className="container mt-5">
                <div className="card">
                    <h5 className="card-header">Modifier une facture</h5>
                    <div className="card-body">
                        <form className="row justify-content-center align-content-center">

                            {/* Numéro */}
                            <div className="col-12 col-md-6">
                                <label htmlFor="numero" className="form-label">
                                    Numéro de la facture
                                </label>
                                <input type="text"
                                       value={numero}
                                       onChange={(e) => setNumero(e.target.value)}
                                       required
                                       id="numero"
                                       placeholder="Numéro de la facture"
                                       className={`form-control ${errors?.numero ? 'is-invalid' : ''} ${loading ? 'disabled' : ''}`}
                                       disabled={loading}
                                />
                                { errors?.numero && <div id="numero" className="invalid-feedback">{errors?.numero[0]}</div> }
                            </div>

                            {/* Prix Total */}
                            <div className="col-12 col-md-6">
                                <label htmlFor="prix" className="form-label">
                                    Price Total
                                </label>
                                <input type="text"
                                       value={prix}
                                       onChange={(e) => setPrix(e.target.value)}
                                       required
                                       id="prix"
                                       placeholder="Prix de la facture"
                                       className={`form-control ${errors?.prix ? 'is-invalid' : ''} ${loading ? 'disabled' : ''}`}
                                       disabled={true}
                                />
                                {
                                    errors?.prix &&
                                    <div id="numero" className="invalid-feedback">{errors?.prix[0]}</div>
                                }
                            </div>

                            {/* Liste des produits */}
                            <div className="col-12 col-md-12 text-center mt-5">
                                <table className="table">
                                    <thead>
                                    <tr>
                                        <th scope="col">-</th>
                                        <th scope="col">Nom</th>
                                        <th scope="col">Marque</th>
                                        <th scope="col">Numéro de série</th>
                                        <th scope="col">Prix unitaire</th>
                                        <th scope="col">Quantité</th>
                                        <th scope="col">Prix total</th>
                                        <th scope="col">-</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {
                                        facture?.produits?.length === 0
                                        ?
                                        <tr>
                                            <td colSpan="99">
                                                No Data
                                            </td>
                                        </tr>
                                        :
                                        facture.produits?.map((produit, index) => (
                                            <tr key={produit._id}>
                                                <td>{index+1}</td>
                                                <td>{produit.id.name}</td>
                                                <td>{produit.id.brand}</td>
                                                <td>{produit.id.serial_number}</td>
                                                <td>{produit.id.price}</td>
                                                <td>{produit.quantite}</td>
                                                <td>{produit.id.price * produit.quantite}</td>
                                                <td>
                                                    <button type="button" className="btn btn-outline-danger btn-sm"
                                                            onClick={() => deleteProductFromFacture(produit._id)}>
                                                        Delete
                                                    </button>
                                                </td>
                                            </tr>
                                        ))
                                    }
                                    </tbody>
                                </table>
                            </div>

                            {/* Ajouter un produit à la current facture */}
                            <div>
                                {
                                    <div style={{marginTop: '20px'}} className="row justify-content-center align-items-end">

                                        <div className="form-group col-12 col-md-5">
                                            <label htmlFor="produitSelect">Choisir un produit :</label>
                                            <select id="produitSelect" className="form-control" value={selectedProduitId} onChange={(e) => setSelectedProduitId(e.target.value)}>
                                                <option value="">Sélectionnez un produit</option>
                                                {
                                                    produits.map((produit) => (
                                                        <option key={produit._id} value={produit._id}>
                                                            {produit.name} - {produit.price} DZD
                                                        </option>
                                                    ))
                                                }
                                            </select>
                                        </div>

                                        <div className="form-group col-12 col-md-5">
                                            <label htmlFor="quantiteInput">Quantité :</label>
                                            <input type="number" id="quantiteInput" className="form-control" value={quantite} onChange={(e) => setQuantite(e.target.value)} min="1"/>
                                        </div>

                                        <button onClick={handleAddProduit} className="btn btn-success btn-sm col-12 col-md-2">
                                            Ajouter à la facture
                                        </button>

                                    </div>
                                }
                            </div>

                        </form>
                    </div>
                    <div className="card-footer">
                        <button className="btn btn-success btn-sm" onClick={handleUpdateFacture}>
                            Modifier la facture
                        </button>
                    </div>
                </div>
            </div>
        </>
    )


}