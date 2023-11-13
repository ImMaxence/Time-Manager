import React, { useState, useEffect, useContext } from 'react';
import useSWR from 'swr';
import { user_service } from '../../services/user.service';
import Modal from '../MainComponents/Modal';
import SkeletonUser from '../LoadingComponent/SkeletonUser';
import { UserIdContext } from '../../context/UserIdProvider';
import { UserNameContext } from '../../context/UserNameProvider';


const AddUserForm = ({ onSave, onCancel }) => {

    const [newUser, setNewUser] = useState({ username: '', email: '', password: '', role: '' });

    const handleChange = (e) => {
        setNewUser((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault(); // Empêche le formulaire de se soumettre de manière traditionnelle
        onSave(newUser);
    };

    return (
        <>
            <h4 className='title_crud_user'>Add a new user</h4>
            <form onSubmit={handleSubmit} className='form_addnewuser'>

                <div className="input_loginpage">
                    <input
                        name='username'
                        value={newUser.username}
                        onChange={handleChange}
                        placeholder="Username"
                        required
                    />
                    <i className="fa-solid fa-user"></i>
                </div>

                <div className="input_loginpage">
                    <input
                        type='email'
                        name='email'
                        value={newUser.email}
                        onChange={handleChange}
                        placeholder="Email"
                        required
                        autoComplete="email"
                    />
                    <i className="fa-solid fa-envelope"></i>
                </div>

                <div className="input_loginpage">
                    <input
                        type="password"
                        name='password'
                        value={newUser.password}
                        onChange={handleChange}
                        placeholder="Password"
                        required
                        autoComplete="new-password"
                    />
                    <i className="fa-solid fa-lock"></i>
                </div>

                <select
                    name='role'
                    value={newUser.role}
                    onChange={handleChange}
                    required
                >
                    <option value='' disabled hidden>Select a role</option>
                    <option value='employee'>Employee</option>
                    <option value='administrator'>Administrator</option>
                </select>

                <br />

                <div className="wrapper_buttons_form">
                    <input type="submit" value="Create" className='btn btn2' />
                    <input type="button" onClick={onCancel} value='Cancel' className='btn btn3' />
                </div>

            </form>
        </>
    );
};


const EditUserForm = ({ initialUser, onSave, onCancel }) => {
    const [user, setUser] = useState(initialUser);

    useEffect(() => {
        setUser(initialUser);
    }, [initialUser]);
    console.log("🚀 ~ file: User.jsx:84 ~ EditUserForm ~ initialUser:", initialUser)

    const handleChange = (e) => {
        setUser((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault(); // Empêche le formulaire de se soumettre de manière traditionnelle
        onSave(user);
    };

    return (
        <>
            <h4 className='title_crud_user'>Edit user : {user.username}</h4>
            <form onSubmit={handleSubmit} className='form_addnewuser'>

                <div className="input_loginpage">
                    <input
                        name='username'
                        value={user.username}
                        onChange={handleChange}
                        placeholder="Username"
                        required
                    />
                    <i className="fa-solid fa-user"></i>
                </div>

                <div className="input_loginpage">
                    <input
                        type='email'
                        name='email'
                        value={user.email}
                        onChange={handleChange}
                        placeholder="Email"
                        required
                        autoComplete="email"
                    />
                    <i className="fa-solid fa-envelope"></i>
                </div>

                <div className="input_loginpage">
                    <input
                        type="password"
                        name='password'
                        value={user.password}
                        onChange={handleChange}
                        placeholder="Password"
                        required
                        autoComplete="new-password"
                    />
                    <i className="fa-solid fa-lock"></i>
                </div>

                <select
                    name='role'
                    value={user.role}
                    onChange={handleChange}
                    required
                >
                    <option value='' disabled hidden>Select a role</option>
                    <option value='employee'>Employee</option>
                    <option value='administrator'>Administrator</option>
                </select>

                <br />

                <div className="wrapper_buttons_form">
                    <input type="submit" value="Edit" className='btn btn2' />
                    <input type="button" onClick={onCancel} value='Cancel' className='btn btn3' />
                </div>

            </form>
        </>
    );
};


const User = () => {

    const { setSelectedUserId } = useContext(UserIdContext);
    const { setSelectedUserName } = useContext(UserNameContext);

    const [isLoading, setIsLoading] = useState(true);
    const {
        data: users,
        error,
        mutate: mutateUsers,
    } = useSWR('/users', () =>
        user_service.getUser().catch((err) => console.error(err))
    );

    useEffect(() => {
        const timeout = setTimeout(() => {
            setIsLoading(false);
        }, 3000);

        return () => clearTimeout(timeout);
    }, []);

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [contentModal, setContentModal] = useState();

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    const toggleUtils = (index) => {
        const updatedUsers = users.data.map((user, i) => {
            if (i === index) {
                return { ...user, showUtils: user.showUtils ? !user.showUtils : true };
            }
            return user;
        });

        mutateUsers({ ...users, data: updatedUsers }, false);
    };

    const handleDelete = (id, name) => {
        openModal();

        const deleteUser = async () => {
            try {
                await user_service.deleteUserById(id);
                closeModal();
                const updatedData = users.data.filter((item) => item.id !== id);
                mutateUsers({ ...users, data: updatedData }, false);
            } catch (error) {
                console.log(error);
            }
        };

        setContentModal(
            <>
                <h4>
                    Are you sure to delete the user :{' '}
                    <span className='name_user_in_modal'>{name}</span>?
                </h4>
                <div className='sure_yes_no'>
                    <button id='yes' onClick={deleteUser}>
                        Yes
                    </button>
                    <button id='no' onClick={() => closeModal()}>
                        No
                    </button>
                </div>
            </>
        );
    };

    const handleModif = (id, user) => {
        openModal();

        const saveUpdatedUser = async (updatedUserData) => {
            try {
                const dataToSend = {
                    user: {
                        username: updatedUserData.username,
                        email: updatedUserData.email,
                        password: updatedUserData.password,
                        role: updatedUserData.role,
                    },
                };

                await user_service.updateUserById(id, dataToSend);
                closeModal();

                // Mettre à jour l'état local après la modification
                mutateUsers((currentUsers) => ({
                    ...currentUsers,
                    data: currentUsers.data.map((item) =>
                        item.id === id ? { ...item, ...updatedUserData } : item
                    ),
                }), false);

                localStorage.setItem('username', updatedUserData.username)
                localStorage.setItem('email', updatedUserData.email)

            } catch (error) {
                console.error('Erreur lors de la modification de l’utilisateur :', error);
            }
        };

        setContentModal(
            <EditUserForm
                initialUser={{ username: user.username, email: user.email }}
                onSave={saveUpdatedUser}
                onCancel={() => setIsModalOpen(false)}
            />
        );
    };


    const handleAddUser = () => {
        setIsModalOpen(true);
        setContentModal(
            <AddUserForm
                onSave={handleSaveUser}
                onCancel={() => setIsModalOpen(false)}
            />
        );
    };

    const handleSaveUser = async (newUserData) => {
        try {
            const dataToSend = {
                user: {
                    username: newUserData.username,
                    email: newUserData.email,
                    password: newUserData.password,
                    role: newUserData.role,
                },
            };

            const response = await user_service.addUser(dataToSend);

            const newUser = response.data;

            mutateUsers(currentUsers => ({
                ...currentUsers,
                data: [...currentUsers.data, newUser]
            }), false);

            closeModal();
        } catch (error) {
            console.error('Error saving new user:', error);
        }
    };

    return (
        <>
            <Modal isOpen={isModalOpen} onClose={closeModal}>
                {contentModal}
            </Modal>
            <div className='container_main_component user'>
                <div className='contain_title_component'>
                    <h1>Users</h1>
                    <hr />
                </div>

                {error && <p>Error fetching data</p>}

                {isLoading ? (
                    <SkeletonUser />
                ) : (
                    users.data &&
                    users.data.map((item, index) => (
                        <div className='wrapper_map_user' key={item.id} >
                            <div className='wrapper_fix' onClick={() => toggleUtils(index)}>
                                <div className='wrapper_content_user'>
                                    <img src='media/image/user.png' alt='user profile' />
                                    <p className='text_to_clamp_user'>{item.username}</p>
                                </div>
                                <div className='togoright_more'>
                                    <i
                                        className={`fa-solid fa-chevron-up ${item.showUtils ? 'rotate-icon' : ''
                                            }`}
                                        id='more'
                                    ></i>
                                </div>
                            </div>
                            <div
                                className={`wrapper_utils_user ${item.showUtils ? 'show-utils' : ''
                                    }`}
                            >
                                <i
                                    className='fa-solid fa-trash'
                                    id='trash'
                                    onClick={() => handleDelete(item.id, item.username)}
                                ></i>
                                <i
                                    className='fa-solid fa-pencil'
                                    id='pencil'
                                    onClick={() => handleModif(item.id, item)}
                                ></i>
                                <i
                                    className='fa-solid fa-plus'
                                    onClick={() => {
                                        setSelectedUserId(item.id)
                                        setSelectedUserName(item.username)
                                    }}
                                ></i>
                            </div>
                            <hr />
                        </div>
                    ))
                )}
                <div className='add_more_user_post' onClick={handleAddUser}>
                    <i className='fa-solid fa-circle-plus'></i>
                </div>
            </div>
        </>
    );
};

export default User;
