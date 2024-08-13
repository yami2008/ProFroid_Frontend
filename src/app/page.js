"use client"

import {useState} from "react";

export default function Home() {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = () => {



    }



  return (
      <div className="container">
        <div className="row justify-content-center align-items-center">
          <div className="col-12 col-md-4" style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform : "translate(-50%, -50%)"
          }}>
              <div className="card" style={{backgroundColor : "rgba(255,255,255,0.7)",}}>

                  {/* Titre */}
                  <div className="card-header d-flex justify-content-start align-items-center gap-1">
                      <span>PRO FROID</span>
                  </div>

                  {/* Form */}
                  <div className="card-body">
                      <div className="row">
                          {/* Username */}
                          <div className="mb-3 col-12">
                              <label htmlFor="uername" className="form-label">
                                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-user">
                                      <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/>
                                      <circle cx="12" cy="7" r="4"/>
                                  </svg>
                                  Username
                              </label>
                              <input type="text"
                                     className="form-control"
                                     id="uername"
                                     placeholder="Username"
                                     value={username}
                                     onChange={(e) => setUsername(e.target.value)}
                              />
                          </div>
                          {/* Password */}
                          <div className="mb-3 col-12">
                              <label htmlFor="password" className="form-label">
                                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-key-round">
                                      <path d="M2.586 17.414A2 2 0 0 0 2 18.828V21a1 1 0 0 0 1 1h3a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h1a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h.172a2 2 0 0 0 1.414-.586l.814-.814a6.5 6.5 0 1 0-4-4z"/>
                                      <circle cx="16.5" cy="7.5" r=".5" fill="currentColor"/>
                                  </svg>
                                  &nbsp;Mot de passe
                              </label>
                              <input type="password"
                                     className="form-control"
                                     id="password"
                                     placeholder="Password"
                                     value={password}
                                     onChange={(e) => setPassword(e.target.value)}
                              />
                          </div>
                      </div>
                  </div>

                  {/* Button Login */}
                  <div className="card-footer text-body-secondary">
                      <button type="button" className="btn btn-primary gap-1" onClick={handleLogin}>
                          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-log-in">
                              <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4"/>
                              <polyline points="10 17 15 12 10 7"/>
                              <line x1="15" x2="3" y1="12" y2="12"/>
                          </svg>
                          Log In
                      </button>
                  </div>

              </div>
          </div>
        </div>
      </div>
  );
}
