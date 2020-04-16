import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const RecetasContext = createContext();

const RecetasProvider = (props) => {

    const [recetas, setRecetas] = useState([]);
    const [search, setSearch] = useState({
        ingrediente: '',
        categoria: ''
    });
    const [consultar, setConsultar] = useState(false);

    const { ingrediente, categoria } = search;

    useEffect(() => {
        if (consultar) {
            const getRecetas = async () => {
                const url = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${ingrediente}&c=${categoria}`;
                const result = await axios.get(url);
                setRecetas(result.data.drinks);
                //console.log(result)
            }

            getRecetas();
        }
    }, [search, consultar, ingrediente, categoria])

    return (
        <RecetasContext.Provider
            value={{
                setSearch,
                setConsultar,
                recetas
            }}
        >
            {props.children}
        </RecetasContext.Provider>
    );
}

export default RecetasProvider;