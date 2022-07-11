import React from 'react'
import { Link, useLocation ,useNavigate } from 'react-router-dom'

export const Navbar = (props) => {

  let navigate = useNavigate()
  let location = useLocation();
  React.useEffect(() => {
    console.log(location.pathname)
  }, [location]);

  const handleLogout = () => {
    localStorage.removeItem('token')
    navigate("/login")
  }

  return (

    <nav className={`navbar navbar-expand-lg navbar-${props.mode} bg-${props.mode}`}>
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">MyNoteBook</Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className={`nav-link  ${location.pathname === "/" ? "active" : ""}`} aria-current="page" to="/">Home</Link>
            </li>
            <li className="nav-item">
              <Link className={`nav-link  ${location.pathname === "/about" ? "active" : ""}`} to="/about">About</Link>
            </li>

          </ul>
         {!localStorage.getItem("token")? <form className="d-flex">
          <Link className="btn btn-primary mx-2" to="/login"  role="button">Login</Link>
          <Link className="btn btn-primary mx-2" to = "/signup"  role="button">SignUp</Link>
          </form> : <button className="btn btn-primary " onClick = {handleLogout} >Log Out</button>}

          <div className={`form-check form-switch mx-4 text-${props.mode === "light" ? "dark" : "light"}`}  >
                        <input className="form-check-input" aria-checked="false" type="checkbox" role="switch" id="flexSwitchCheckDefault" onClick={props.toggleMode} />
                        <label className="form-check-label" htmlFor="flexSwitchCheckDefault" >{props.mode === "light" ? "Dark" : "Light"} mode</label>
                    </div>

        </div>
      </div>
    </nav>
  )
}
