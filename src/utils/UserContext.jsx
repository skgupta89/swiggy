import { createContext } from "react";

const UserContextApi = createContext({
    loggedInUser : 'default USer'
})

export default UserContextApi;