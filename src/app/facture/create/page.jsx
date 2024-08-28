"use client"

import Navbar from "@/components/Navbar";
import {useEffect, useState} from "react";
import api from "../../../../api";

export default function AddProduit(){
    const [numero, setNumero] = useState("");
    const [prix, setPrix] = useState("");
    const [products , setProduct] = useState([]);

    const [selectedProducts, setSelectedProducts] = useState([]);
    // Gérer le changement de la case à cocher
    const handleCheckboxChange = (product) => {
        if (selectedProducts.includes(product)) {
            setSelectedProducts(selectedProducts.filter(p => p !== product));
        } else {
            setSelectedProducts([...selectedProducts, product]);
        }
    };

    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        api.get('/cold-appliances')
            .then(response => {
                setProduct(response.data.data);
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

    const handleAddFacture = async (e) => {
        e.preventDefault();
        console.log(products)
        // if (loading) return ;
        // setLoading(true);
        // const formData = {numero, prix};
        // try {
        //     await api.post('/factures', formData);
        //     alert("Ajouté avec success");
        // }
        // catch (error) {
        //     if (error?.response?.status === 422)
        //         setErrors(error.response.data.errors);
        //     else
        //         setErrors(error?.response?.data);
        // }
        // finally {
        //     setLoading(false);
        // }
    }

    return (
        <>
            <Navbar/>
            <div className="container mt-5">
                <div className="card">
                    <h5 className="card-header">
                        Ajouter une facture
                    </h5>
                    <div className="card-body">
                        <form className="row justify-content-center align-content-center gap-3">

                            {/* Numéro */}
                            <div className="col-12 col-md-6">
                                <label htmlFor="name" className="form-label">
                                    Numéro de la facture
                                </label>
                                <input
                                    type="text"
                                    id="name"
                                    placeholder="Numéro"
                                    className={`form-control ${errors?.numero ? 'is-invalid' : ''} ${loading ? 'disabled' : ''}`}
                                    disabled={loading}
                                    value={numero}
                                    onChange={(e) => setNumero(e.target.value)}
                                />
                                {
                                    errors?.numero &&
                                    <div id="username" className="invalid-feedback">{errors?.numero[0]}</div>
                                }
                            </div>

                            {/* Prix Total */}
                            <div className="col-12 col-md-4">
                                <label htmlFor="price_total" className="form-label">
                                    Prix Total
                                </label>
                                <input
                                    type="text"
                                    id="price_total"
                                    placeholder="Prix Total"
                                    className={`form-control ${errors?.prix ? 'is-invalid' : ''} ${loading ? 'disabled' : ''}`}
                                    disabled={loading}
                                    value={prix}
                                    onChange={(e) => setPrix(e.target.value)}
                                />
                                {
                                    errors?.prix &&
                                    <div id="username" className="invalid-feedback">{errors?.prix[0]}</div>
                                }
                            </div>

                            <ul>
                                {
                                    products.map((product, index) => {
                                        return (
                                            <li style={{
                                                listStyle: "none" ,
                                            }} key={index}>
                                                <input
                                                    type="checkbox"
                                                    checked={selectedProducts.includes(product)}
                                                    onChange={() => handleCheckboxChange(product)}
                                                    style={{
                                                        margin: "15px"
                                                    }}
                                                />
                                                {
                                                    product.name
                                                }
                                            </li>
                                        )
                                    })
                                }
                            </ul>

                        </form>
                    </div>
                    <div className="card-footer">
                        <button className="btn btn-success btn-sm" onClick={handleAddFacture}>
                            Ajouter une facture
                        </button>
                    </div>
                </div>
            </div>
        </>
    )
}