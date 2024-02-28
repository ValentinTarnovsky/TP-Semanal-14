import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faPen, faStar } from "@fortawesome/free-solid-svg-icons";
import { useContext, useState } from "react";
import NotesContext from "../../contexts/DataContext";

import "./aside.scss";

const Aside = () => {
    const { notas, setNotas, iden, setIden, showNote, setShowNote, editando, setEditando, mostrandoFav, setMostrandoFav } = useContext(NotesContext);
    const [ estado, setEstado ] = useState("Mostrar");
    const [ guardarNotas, setGuardarNotas ] = useState();

    const newNota = function (titulo, contenido) {
        this.titulo = titulo;
        this.contenido = contenido;
        this.id = iden;
        this.fav = false;
    };

    const handleOnClickAddNote = () => {
        if (mostrandoFav) {
            setEstado("Mostrar");
            setMostrandoFav(false);
            const addNote = [ ...guardarNotas, new newNota("Nota sin titulo", "") ];
            setNotas(addNote);
        } else {
            const addNote = [ ...notas, new newNota("Nota sin titulo", "") ];
            setNotas(addNote);
        }
        setIden(iden+1);
    };

    const handleOnClickRemoveNote = (index) => {
        if (showNote.id === notas[index].id) {
            setShowNote({});
            setEditando(false);
        }
        if (estado === "Ocultar") {
            const i = guardarNotas.findIndex((nota) => nota.id === notas[index].id);
            const removeNoteGuardadas = guardarNotas.toSpliced(i, 1);
            setGuardarNotas(removeNoteGuardadas);
        }
        const removeNote = notas.toSpliced(index, 1);
        setNotas(removeNote);
    };

    const handleOnClickShowNote = (i) => {
        setShowNote(notas[i]);
        setEditando(false);
    };

    const handleOnClickEditNote = (i) => {
        setShowNote(notas[i]);
        setEditando(true);
    };

    const handleOnClickFav = (i) => {
        const fav = [...notas];
        notas[i].fav ? notas[i].fav = false : notas[i].fav = true;
        if (mostrandoFav) {
            if (showNote.id === notas[i].id) {
                setShowNote({});
                setEditando(false);
            }
            const deleteRemovefav = fav.toSpliced(i, 1);
            setNotas(deleteRemovefav);
            return;
        }
        setNotas(fav);
    };

    const handleOnClickMostrarFavoritos = () => {
        const notasFav = notas.filter((nota) => nota.fav);
        setEditando(false);
        setShowNote({});
        if (mostrandoFav) {
            setEstado("Mostrar");
            setNotas(guardarNotas);
            setMostrandoFav(false);
        } else {
            setGuardarNotas([...notas]);
            setMostrandoFav(true);
            setEstado("Ocultar");
            setNotas(notasFav);
        }
    };

    return (
        <aside className="aside">
            <h2>Notas: {notas.length}</h2>
            <span className="clickme" onClick={handleOnClickAddNote}>
                    Añadir
            </span>
            <span className="clickme" onClick={handleOnClickMostrarFavoritos}>
                {estado} solo favoritos
            </span>
            <ul>
                {notas.map((nota, index) => (
                    <li key={index} onClick={() => handleOnClickShowNote(index)}>
                        <div>
                            {nota.fav ? (<h4>⭐{nota.titulo}</h4>) : (<h4>{nota.titulo}</h4>)}
                            <p>{nota.contenido}</p>
                            <button onClick={(e) => {e.stopPropagation(); handleOnClickRemoveNote(index);}}><FontAwesomeIcon icon={faTrash} /></button>
                            <button onClick={(e) => {e.stopPropagation(); handleOnClickEditNote(index);}}><FontAwesomeIcon icon={faPen} /></button>
                            <button onClick={(e) => {e.stopPropagation(); handleOnClickFav(index);}}><FontAwesomeIcon icon={faStar} /></button>
                        </div>
                    </li>

                ))}
            </ul>
        </aside>
    );
};

export default Aside;