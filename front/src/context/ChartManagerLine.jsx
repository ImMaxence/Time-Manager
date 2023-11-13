import React, { createContext, useState } from 'react';

const ChartManagerLine = createContext();

export const ChartProviderLine = ({ children }) => {
    const [selectedLine, setSelectedLine] = useState('defaultv4');
    const [selectedTypeLine, setSelectedTypeLine] = useState('defaultv5');

    return (
        <ChartManagerLine.Provider value={{ selectedLine, setSelectedLine, selectedTypeLine, setSelectedTypeLine }}>
            {children}
        </ChartManagerLine.Provider>
    );
};

export { ChartManagerLine };
