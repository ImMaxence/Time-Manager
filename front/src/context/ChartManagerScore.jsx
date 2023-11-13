import React, { createContext, useState } from 'react';

const ChartManagerScore = createContext();

export const ChartProviderScore = ({ children }) => {
    const [selectedScore, setSelectedScore] = useState('defaultv10');
    const [selectedTypeScore, setSelectedTypeScore] = useState('defaultv11');

    return (
        <ChartManagerScore.Provider value={{ selectedScore, setSelectedScore, selectedTypeScore, setSelectedTypeScore }}>
            {children}
        </ChartManagerScore.Provider>
    );
};

export { ChartManagerScore };
