import Navbar from "@/components/Navbar";

export default function Dashboard(){
    return (
        <>
            {/* Navbar */}
            <Navbar/>

            {/* Bienvenue  + Les cards */}
            <div className="container">

                {/* Bienvenue */}
                <div className="row justify-content-center align-items-center">
                    <div className="col-12 text-center">
                        <h1 style={{color:"white"}} className="mt-4">Bienvenue</h1>
                    </div>
                </div>

                {/* Card Profils + Card Appareils + Card Factures de vente */}
                <div className="row justify-content-center align-items-center">

                    <div className="col-12 col-md-4 text-center">
                        <div className="card text-bg-primary mb-3">
                            <div className="card-body">
                                <h5 className="card-title">1</h5>
                                <p className="card-text">PROFILS</p>
                            </div>
                        </div>
                    </div>

                    <div className="col-12 col-md-4 text-center">
                        <div className="card text-bg-secondary mb-3">
                            <div className="card-body">
                                <h5 className="card-title">0</h5>
                                <p className="card-text">APPAREILS</p>
                            </div>
                        </div>
                    </div>

                    <div className="col-12 col-md-4 text-center">
                        <div className="card text-bg-dark mb-3">
                            <div className="card-body">
                                <h5 className="card-title">0</h5>
                                <p className="card-text">FACTURE DE VENTE</p>
                            </div>
                        </div>
                    </div>

                </div>
            </div>

        </>
    )
}