import Link from "next/link";
import {useRouter} from "next/navigation";

export default function Navbar(){

    const router = useRouter();

    const logout = () => {
        localStorage.clear('token');
        router.push('/');
    };






    return (
        <nav className="navbar navbar-expand-lg bg-body-tertiary">
            <div className="container-fluid">
                <a className="navbar-brand">ProFroid</a>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav"
                        aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <Link className="nav-link" aria-current="page" href="/dashboard">
                                Dashboard
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" aria-current="page" href="/users/index">
                                Gestion des profils
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" aria-current="page" href="/produits/index">
                                Gestion des produits
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" aria-current="page" href="/facture/index">
                                Gestion des factures
                            </Link>
                        </li>
                        <li className="nav-item">
                            <button className="nav-link" aria-current="page" onClick={logout}>
                                Deconnexion
                            </button>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    )
}