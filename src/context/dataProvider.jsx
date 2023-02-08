import { createContext } from "react";
import { useState } from "react";

export const dataContext = createContext();

const dataProvider = ({ children }) => {
    const [dataFromDB, setDataFromDB] = useState("");
    const data = { dataFromDB, setDataFromDB };
    return (
        <SearchContext.Provider value={data}>{children}</SearchContext.Provider>
    );
};

export default dataProvider;
