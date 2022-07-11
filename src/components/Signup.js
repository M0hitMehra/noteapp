import React, { useState } from 'react'
import {useNavigate} from 'react-router-dom'

export const Signup = (props) => {

    const [credits, setCredits] = useState({ email: "", password: "" ,name: "", cpassword :""})
    let navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault();

        const response = await fetch(`http://localhost:5000/api/auth/createuser`, {
            method: 'POST',

            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email: credits.email, password: credits.password , name: credits.name})
        });
        const json = await response.json()
        console.log(json)
        if(json.success) {
                localStorage.setItem("token" , json.authToken)
                navigate("/")
                props.showAlert("Sign Up Successfully" , "success")
        }else{
            props.showAlert("Sign Up Failed" , "danger")        }
    }

    const onChange = (e) => {
        setCredits({ ...credits, [e.target.name]: e.target.value })
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="name" className="form-label">Name</label>
                    <input type="text" className="form-control" id="name" aria-describedby="emailHelp" name="name" required onChange = {onChange} />
                </div>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input type="email" className="form-control" id="email" aria-describedby="emailHelp" name="email" required onChange = {onChange} />
                    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                    <input type="password" className="form-control" id="password" name="password" required minLength={5} onChange = {onChange} />
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputPassword1" className="form-label">Confirm Password</label>
                    <input type="password" className="form-control" id="cpassword" name="cpassword"  required minLength={5} onChange = {onChange}/>
                </div>

                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
    )
}
