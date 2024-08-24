"use client"

import {useEffect, useState} from "react";
import api from "../../../../api";
import Navbar from "@/components/Navbar";

export default function DetailProfil({ params }){

    const [profil, setProfil] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        api.get('/users/'+params.id)
            .then( response => {
                // console.log(response.data.data);
                setProfil(response.data.data);
                setUsername(profil.username);
                setPassword(profil.password);
                console.log(response.data.data);
                // setName(produit.name);
            })
            .catch(error => {
                alert("Error")
                console.log(error.message)
            })
            .finally(() => {});
    }, []);

    const handleUpdateProfil = () => {
        alert("EEEEE");
    }


    return (
        <>
            <Navbar/>
            <div className="container mt-5">
                <div className="card">
                    <h5 className="card-header">Modifier un profil</h5>
                    <div className="card-body">
                        <form className="row justify-content-center align-content-center gap-3">

                            {/* Username */}
                            <div className="col-12 col-md-6">
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
                                    <div id="username" className="invalid-feedback">{errors?.username[0]}</div>
                                }
                            </div>

                            {/* Password */}
                            <div className="col-12 col-md-6">
                                <label htmlFor="password" className="form-label">
                                    Password
                                </label>
                                <input
                                    type="text"
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
                            Modifier le profil
                        </button>
                    </div>
                </div>
            </div>
        </>
    )


}