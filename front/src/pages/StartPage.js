import React from 'react';
import SimpleButton from '../components/MainComponents/SimpleButton';

const StartPage = () => {
    return (
        <>
            <div className="container_startpage">
                <div className="patern_paper one"></div>
                <div className="patern_paper two"></div>
                <div className="patern_paper three"></div>
                <div className="patern_paper four"></div>
                <div className="patern_paper five"></div>
                <div className="patern_paper six"></div>
                <div className="container_content_startpage">
                    <div className="wrapper_titles_startpage">
                        <h1>Time Manager</h1>
                        <h3>Your Daily Time Planner</h3>
                    </div>
                    <SimpleButton text="Get Started" navigation="/login" />
                </div>
            </div>
        </>
    );
};

export default StartPage;