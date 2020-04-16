import React, { useState, useEffect, createContext } from 'react';
import axios from 'axios';

export const ModalContext = createContext();


const ModalProvider = (props) => {

    //state del provider (id de receta)
    const [idreceta, setIdReceta] = useState(null);
    const [detallesreceta, setDetallesReceta] = useState({})

    useEffect(() => {

        const consultarDetallesReceta = async () => {

            if (idreceta === null) return;
            const url = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${idreceta}
                `;
            const result = await axios.get(url);
            setDetallesReceta(result.data.drinks[0]);
        }
        consultarDetallesReceta();

    }, [idreceta])

    return (
        <ModalContext.Provider
            value={{
                setIdReceta,
                detallesreceta,
                setDetallesReceta
            }}
        >
            {props.children}
        </ModalContext.Provider>
    );
}

export default ModalProvider;