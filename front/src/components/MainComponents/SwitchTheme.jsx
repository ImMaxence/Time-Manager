import { React, useState } from 'react';

const SwitchTheme = () => {

    const [theme, setTheme] = useState('light');

    const toggleTheme = () => {
        if (theme === 'light') {
            setTheme('dark');
            document.querySelector("body").setAttribute('data-theme', 'dark')
        } else {
            setTheme('light');
            document.querySelector("body").setAttribute('data-theme', 'light')
        }
    }

    return (
        <div className={"container_darktheme_btn"} onClick={toggleTheme} title="Dark and Light Theme">
            <i className={`fa-solid fa-sun ${theme === 'dark' ? 'active-dark' : ''}`}></i>
            <i className={`fa-regular fa-moon ${theme === 'light' ? 'active-dark' : ''}`}></i>
        </div>
    );
};

export default SwitchTheme;