// Project Smart Obit for Malayala Manorama Co LTD
// Developed By Donis Abraham | Billan Jacob John | Afueth Thomas
// Start Date : 2024-10-07

import axios from "axios";
import {useState} from "react";
import {useNavigate} from "react-router-dom";
import {useLocalStorage} from "../../hooks/useLocalStorage.jsx";
import '../../styles/login.css'
import logo from "../../assets/dist/img/logo.png"
import {ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import {API_BASE_URL} from "../../configs/config.jsx";
import bcrypt from "bcryptjs-react";
import {faUser, faLock} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

const Login = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    const {setToken, setUser, setFirstName, setSecondName, setUnit, setBureau, setRole} = useLocalStorage();
    const handleSubmit = async () => {
        try {
            if (username.length === 0) {
                toast("username has left blank!")
            } else if (password.length === 0) {
                toast("password has left blank")
            } else {
                const salt = '$2a$10$D5QdrG2WDMjYXtUHURwXWO';
                const hashedPassword = bcrypt.hashSync(password, salt);
                console.log(hashedPassword)
                const api = API_BASE_URL + "/api/login_action"
                const response = await axios.post(api, {
                    username: username,
                    password: hashedPassword
                });

                if (response.data.message) {
                    toast(response.data.message)
                } else if (response.data.token) {
                    setToken(response.data.token)
                    setUser(response.data.username)
                    setFirstName(response.data.firstname)
                    setSecondName(response.data.secondname)
                    setUnit(response.data.unit)
                    setBureau(response.data.bureau)
                    setRole(response.data.role)
                    toast("Hi " + username + " Welcome to MM Obit")
                    setTimeout(() => {
                        navigate("/dashboard")
                    }, 1500);

                }
            }
        } catch (error) {
            if (error.message === "Network Error") {
                // Handle network error
                toast("Network error. Please check your internal network connection and try again.");
                setTimeout(() => {
                    navigate("/Error")
                }, 2000);
            } else {
                console.error("An error occurred:", error);
                toast("An error occurred while logging in. Please try again later.");
            }
        }

    };

    const handleEnterKey = (e) => {
        if (e.key === 'Enter') {
            if (username.length !== 0 && password.length !== 0) {
                handleSubmit();
            }
        }
    }
    return (
        <div className="containers" id="particles-js">
            <ToastContainer/>
            <div className="forms-container">
                <div className="signin-signup">
                    <form>
                        <div className="avatar"></div>
                        <img src={logo} alt="Avatar" className="avatar"/>
                        <h2 className="title">Smart-Obit </h2>
                        <br/>
                        <h2 className="title">(Reborn)</h2>
                        <div className="msg"></div>
                        <div className="input-field">
                            <FontAwesomeIcon icon={faUser} className="icon"></FontAwesomeIcon>
                            <input type="text" name="username" id="username" placeholder="Username"
                                   onChange={(e) => setUsername(e.target.value)} onKeyDown={handleEnterKey}/>
                        </div>
                        <div className="input-field">
                            <FontAwesomeIcon icon={faLock} className="icon"></FontAwesomeIcon>
                            <input type="password" name="password" id="password" placeholder="Password"
                                   onChange={(e) => setPassword(e.target.value)} onKeyDown={handleEnterKey}/>
                        </div>
                        <input type="button" className="btns solid" name="submit" id="submit" value="Login"
                               onClick={handleSubmit}/>
                    </form>
                </div>
            </div>
        </div>
    );
}
export default Login

