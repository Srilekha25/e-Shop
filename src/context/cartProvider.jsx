import { createContext } from "react";
import { useState } from "react";

export const cartContext = createContext();

const cartProvider = ({ children }) => {
    const [cartDataFromDB, setCartDataFromDB] = useState("");
    const data = { cartDataFromDB, setCartDataFromDB };
    return (
        <cartContext.Provider value={data}>{children}</cartContext.Provider>
    );
};

export default cartProvider;
