import React, { useContext, useState } from 'react';
import { CategoriasContext } from '../context/CategoriasContext';
import { RecetasContext } from '../context/RecetasContext';

const Formulario = () => {

    const { categorias } = useContext(CategoriasContext);
    const { setSearch, setConsultar } = useContext(RecetasContext);

    const [busqueda, setBusqueda] = useState({
        ingrediente: '',
        categoria: ''
    });

    const guardarBusqueda = e => {
        setBusqueda({
            ...busqueda,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = e => {
        e.preventDefault();
        setSearch(busqueda);
        setConsultar(true);
    }

    return (
        <form
            className="col-12"
            onSubmit={handleSubmit}
        >
            <fieldset className="text-center">
                <legend>Busca bebidas por categoría o ingrediente</legend>
            </fieldset>
            <div className="row mt-4">
                <div className="col-md-4">
                    <input
                        name="ingrediente"
                        className="form-control"
                        type="text"
                        placeholder="Buscar por ingrediente"
                        onChange={guardarBusqueda}
                    />
                </div>
                <div className="col-md-4">
                    <select
                        className="form-control"
                        name="categoria"
                        onChange={guardarBusqueda}
                    >
                        <option value="">Selecciona categoría</option>
                        {categorias.map(categoria => (
                            <option
                                key={categoria.strCategory}
                                value={categoria.strCategory}
                            >{categoria.strCategory}</option>
                        ))}
                    </select>
                </div>
                <div className="col-md-4">
                    <input
                        className="btn btn-block btn-primary"
                        type="submit"
                        value="Buscar"
                    />
                </div>
            </div>
        </form>
    );
}

export default Formulario;