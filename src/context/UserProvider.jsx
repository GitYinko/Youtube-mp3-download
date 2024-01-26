import React, { createContext, useState } from 'react'

export const UserContext = createContext()


const UserProvider = ({ children }) => {

    const [link, setLink] = useState("");

    const [id, setId] = useState("");

    return (

        <UserContext.Provider value={{ link, setLink, id, setId }}>
            {children}
        </UserContext.Provider>
    )
}


export default UserProvider