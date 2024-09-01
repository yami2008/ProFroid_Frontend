"use client"

import Navbar from "@/components/Navbar";
import {useEffect, useState} from "react";
import api from "../../../../api";
import {useRouter} from "next/navigation";

export default function AddProduit(){

    const router = useRouter();

    const [produits, setProduits] = useState([]); // Liste des produits disponibles
    const [facture, setFacture] = useState({
        numero: '',
        produits: [] // Liste des produits avec quantité
    });

    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);


    useEffect(() => {
        // Charger la liste des produits depuis le backend
        api.get('/cold-appliances')
            .then(response => {
                setProduits(response.data.data);
            })
            .catch(error => {
                console.error('Erreur lors du chargement des produits', error);
            });
    }, []);

    const handleProduitChange = (index, field, value) => {
        const updatedProduits = [...facture.produits];
        updatedProduits[index] = { ...updatedProduits[index], [field]: value };
        setFacture({ ...facture, produits: updatedProduits });
    };

    const handleAddProduit = () => {
        setFacture({
            ...facture,
            produits: [...facture.produits, { id: '', quantite: 1 }]
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        api.post('/factures', facture)
            .then(response => {
                alert('Facture ajoutée avec succès !');
                router.push('/facture/index');
            })
            .catch(error => {
                alert('Erreur lors de l\'ajout de la facture.');
                console.error(error);
            });
    };







    return (
        <>
            <Navbar/>
            <div className="container mt-5">
                <div className="card">

                    <h5 className="card-header">
                        Ajouter une facture
                    </h5>

                    <div className="card-body">
                        <form className="row justify-content-center align-content-center">

                            {/* Numéro */}
                            <div className="col-12 col-md-6">
                                <label htmlFor="numero" className="form-label">
                                    Numéro de la facture
                                </label>
                                <input type="text"
                                       value={facture.numero}
                                       onChange={(e) => setFacture({...facture, numero: e.target.value})}
                                       required
                                       id="numero"
                                       placeholder="Numéro de la facture"
                                       className={`form-control ${errors?.numero ? 'is-invalid' : ''} ${loading ? 'disabled' : ''}`}
                                       disabled={loading}

                                />
                                {
                                    errors?.numero &&
                                    <div id="numero" className="invalid-feedback">{errors?.numero[0]}</div>
                                }
                            </div>

                            {/* Products */}
                            <div className="col-12 col-md-8 text-center mt-5">
                                <h2>Liste des Produits</h2>
                                {
                                    facture.produits.map((produit, index) => (
                                        <div className="w-50 text-center mx-auto mb-4" key={index}>
                                            <select className="form-select"
                                                    value={produit._id}
                                                    onChange={(e) => handleProduitChange(index, 'id', e.target.value)}
                                                    required>
                                                <option value="">Choisir un produit</option>
                                                {produits.map((p) => (<option key={p._id} value={p._id}>{p.name}</option>))}
                                            </select>

                                            <input type="number"
                                                   value={produit.quantite}
                                                   onChange={(e) => handleProduitChange(index, 'quantite', parseInt(e.target.value))}
                                                   min="1"
                                                   required
                                                   className="form-control"
                                            />
                                        </div>
                                    ))
                                }
                                <button className="btn btn-secondary" type="button" onClick={handleAddProduit}>
                                    Ajouter un produit
                                </button>
                            </div>

                        </form>
                    </div>

                    <div className="card-footer">
                        <button className="btn btn-success btn-sm" onClick={handleSubmit}>
                            Ajouter une facture
                        </button>
                    </div>

                </div>
            </div>


        </>
    )
}