"use client"

import {useEffect, useState} from "react";
import api from "../../../../api";
import Navbar from "@/components/Navbar";
import {useRouter} from "next/navigation";

export default function DetailProfil({ params }){


    const router = useRouter();

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [first_name, setFirstName] = useState("");
    const [last_name, setLastName] = useState("");
    const [phone_number, setPhoneNumber] = useState("");
    const [address, setAddress] = useState("");

    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        api.get('/users/'+params.id)
            .then( response => {
                setUsername(response.data.data.username);
                setPassword(response.data.data.password);
                setFirstName(response.data.data.first_name);
                setLastName(response.data.data.last_name);
                setPhoneNumber(response.data.data.phone_number);
                setAddress(response.data.data.address);
            })
            .catch(error => {
                alert("Error");
                console.log(error.message);
            })
            .finally(() => {});
    }, []);


    const handleUpdateProfil = (e) => {
        e.preventDefault();
        const updatedData = {username, password, first_name, last_name, phone_number, address};

        // Envoyer la requête PUT/PATCH pour mettre à jour le profil
        api.put('/users/' + params.id, updatedData)
            .then(response => {
                alert("Le profil a été mis à jour avec succès !");
            })
            .catch(error => {
                alert("Erreur lors de la mise à jour du profil.");
                console.log(error.message);
            });
    }


    return (
        <>
            <Navbar/>
            <div className="container mt-5">
                <div className="card">
                    <h5 className="card-header">
                        Modifier l'utilisateur
                    </h5>
                    <div className="card-body">
                        <form className="row justify-content-center align-content-center">

                            {/* First Name */}
                            <div className="col-12 col-md-6 mb-3">
                                <label htmlFor="first_name" className="form-label">
                                    Nom
                                </label>
                                <input
                                    type="text"
                                    id="first_name"
                                    placeholder="Nom"
                                    className={`form-control ${errors?.first_name ? 'is-invalid' : ''} ${loading ? 'disabled' : ''}`}
                                    disabled={loading}
                                    value={first_name}
                                    onChange={(e) => setFirstName(e.target.value)}
                                />
                                {
                                    errors?.first_name &&
                                    <div id="first_name" className="invalid-feedback">
                                        {errors?.first_name[0]}
                                    </div>
                                }
                            </div>

                            {/* Last Name */}
                            <div className="col-12 col-md-6 mb-3">
                                <label htmlFor="last_name" className="form-label">
                                    Prénom
                                </label>
                                <input
                                    type="text"
                                    id="last_name"
                                    placeholder="Prénom"
                                    className={`form-control ${errors?.last_name ? 'is-invalid' : ''} ${loading ? 'disabled' : ''}`}
                                    disabled={loading}
                                    value={last_name}
                                    onChange={(e) => setLastName(e.target.value)}
                                />
                                {
                                    errors?.last_name &&
                                    <div id="first_name" className="invalid-feedback">
                                        {errors?.last_name[0]}
                                    </div>
                                }
                            </div>

                            {/* Numéro de téléphone */}
                            <div className="col-12 col-md-6 mb-3">
                                <label htmlFor="phone_number" className="form-label">
                                    Numéro de téléphone
                                </label>
                                <input
                                    type="text"
                                    id="phone_number"
                                    placeholder="0560606060"
                                    className={`form-control ${errors?.phone_number ? 'is-invalid' : ''} ${loading ? 'disabled' : ''}`}
                                    disabled={loading}
                                    value={phone_number}
                                    onChange={(e) => setPhoneNumber(e.target.value)}
                                />
                                {
                                    errors?.phone_number &&
                                    <div id="phone_number" className="invalid-feedback">
                                        {errors?.phone_number[0]}
                                    </div>
                                }
                            </div>

                            {/* Address */}
                            <div className="col-12 col-md-6 mb-3">
                                <label htmlFor="phone_number" className="form-label">
                                    Adresse
                                </label>
                                <input
                                    type="text"
                                    id="address"
                                    placeholder="Addresse"
                                    className={`form-control ${errors?.address ? 'is-invalid' : ''} ${loading ? 'disabled' : ''}`}
                                    disabled={loading}
                                    value={address}
                                    onChange={(e) => setAddress(e.target.value)}
                                />
                                {
                                    errors?.address &&
                                    <div id="address" className="invalid-feedback">
                                        {errors?.address[0]}
                                    </div>
                                }
                            </div>

                            {/* Username */}
                            <div className="col-12 col-md-6 mt-3 mb-2">
                                <label htmlFor="username" className="form-label">
                                    Username
                                </label>
                                <input
                                    type="text"
                                    id="username"
                                    placeholder="Username"
                                    className={`form-control ${errors?.username ? 'is-invalid' : ''} ${loading ? 'disabled' : ''}`}
                                    disabled={loading}
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                />
                                {
                                    errors?.username &&
                                    <div id="username" className="invalid-feedback">
                                        {errors?.username[0]}
                                    </div>
                                }
                            </div>

                            {/* Password */}
                            <div className="col-12 col-md-6 mt-3 mb-2">
                                <label htmlFor="password" className="form-label">
                                    Password
                                </label>
                                <input
                                    type="password"
                                    id="password"
                                    placeholder="Mot de passe"
                                    className={`form-control ${errors?.password ? 'is-invalid' : ''} ${loading ? 'disabled' : ''}`}
                                    disabled={loading}
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                                {
                                    errors?.password &&
                                    <div id="username" className="invalid-feedback">{errors?.password[0]}</div>
                                }
                            </div>

                        </form>
                    </div>
                    <div className="card-footer">
                        <button className="btn btn-success btn-sm" onClick={handleUpdateProfil}>
                            Modifier l'utilisateur
                        </button>
                    </div>
                </div>
            </div>
        </>
    )
}