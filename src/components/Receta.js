import React, { useContext, useState } from 'react';
import { ModalContext } from '../context/ModalContext';

import Modal from '@material-ui/core/Modal';
import { makeStyles } from '@material-ui/core/styles';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';

function getModalStyle() {
    const top = 50;
    const left = 50;

    return {
        top: `${top}%`,
        left: `${left}%`,
        transform: `translate(-${top}%, -${left}%)`,
    };
}

const useStyles = makeStyles(theme => ({
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    paper: {
        position: 'absolute',
        width: 600,
        backgroundColor: theme.palette.background.paper,
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
    },
}));

const Receta = ({ receta }) => {

    // Configuración del modal de material ui
    const [modalStyle] = useState(getModalStyle);
    const [open, setOpen] = useState(false);
    const classes = useStyles();

    const handleOpen = () => {
        setTimeout(() => {
            setOpen(true)
        }, 100);
    };

    const handleClose = () => {
        setOpen(false);
    };


    const { setIdReceta, detallesreceta, setDetallesReceta } = useContext(ModalContext);

    const { strDrink, idDrink, strDrinkThumb } = receta;

    // Muestra y formatea los ingredientes
    const mostrarIngredientes = detallesreceta => {
        console.log(detallesreceta)
        let ingredientes = [];
        for (let i = 1; i < 16; i++) {
            if (detallesreceta[`strIngredient${i}`] !== null && detallesreceta[`strIngredient${i}`] !== '') {
                ingredientes.push(
                    <li>{detallesreceta[`strIngredient${i}`]}: {detallesreceta[`strMeasure${i}`]}</li>
                );
            }
        }

        return ingredientes;
    }

    return (
        <div className="col-md-4 mb-5">
            <div className="card">
                <h2 className="card-header">{strDrink}</h2>

                <img className="card-img-top" src={strDrinkThumb} alt={strDrink} />

                <div className="card-body">
                    <button
                        type="button"
                        className="btn btn-block btn-primary"
                        onClick={() => {
                            setIdReceta(idDrink);
                            handleOpen();
                        }}
                    >
                        Ver receta
                    </button>

                    <Modal
                        aria-labelledby="transition-modal-title"
                        aria-describedby="transition-modal-description"
                        className={classes.modal}
                        closeAfterTransition
                        BackdropComponent={Backdrop}
                        BackdropProps={{
                            timeout: 500,
                        }}
                        open={open}
                        onClose={() => {
                            handleClose()
                            setIdReceta(null)
                            setDetallesReceta({})
                        }}
                    >
                        <Fade in={open}>
                            <div style={modalStyle} className={classes.paper}>
                                <h2>{detallesreceta.strDrink}</h2>
                                <h3 className="mt-4">Instrucciones</h3>
                                <p>{detallesreceta.strInstructions}</p>
                                <img className="img-fluid my-4" src={detallesreceta.strDrinkThumb} alt={detallesreceta.strDrink} />
                                <h3>Ingredientes y cantidades</h3>
                                <ul>
                                    {mostrarIngredientes(detallesreceta)}
                                </ul>
                            </div>
                        </Fade>
                    </Modal>
                </div>
            </div>
        </div>
    );
}

export default Receta;