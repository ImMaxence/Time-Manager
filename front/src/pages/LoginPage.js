import { React, useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import SimpleButton from '../components/MainComponents/SimpleButton';
import axios from "axios"
import { UserNameContext } from '../context/UserNameProvider';
import { UserIdContext } from '../context/UserIdProvider';
import { useLocation } from 'react-router-dom';

const LoginPage = () => {

    const location = useLocation();

    useEffect(() => {
        switch (location.pathname) {
            case "/test":
                localStorage.clear()
                break;
            case "/login":
                localStorage.clear()
                break;
        }
    }, [location]);

    const navigate = useNavigate();

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    const { setSelectedUserName } = useContext(UserNameContext);
    const { setSelectedUserId } = useContext(UserIdContext);

    const handleSubmitLogin = async (e) => {

        e.preventDefault();

        if (username.length <= 0 || password.length <= 0) {
            setErrorMessage("Both fields must be completed")
        }

        else {
            await axios.post("http://localhost:4000/api/login", { "username": username, "password": password })
                .then((res) => {

                    setErrorMessage("OK ! Wait...")
                    var data = res.data

                    setSelectedUserId(data.user.id)
                    setSelectedUserName(data.user.username)

                    localStorage.setItem('role', data.user.role);
                    localStorage.setItem('jwt', data.jwt);
                    localStorage.setItem('username', data.user.username)
                    localStorage.setItem('email', data.user.email)
                    localStorage.setItem('id', data.user.id)

                    navigate("/homepage")
                })
                .catch((err) => {
                    console.log(err);
                    setErrorMessage("The password or username is incorrect")
                })
        }


    }

    return (
        <>
            <div className="container_startpage">

                <div className="patern_paper one"></div>
                <div className="patern_paper two"></div>
                <div className="patern_paper three"></div>
                <div className="patern_paper four"></div>
                <div className="patern_paper five"></div>
                <div className="patern_paper six"></div>

                <div className="wrapper_all">

                    <div className="center">
                        <form onSubmit={handleSubmitLogin} className='form_loginpage'>

                            <div className="input_loginpage">
                                <input type="text" name='Username' placeholder='Your username' required autoComplete='username' onChange={(e) => setUsername(e.target.value)} />
                                <i className="fa-solid fa-user"></i>
                            </div>

                            <div className="input_loginpage">
                                <input type="password" name='Password' placeholder='Your password' required autoComplete='new-password' onChange={(e) => setPassword(e.target.value)} />
                                <i className="fa-solid fa-key"></i>
                            </div>

                            <p>{errorMessage}</p>

                            <div className="wrapper_buttons_form">
                                <input type="submit" value="Log In" className='btn btn2' />
                                <SimpleButton text="Back" navigation="/" />
                            </div>

                        </form>
                    </div>
                    <div className="container_right_content_loginpage">
                        <h1>Welcome back !</h1>
                        <h4>Please enter your credentials</h4>
                    </div>
                </div>

            </div>
        </>
    );
};

export default LoginPage;