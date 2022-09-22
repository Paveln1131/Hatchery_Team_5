import { createContext, useState } from "react";

const UserContext = createContext();

export function UserProvider({ children }) {
    const [authorization, setAuthorization] = useState({ role: []});

    const toggleAuthorization = (auth) => {
        setAuthorization(auth)
    }

    const value = {
        authorization,
        toggleAuthorization
    }

    return (
        <UserContext.Provider
            value={value}
        >
            {children}
        </UserContext.Provider>
    )
}

export default UserContext;