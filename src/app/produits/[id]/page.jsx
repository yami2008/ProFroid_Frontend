"use client"

import {useEffect, useState} from "react";
import api from "../../../../api";
import Navbar from "@/components/Navbar";

export default function DetailProduit({ params }){

    const [produit, setProduit] = useState("");
    const [name, setName] = useState("");
    const [brand, setBrand] = useState("");
    const [serial_number, setSerialNumber] = useState("");
    const [type, setType] = useState("");
    const [price, setPrice] = useState("");

    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        api.get('/cold-appliances/'+params.id)
            .then( response => {
                // console.log(response.data.data);
                setProduit(response.data.data);
                console.log(response.data.data);
                // setName(produit.name);
            })
            .catch(error => {
                alert("Error")
                console.log(error.message)
            })
            .finally(() => {

            });
    }, []);

    const handleUpdateProduct = () => {
        alert("EEEEE");
    }


    return (
        <>
            <Navbar/>
            <div className="container mt-5">
                <div className="card">
                    <h5 className="card-header">Modifier un produit</h5>
                    <div className="card-body">
                        <form className="row justify-content-center align-content-center gap-3">

                            {/* Name */}
                            {/*<div className="col-12 col-md-6">*/}
                            {/*    <label htmlFor="name" className="form-label">*/}
                            {/*        Nom de produit*/}
                            {/*    </label>*/}
                            {/*    <input*/}
                            {/*        type="text"*/}
                            {/*        id="name"*/}
                            {/*        placeholder="Nom du produit"*/}
                            {/*        className={`form-control ${errors?.name ? 'is-invalid' : ''} ${loading ? 'disabled' : ''}`}*/}
                            {/*        disabled={loading}*/}
                            {/*        value={name}*/}
                            {/*        onChange={(e) => setName(e.target.value)}*/}
                            {/*    />*/}
                            {/*    {*/}
                            {/*        errors?.name &&*/}
                            {/*        <div id="username" className="invalid-feedback">{errors?.name[0]}</div>*/}
                            {/*    }*/}
                            {/*</div>*/}

                            {/* Brand */}
                            {/*<div className="col-12 col-md-6">*/}
                            {/*    <label htmlFor="brand" className="form-label">*/}
                            {/*        Brand*/}
                            {/*    </label>*/}
                            {/*    <input*/}
                            {/*        type="text"*/}
                            {/*        id="brand"*/}
                            {/*        placeholder="Brand du produit"*/}
                            {/*        className={`form-control ${errors?.brand ? 'is-invalid' : ''} ${loading ? 'disabled' : ''}`}*/}
                            {/*        disabled={loading}*/}
                            {/*        value={brand}*/}
                            {/*        onChange={(e) => setBrand(e.target.value)}*/}
                            {/*    />*/}
                            {/*    {*/}
                            {/*        errors?.brand &&*/}
                            {/*        <div id="username" className="invalid-feedback">{errors?.brand[0]}</div>*/}
                            {/*    }*/}
                            {/*</div>*/}

                            {/* Serial Number */}
                            {/*<div className="col-12 col-md-4">*/}
                            {/*    <label htmlFor="serialNumber" className="form-label">*/}
                            {/*        Numéro de produit*/}
                            {/*    </label>*/}
                            {/*    <input*/}
                            {/*        type="text"*/}
                            {/*        id="serialNumber"*/}
                            {/*        placeholder="N° du produit"*/}
                            {/*        className={`form-control ${errors?.serial_number ? 'is-invalid' : ''} ${loading ? 'disabled' : ''}`}*/}
                            {/*        disabled={loading}*/}
                            {/*        value={serial_number}*/}
                            {/*        onChange={(e) => setSerialNumber(e.target.value)}*/}
                            {/*    />*/}
                            {/*    {*/}
                            {/*        errors?.serial_number &&*/}
                            {/*        <div id="username" className="invalid-feedback">{errors?.serial_number[0]}</div>*/}
                            {/*    }*/}
                            {/*</div>*/}

                            {/* Type */}
                            {/*<div className="col-12 col-md-4">*/}
                            {/*    <label htmlFor="type" className="form-label">*/}
                            {/*        Type de produit*/}
                            {/*    </label>*/}
                            {/*    <input*/}
                            {/*        type="text"*/}
                            {/*        id="type"*/}
                            {/*        placeholder="Type du produit"*/}
                            {/*        className={`form-control ${errors?.type ? 'is-invalid' : ''} ${loading ? 'disabled' : ''}`}*/}
                            {/*        disabled={loading}*/}
                            {/*        value={type}*/}
                            {/*        onChange={(e) => setType(e.target.value)}*/}
                            {/*    />*/}
                            {/*    {*/}
                            {/*        errors?.type &&*/}
                            {/*        <div id="username" className="invalid-feedback">{errors?.type[0]}</div>*/}
                            {/*    }*/}
                            {/*</div>*/}

                            {/* Prix */}
                            {/*<div className="col-12 col-md-4">*/}
                            {/*    <label htmlFor="price" className="form-label">*/}
                            {/*        Prix de produit*/}
                            {/*    </label>*/}
                            {/*    <input*/}
                            {/*        type="text"*/}
                            {/*        id="price"*/}
                            {/*        placeholder="Prix du produit"*/}
                            {/*        className={`form-control ${errors?.price ? 'is-invalid' : ''} ${loading ? 'disabled' : ''}`}*/}
                            {/*        disabled={loading}*/}
                            {/*        value={price}*/}
                            {/*        onChange={(e) => setPrice(e.target.value)}*/}
                            {/*    />*/}
                            {/*    {*/}
                            {/*        errors?.price &&*/}
                            {/*        <div id="username" className="invalid-feedback">{errors?.price[0]}</div>*/}
                            {/*    }*/}
                            {/*</div>*/}

                        </form>
                    </div>
                    <div className="card-footer">
                        <button className="btn btn-success btn-sm" onClick={handleUpdateProduct}>
                            Modifier le produit
                        </button>
                    </div>
                </div>
            </div>
        </>
    )


}