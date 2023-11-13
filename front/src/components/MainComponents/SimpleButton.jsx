import React from 'react';
import { useNavigate } from "react-router-dom";

const SimpleButton = ({ text, navigation }) => {

    const navigate = useNavigate();

    const handleNavigation = (navigation) => {
        window.scrollTo({ top: 0 });
        navigate(`${navigation}`)
    }

    return (
        <>
            <button className='btn btn1' onClick={() => handleNavigation(navigation)}>{text}</button>
        </>
    );
};

export default SimpleButton;