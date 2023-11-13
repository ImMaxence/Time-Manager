import { React, useContext } from 'react';
import useSWR from 'swr';
import { UserIdContext } from '../../context/UserIdProvider';
import axios from 'axios';

const fetcher = (url) => fetch(url, { headers: { 'Authorization': `Bearer ${localStorage.getItem('jwt')}` } }).then((res) => res.json());

const ClockManager = () => {

    const { selectedUserId } = useContext(UserIdContext);

    const { data, mutate } = useSWR(`http://localhost:4000/api/clocks/${selectedUserId}`, fetcher, { headers: { 'Authorization': `Bearer ${localStorage.getItem('jwt')}` } });


    const getStatusText = () => {

        if (data === undefined) {
            return {
                text: 'No user selected',
                buttonClass: 'button_clock_manager button_clock_manager_not'
            };
        }
        else if (data && data.data && data.data[0] && data.data[0].status === true) {
            return {
                text: `Status: ON`,
                buttonClass: 'button_clock_manager button_clock_manager_ok'
            };
        }
        else {
            return {
                text: 'Status: OFF',
                buttonClass: 'button_clock_manager button_clock_manager_default'
            };
        }
    }

    const handleChange = () => {

        axios.post(`http://localhost:4000/api/clocks/${selectedUserId}`, {}, { headers: { 'Authorization': `Bearer ${localStorage.getItem('jwt')}` } })
            .then((res) => {
                mutate(`http://localhost:4000/api/clocks/${selectedUserId}`);
            })
            .catch((err) => {
                console.log(err)
            })
    }

    return (
        <>
            <div className="container_main_component clock">
                <div className="contain_title_component">
                    <h1>Clock Manager</h1>
                    <hr />
                </div>
                <div className="content_clock_manager">
                    <button className={getStatusText().buttonClass} onClick={handleChange}>
                        <i className="fa-regular fa-clock"></i>
                        {getStatusText().text}
                    </button>
                </div>
            </div>
        </>
    );
};

export default ClockManager;
