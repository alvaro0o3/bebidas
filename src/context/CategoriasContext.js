import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';


// Crear el context
export const CategoriasContext = createContext();

// Al crear el context hay que crear también un Provider:
// (donde estan las funciones y el state)

const CategoriasProvider = (props) => {

    // State del context
    const [categorias, setCategorias] = useState([]);

    // Traemos las categorías de la API
    useEffect(() => {
        const consultarCategorias = async () => {
            const url = 'https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list';
            const result = await axios.get(url);
            setCategorias(result.data.drinks)
        }
        consultarCategorias();
    }, []);

    return (
        <CategoriasContext.Provider
            value={{
                categorias
                 // Lo que halla en este value estará disponible
                 // para todos los componentes
            }}
        >
            {props.children}
        </CategoriasContext.Provider>
    )

}

export default CategoriasProvider;