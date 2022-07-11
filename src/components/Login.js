import React, { useState } from 'react'
import {useNavigate} from 'react-router-dom'

export const Login = (props) => {

    const [credits, setCredits] = useState({ email: "", password: "" })
    let navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault();

        const response = await fetch(`http://localhost:5000/api/auth/login`, {
            method: 'POST',

            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email: credits.email, password: credits.password })
        });
        const json = await response.json()
        console.log(json)
        if(json.success) {
                localStorage.setItem("token" , json.authToken)
                props.showAlert("Login Successfully" , "success")
                navigate("/")
        }else{
                props.showAlert("Login Failed" , "danger")
              }
    }

    const onChange = (e) => {
        setCredits({ ...credits, [e.target.name]: e.target.value })
    }
    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input type="email" className="form-control" id="email" onChange={onChange} value={credits.email} name="email" aria-describedby="emailHelp" />
                    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" className="form-control" onChange={onChange} value={credits.password} id="password" name="password" />
                </div>

                <button type="submit" className="btn btn-primary" >Submit</button>
            </form>
        </div>
    )
}
