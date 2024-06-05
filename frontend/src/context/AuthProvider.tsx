import { jwtDecode } from "jwt-decode";
import {ReactNode, createContext , useEffect, useState} from "react";
import { JWTPayload } from "../models/jwtPayload";

interface AuthProviderProps {
    children: ReactNode;
}
// Defining the shape of the context's value
interface AuthContextType {
    auth: any; // You can replace 'any' with a more specific type if needed
    setAuth: React.Dispatch<React.SetStateAction<any>>;
}

export const AuthContext = createContext<AuthContextType>({
    auth: {}, // Default value, replace it with an actual initial state if necessary
    setAuth: () => {} // Placeholder function

});

export const AuthProvider : React.FC<AuthProviderProps> = ({children}) => {

    const [auth, setAuth] = useState(() => {
        // Get the auth token from local storage when initializing the state
        const token = localStorage.getItem('authToken');

        if(!token)
            return {}
        const decoded = jwtDecode(token) as JWTPayload;
        return {token:token , role: decoded.type, id:decoded.sub , name:decoded.username , restaurantId:decoded.restaurantId}
    });

    useEffect(() => {
        // Save the auth token to local storage whenever it changes
        if (auth.token)
            localStorage.setItem('authToken', auth.token);
        else
            localStorage.removeItem('authToken');
    
    }, [auth.token]);

    return ( 
        <AuthContext.Provider value={{auth, setAuth}}>
            {children}
        </AuthContext.Provider>
    )
}


export default AuthProvider;


