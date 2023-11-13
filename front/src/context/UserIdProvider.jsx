import React, { createContext, useState } from 'react';

const UserIdContext = createContext();

export const UserIdProvider = ({ children }) => {
    const [selectedUserId, setSelectedUserId] = useState(null);

    return (
        <UserIdContext.Provider value={{ selectedUserId, setSelectedUserId }}>
            {children}
        </UserIdContext.Provider>
    );
};

export { UserIdContext };
