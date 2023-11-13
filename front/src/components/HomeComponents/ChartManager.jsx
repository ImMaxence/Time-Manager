import { React, useState, useContext } from 'react';
import { ChartManagerRound } from '../../context/ChartManagerRound';
import { ChartManagerLine } from '../../context/ChartManagerLine';
import { ChartManagerScore } from '../../context/ChartManagerScore';

const ChartManager = () => {

    const [selectedColor, setSelectedColor] = useState('defaultv2');
    const [selectedTypeChart, setSelectedTypeChart] = useState('defaultv3');

    const { setSelectedRound, setSelectedType } = useContext(ChartManagerRound);

    const [selectedColor2, setSelectedColor2] = useState('defaultv4');
    const [selectedTypeChart2, setSelectedTypeChart2] = useState('defaultv5');

    const { setSelectedLine, setSelectedTypeLine } = useContext(ChartManagerLine);

    const [selectedColor3, setSelectedColor3] = useState('defaultv10');
    const [selectedTypeChart3, setSelectedTypeChart3] = useState('defaultv11');

    const { setSelectedScore, setSelectedTypeScore } = useContext(ChartManagerScore);

    return (
        <>
            <div className="container_main_component chart">
                <div className="contain_title_component chart">
                    <h1>Chart Manager</h1>
                    <hr />
                </div>
                <div className="wrapper_all_chartmanager">

                    <div className="container_content_chartmanager">
                        <h3>My Works</h3>

                        <h4>Color</h4>

                        <div className="wrapper_inputs_chart">
                            <input type="radio" name="colorv2" id="defaultv2" checked={selectedColor === 'defaultv2'} onChange={() => {
                                setSelectedColor('defaultv2')
                                setSelectedRound('defaultv2');
                            }} />
                            <label htmlFor="defaultv2">Default</label>

                            <input type="radio" name="colorv2" id="redv2" checked={selectedColor === 'redv2'} onChange={() => {
                                setSelectedColor('redv2')
                                setSelectedRound('redv2');
                            }} />
                            <label htmlFor="redv2">Red</label>

                            <input type="radio" name="colorv2" id="greenv2" checked={selectedColor === 'greenv2'} onChange={() => {
                                setSelectedColor('greenv2')
                                setSelectedRound('greenv2');
                            }} />
                            <label htmlFor="greenv2">Green</label>
                        </div>


                        <h4>Type</h4>

                        <div className="wrapper_inputs_chart">
                            <input type="radio" name="typev3" id="defaultv3" checked={selectedTypeChart === 'defaultv3'} onChange={() => {
                                setSelectedTypeChart('defaultv3')
                                setSelectedType('defaultv3')
                            }} />
                            <label htmlFor="defaultv3">Default</label>

                            <input type="radio" name="typev3" id="barv3" checked={selectedTypeChart === 'barv3'} onChange={() => {
                                setSelectedTypeChart('barv3')
                                setSelectedType('barv3')
                            }} />
                            <label htmlFor="barv3">Bar</label>

                            <input type="radio" name="typev3" id="piev3" checked={selectedTypeChart === 'piev3'} onChange={() => {
                                setSelectedTypeChart('piev3')
                                setSelectedType('piev3')
                            }} />
                            <label htmlFor="piev3">Pie</label>

                            <input type="radio" name="typev3" id="polarv3" checked={selectedTypeChart === 'polarv3'} onChange={() => {
                                setSelectedTypeChart('polarv3')
                                setSelectedType('polarv3')
                            }} />
                            <label htmlFor="piev3">Polar</label>
                        </div>
                    </div>

                    <div className="container_content_chartmanager">
                        <h3>Monthly Hours</h3>

                        <h4>Color</h4>

                        <div className="wrapper_inputs_chart">
                            <input type="radio" name="colorv7" id="defaultv4" checked={selectedColor2 === 'defaultv4'} onChange={() => {
                                setSelectedColor2('defaultv4')
                                setSelectedLine('defaultv4');
                            }} />
                            <label htmlFor="defaultv4">Default</label>

                            <input type="radio" name="colorv7" id="redv4" checked={selectedColor2 === 'redv4'} onChange={() => {
                                setSelectedColor2('redv4')
                                setSelectedLine('redv4');
                            }} />
                            <label htmlFor="redv4">Red</label>

                            <input type="radio" name="colorv7" id="greenv4" checked={selectedColor2 === 'greenv4'} onChange={() => {
                                setSelectedColor2('greenv4')
                                setSelectedLine('greenv4');
                            }} />
                            <label htmlFor="greenv4">Green</label>
                        </div>


                        <h4>Type</h4>

                        <div className="wrapper_inputs_chart">
                            <input type="radio" name="typev7" id="defaultv5" checked={selectedTypeChart2 === 'defaultv5'} onChange={() => {
                                setSelectedTypeChart2('defaultv5')
                                setSelectedTypeLine('defaultv5')
                            }} />
                            <label htmlFor="defaultv3">Default</label>

                            <input type="radio" name="typev7" id="barv6" checked={selectedTypeChart2 === 'barv6'} onChange={() => {
                                setSelectedTypeChart2('barv6')
                                setSelectedTypeLine('barv6')
                            }} />
                            <label htmlFor="barv6">Bar</label>

                        </div>
                    </div>

                    <div className="container_content_chartmanager">
                        <h3>Best Score</h3>

                        <h4>Color</h4>

                        <div className="wrapper_inputs_chart">
                            <input type="radio" name="colorv10" id="defaultv10" checked={selectedColor3 === 'defaultv10'} onChange={() => {
                                setSelectedColor3('defaultv10')
                                setSelectedScore('defaultv10');
                            }} />
                            <label htmlFor="defaultv10">Default</label>

                            <input type="radio" name="colorv10" id="redv10" checked={selectedColor3 === 'redv10'} onChange={() => {
                                setSelectedColor3('redv10')
                                setSelectedScore('redv10');
                            }} />
                            <label htmlFor="redv10">Red</label>

                            <input type="radio" name="colorv10" id="greenv10" checked={selectedColor3 === 'greenv10'} onChange={() => {
                                setSelectedColor3('greenv10')
                                setSelectedScore('greenv10');
                            }} />
                            <label htmlFor="greenv10">Green</label>
                        </div>


                        <h4>Type</h4>

                        <div className="wrapper_inputs_chart">
                            <input type="radio" name="typev11" id="defaultv11" checked={selectedTypeChart3 === 'defaultv11'} onChange={() => {
                                setSelectedTypeChart3('defaultv11')
                                setSelectedTypeScore('defaultv11')
                            }} />
                            <label htmlFor="defaultv11">Default</label>

                            <input type="radio" name="typev11" id="barv11" checked={selectedTypeChart3 === 'barv11'} onChange={() => {
                                setSelectedTypeChart3('barv11')
                                setSelectedTypeScore('barv11')
                            }} />
                            <label htmlFor="barv6">Bar</label>

                        </div>
                    </div>

                </div>
            </div>
        </>
    );
};

export default ChartManager;