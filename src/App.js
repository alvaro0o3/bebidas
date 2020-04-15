import React from 'react';
import Header from './components/Header';
import Formulario from './components/Formulario';

import CategoriasProvider from './context/CategoriasContext';
import RecetasProvider from './context/RecetasContext';

// Importando el CategoriasProvider y usandolo asi hace que podamos acceder
// desde todos los componentes a los datos del provider

function App() {
  return (
    <CategoriasProvider>
      <RecetasProvider>
        <Header />

        <div className="container mt-5">
          <div className="row">
            <Formulario />
          </div>
        </div>
      </RecetasProvider>
    </CategoriasProvider >
  );
}

export default App;
