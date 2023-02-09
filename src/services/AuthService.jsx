import React from 'react';
import { useContext, useEffect } from 'react';

class UserService {
    getUserRole() {
        console.log("getUserRole")
    }

    getSomethingElse() {
        console.log("getSomethingElse")
        return {
            test: false
        }
    }
}

export const userServiceInstance = new UserService();

const UserServiceContext = React.createContext(userServiceInstance);

// Convenience hook
export const useUserService = () => useContext(UserServiceContext);

export const UserServiceProvider = (props) => {
    useEffect(() => {
    }, []);

    return (
        <UserServiceContext.Provider value={userServiceInstance} {...props} />
    );
}
