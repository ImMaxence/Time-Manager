import React, { createContext, useState } from 'react';

const ChartManagerRound = createContext();

export const ChartProviderRound = ({ children }) => {
    const [selectedRound, setSelectedRound] = useState('defaultv2');
    const [selectedType, setSelectedType] = useState('defaultv3');

    return (
        <ChartManagerRound.Provider value={{ selectedRound, setSelectedRound, selectedType, setSelectedType }}>
            {children}
        </ChartManagerRound.Provider>
    );
};

export { ChartManagerRound };
