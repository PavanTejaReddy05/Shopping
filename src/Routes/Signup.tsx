import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

const Signup = () => {
    const passwordRef=useRef<HTMLInputElement>(null);
    const confirmPasswordRef=useRef<HTMLInputElement>(null);
    const navigate = useNavigate();

    const [error, setError]=useState<string>('');
    const [formData, setFormData] = useState({
        First_name: '',
        Last_Name: '',
        User_Name: '',
        Phone_Number: '',
        Password: '',
        confirmPassword: '',
      });
      const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            [e.target.name]:e.target.value,
        });
      };

    const handleSubmit=async (e: React.FormEvent<HTMLFormElement>)=>{
        e.preventDefault();
        const {Password, confirmPassword}=formData;

        if(Password!==confirmPassword){
            setError('Password do not match!');
        return;
    }
    setError('');
    try{
        const response=await fetch('http://localhost:8000/register',{
            method:'POST',
            headers:{
                'Content-Type':"application/json",
            },
            body:JSON.stringify({
                First_name:formData.First_name,
                Last_Name:formData.Last_Name,
                User_Name:formData.User_Name,
                Phone_Number:formData.Phone_Number,
                Password:formData.Password
            }),
        });
        if (response.ok){
            alert("Registration Successfull")
            navigate("/");
        }else{
            alert("Registration Failed")
        }
    }catch(error){
        alert(error);
    }
};
  return (
    <>
        <div className="pge">
            <h1>Shopping Mall</h1>
        </div>
        <div className="Sform">
            <h2>SignUp</h2>
            <form className="data" onSubmit={handleSubmit}>
                <div className="name">
                    <div className="fname">
                        <h3>First name:</h3>
                        <input name="First_name" id="ipt" type="text"  onChange={handleChange} />
                    </div>
                    <div className="lname">
                        <h3>Last Name:</h3>
                        <input name="Last_Name" id="ipt" type="text"  onChange={handleChange} />
                    </div>
                </div>
                <div className="userName">
                    <h3>User Name:</h3>
                    <input  name="User_Name" id="ipt" type="text"  onChange={handleChange} />
                </div>
                <div className="PhNo">
                    <h3>Phone Number:</h3>
                    <input name="Phone_Number" id="ipt" type="tel"  onChange={handleChange} />
                </div>
                <div className="Pas">
                    <div className="Password">
                        <h3>Password:</h3>
                        <input name="Password" id="ipt" type="password" ref={passwordRef}  onChange={handleChange} />
                    </div>
                    <div className="CPassword">
                    <h3> Confirm Password:</h3>
                    <input name="confirmPassword" id="ipt" type="password" ref={confirmPasswordRef}  onChange={handleChange} />
                    </div>
                </div>
                {error && <p style={{ color: 'red' }}>{error}</p>} {/* Display error if passwords do not match */}
                <button type="submit">Register</button>
            </form>
        </div>
    </>
  )
}

export default Signup;