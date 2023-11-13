import React, { createContext, useState } from 'react';

const UserNameContext = createContext();

export const UserNameProvider = ({ children }) => {
    const [selectedUserName, setSelectedUserName] = useState(null);

    return (
        <UserNameContext.Provider value={{ selectedUserName, setSelectedUserName }}>
            {children}
        </UserNameContext.Provider>
    );
};

export { UserNameContext };
