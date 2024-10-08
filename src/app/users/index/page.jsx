"use client"

import Navbar from "@/components/Navbar";
import {useEffect, useState} from "react";
import api from "../../../../api";
import Link from "next/link";

export default function ListeDesProfils(){

    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        api.get('/users')
            .then(response => {
                setUsers(response.data.data);
            })
            .catch(error =>{
                alert("Server Error");
                console.log(error.message);
            })
            .finally(() => {
                setLoading(false);
            });
    }, []);

    const deleteUser = (idUser) => {
        if (confirm("Etes vous sure de vouloir supprimer cet utilisateur ?")){
            api.delete('/users/' + idUser)
                .then(response => {
                    alert("Utilisateur supprimé avec succès !");
                    let tmp = users.filter(user => user._id !== idUser)
                    console.log(tmp);
                    setUsers(tmp);
                })
                .catch(error => {
                    alert("Erreur lors de la suppression de l'utilisateur.");
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
                        <h1 style={{color: "white"}} className="mt-4">Liste des profils</h1>
                        <Link href="/users/create" className="btn btn-primary btn-sm mb-4" tag="button">
                            Ajouter un profil
                        </Link>
                    </div>
                    <div className="col-12 col-md-12 text-center">
                        <table className="table">
                            <caption style={{color: "grey"}}>List of users</caption>
                            <thead className="table-dark">
                            <tr>
                                <th scope="col">#</th>
                                <th scope="col">Nom</th>
                                <th scope="col">Username</th>
                                <th scope="col">Password</th>
                                <th scope="col">Tel</th>
                                <th scope="col">Adresse</th>
                                <th scope="col">Actions</th>
                            </tr>
                            </thead>
                            <tbody className="table-group-divider">
                            {
                                users.length === 0
                                ?
                                <tr>
                                    <td colSpan="99">No Data</td>
                                </tr>
                                :
                                users.map((user, index) => {
                                    return (
                                        <tr key={user._id}>
                                            <th scope="row">{index + 1}</th>
                                            <td>
                                                {(user?.first_name === undefined ? '/' : user?.first_name) + ' ' + (user?.last_name === undefined ? '/' : user?.last_name)}
                                            </td>
                                            <td>{user?.username}</td>
                                            <td>{user?.password}</td>
                                            <td>{user?.phone_number === undefined ? '/' : user?.phone_number}</td>
                                            <td>{user?.address === undefined ? '/' : user?.address}</td>
                                            <td>
                                                <Link className="btn btn-outline-success btn-sm"
                                                      href={"/users/"+user._id}>
                                                    Modifier
                                                </Link>
                                                <button type="button" className="btn btn-outline-danger btn-sm"
                                                        onClick={ () => deleteUser(user._id)}>
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