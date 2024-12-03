import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../App.css'


const Login = () => {
    const [form,setForm]=useState({
        Username:"",
        Password:"",
    });
    const [loading, setLoading] = useState(false);
    const navigate=useNavigate();
    const handleChange=(e:React.ChangeEvent<HTMLInputElement>)=>{
        setForm({
            ...form,
            [e.target.name]:e.target.value,
        });
    };


    const handleSubmit=async(e:React.FormEvent<HTMLFormElement>)=>{
        e.preventDefault()
        setLoading(true)
    try{
        const response=await fetch('http://localhost:8000/login',{
            method:'POST',
            headers:{
                'Content-Type':"application/json",
            },
            body:JSON.stringify({
                Username:form.Username,
                Password:form.Password,
            }),
        });
        if (response.ok){
            const data =await response.json();
            const token =data.AccessToken;
            if (token){
                localStorage.setItem("token",token);
                console.log("Token received and stored:", token);
                navigate('/home');
            }else{
                alert("Token not recieved");
            }
        }else{
            alert("Invalid Details!!!")
        }
    }catch(error){
        alert(error)
    }finally{
        setLoading(false);
    }
}
  return (
    <>
        <div className="page">
            <h1>Shopping Mall</h1>
            <div className="form">
                <h2>SignIn</h2>
                <form className="data" onSubmit={handleSubmit}>
                    <div className="username">
                        <h3>Username:</h3>
                        <input type='text' name='Username' onChange={handleChange} value={form.Username}/>
                    </div>
                    <div className="pass">
                        <h3>Password:</h3>
                        <input type='password' name="Password" onChange={handleChange} value={form.Password}/>
                    </div>
                    <button id='sub' type='submit'>{loading ? <FontAwesomeIcon icon={faSpinner} spin /> : 'Submit'}</button><br/>
                    <Link id='cp' to='/createpassword'>Forget Password?</Link>
                    <Link id='sp' to='/signup'>Create Account</Link>
                </form>
            </div>
        </div>
    </>
  );
}

export default Login;