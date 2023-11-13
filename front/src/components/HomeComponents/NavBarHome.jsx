import { React, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Modal from '../MainComponents/Modal';
import axios from 'axios';

const EditUserForm = ({ initialUser, onCancel }) => {

    const [user, setUser] = useState(initialUser);

    useEffect(() => {
        setUser(initialUser);
    }, [initialUser]);

    const handleChange = (e) => {
        setUser((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        axios.put(`http://localhost:4000/api/users/${localStorage.getItem('id')}`, { user })
            .then((res) => {
                console.log(res)
                localStorage.setItem('username', user.username)
                localStorage.setItem('email', user.email)
            })
            .catch((err) => {
                console.log(err)
            })

        onCancel()
    };

    return (
        <>
            <h4 className='title_crud_user'>Edit user</h4>
            <form className='form_addnewuser' onSubmit={handleSubmit}>

                <div className="input_loginpage">
                    <input
                        name='username'
                        value={user.username}
                        placeholder="Username"
                        required
                        onChange={handleChange}
                    />
                    <i className="fa-solid fa-user"></i>
                </div>

                <div className="input_loginpage">
                    <input
                        type='email'
                        name='email'
                        value={user.email}
                        placeholder="Email"
                        required
                        autoComplete="email"
                        onChange={handleChange}
                    />
                    <i className="fa-solid fa-envelope"></i>
                </div>

                <div className="input_loginpage">
                    <input
                        type="password"
                        name='password'
                        value={user.password}
                        placeholder="Password"
                        required
                        autoComplete="new-password"
                        onChange={handleChange}
                    />
                    <i className="fa-solid fa-lock"></i>
                </div>

                <div className="wrapper_buttons_form">
                    <input type="submit" value="Edit" className='btn btn2' />
                    <input type="button" value='Cancel' onClick={onCancel} className='btn btn3' />
                </div>

            </form>
        </>
    );
};

const NavBarHome = () => {

    const navigate = useNavigate();
    const [heure, setHeure] = useState(new Date());

    useEffect(() => {
        const interval = setInterval(() => {
            setHeure(new Date());
        }, 1000);

        return () => {
            clearInterval(interval);
        };
    }, []);

    const options = { hour: '2-digit', minute: '2-digit', second: '2-digit' };
    const heureFormattee = heure.toLocaleTimeString('fr-FR', options);

    const optionsJour = { weekday: 'long' };
    const jourFormatte = heure.toLocaleDateString('en-En', optionsJour);

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [contentModal, setContentModal] = useState();

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    const handleModif = () => {
        openModal();

        axios.get(`http://localhost:4000/api/users?email=${localStorage.getItem('email')}&username=${localStorage.getItem('username')}`)
            .then((res) => {

                setContentModal(
                    <EditUserForm
                        initialUser={{ username: res.data.data.username, email: res.data.data.email, password: res.data.data.password, role: res.data.data.role }}
                        onCancel={() => setIsModalOpen(false)}
                    />
                );
            })
            .catch((err) => {
                console.log(err)
            })

    }

    return (
        <>
            <Modal isOpen={isModalOpen} onClose={closeModal}>
                {contentModal}
            </Modal>
            <div className="container_navbar_home">
                <div className="container_right_navbar_home">
                    <div className="container_titleapp">

                        <h2>Time Manager - {jourFormatte} {heureFormattee}</h2>
                    </div>
                </div>

                <div className="burger_menu">
                    <i className="fa-solid fa-bars" onClick={() => {
                        document.getElementsByClassName("left_navbar_responsive")[0].classList.toggle("active");
                    }}></i>
                </div>

                <div className="left_navbar_responsive">

                    <div className="container_text_active active">
                        <h4>{localStorage.getItem('username')}</h4>


                        {
                            localStorage.getItem('role') === 'administrator' ? (
                                <>
                                    <div className="container_image_photo_profil">
                                        <img src="media/image/user.png" alt="profil image" />
                                    </div>
                                </>
                            ) : (
                                <>
                                    <div className="container_image_photo_profil" onClick={handleModif}>
                                        <img src="media/image/user.png" alt="profil image" />
                                        <i className="fa-solid fa-pen-to-square"></i>
                                    </div>
                                </>
                            )
                        }

                    </div>

                    <div className="logout_navbar" onClick={() => {
                        localStorage.clear();
                        navigate("/")
                    }} title="Log Out">
                        <i className="fa-solid fa-right-from-bracket"></i>
                    </div>
                </div>

                <div className="container_left_navbar_home">

                    <div className="container_text_active">
                        <div className="active_user green"></div>
                        <h4>{localStorage.getItem('username')}</h4>
                    </div>

                    {
                        localStorage.getItem('role') === 'administrator' ? (
                            <>
                                <div className="container_image_photo_profil">
                                    <img src="media/image/user.png" alt="profil image" />
                                </div>
                            </>
                        ) : (
                            <>
                                <div className="container_image_photo_profil" onClick={handleModif}>
                                    <img src="media/image/user.png" alt="profil image" />
                                    <i className="fa-solid fa-pen-to-square"></i>
                                </div>
                            </>
                        )
                    }

                    <div className="logout_navbar" onClick={() => {
                        localStorage.clear();
                        navigate("/")
                    }} title="Log Out">
                        <i className="fa-solid fa-right-from-bracket"></i>
                    </div>
                </div>
            </div>
        </>
    );
};

export default NavBarHome;