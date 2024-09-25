import {createContext, useContext, useEffect, useState} from "react";


const UserContext = createContext(null);

export const UserProvider = ({ children, initialUser }) => {
    const [user, setUser] = useState(initialUser);

    useEffect(() => {
        setUser(initialUser);
    }, [initialUser]);

    return (
        <UserContext.Provider value={{ user }}>
            {children}
        </UserContext.Provider>
    )
}


export const useUser = () => useContext(UserContext)
