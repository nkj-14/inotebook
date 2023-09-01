import React, {useState} from "react";
import { useNavigate } from "react-router-dom";

const Login = (props) => {
  let history = useNavigate();
  const host = "http://localhost:3000";
  const [credentials, setcredentials] = useState({email: "", password: ""});
  const handleSubmit = async (e) =>{
    e.preventDefault();
    const response = await fetch(`${host}/api/auth/login`, {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json'
      },
        body: JSON.stringify({email: credentials.email, password: credentials.password})
    });
    const json = await response.json();
    console.log(json)
    if(json.success){
        //Save the auth token and redirect
        localStorage.setItem('token', json.authToken);
        //console.log(localStorage.getItem('token'));
        history("/")
        props.showalert("Logged in successfully", "success")
    }
    else{
      props.showalert("Invalid details", "danger")
    }
  }
  const onChange = (e) => {
    setcredentials({...credentials, [e.target.name]: e.target.value})
  }
  return (
    <div className="mt-2">
      <h2 className="my-3">Login to continue to noteON</h2>
      <form onSubmit={handleSubmit}>
        <div className="my-3">
          <label htmlFor="email" className="form-label">
            Email address
          </label>
          <input
            type="email"
            className="form-control"
            id="email"
            name="email"
            value={credentials.email}
            onChange={onChange}
            aria-describedby="emailHelp"
          />
          <div id="emailHelp" className="form-text">
            We'll never share your email with anyone else.
          </div>
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input
            type="password"
            className="form-control"
            id="password"
            name="password"
            onChange={onChange}
            value={credentials.password}
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
};

export default Login;
