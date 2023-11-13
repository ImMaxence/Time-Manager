import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const PageNotFound = (props) => {

    const navigate = useNavigate();

    const [backgroundX, setBackgroundX] = useState('0px');
    const [backgroundY, setBackgroundY] = useState('0px');

    const handleMoveBackground = (event) => {

        setBackgroundX(event.clientX / 5);
        setBackgroundY(event.clientY / 5);
    }

    return (
        <>
            <div className="container_404">
                <div className="content_pagenotfound" onMouseMove={handleMoveBackground} style={{ backgroundPositionX: backgroundX, backgroundPositionY: backgroundY }}>
                    <div className="wrapper_404">
                        <h2>404</h2>
                        <h4>Oops! Page not found</h4>
                        <p>The page you are looking for does not exist. You may have typed the address incorrectly or the page may have been moved</p>
                        <button onClick={() => { navigate(props.navigation) }}>Back to Home</button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default PageNotFound;