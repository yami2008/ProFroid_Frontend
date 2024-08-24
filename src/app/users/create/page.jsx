"use client"

import Navbar from "@/components/Navbar";
import {useState} from "react";
import api from "../../../../api";

export default function AddProfil(){
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);

    const handleAddProfil = async (e) => {
        e.preventDefault();
        if (loading) return ;
        setLoading(true);
        const formData = {username, password};
        try {
            await api.post('/users', formData);
            alert("Profil ajouté avec success");
        }
        catch (error) {
            if (error?.response?.status === 422)
                setErrors(error.response.data.errors);
            else
                setErrors(error?.response?.data);
        }
        finally {
            setLoading(false);
        }
    }

    return (
        <>
            <Navbar/>
            <div className="container mt-5">
                <div className="card">
                    <h5 className="card-header">Créer un profil</h5>
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
                                    <div id="username" className="invalid-feedback">
                                        {errors?.username[0]}
                                    </div>
                                }
                            </div>

                            {/* Password */}
                            <div className="col-12 col-md-6">
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
                        <button className="btn btn-success btn-sm" onClick={handleAddProfil}>
                            Ajouter un Profil
                        </button>
                    </div>
                </div>
            </div>
        </>
    )
}