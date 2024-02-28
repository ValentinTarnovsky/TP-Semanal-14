/* eslint-disable no-unused-vars */
import "./app.scss";

import Header from "./components/layout/header/Header";
import Main from "./components/layout/main/Main";
import Footer from "./components/layout/footer/Footer";
import Aside from "./components/layout/aside/Aside";
import NotesContext from "./components/contexts/DataContext";
import { useState, useRef } from "react";

const App = () => {

    const [ notas, setNotas ] = useState([
        {
            titulo: "Hola, soy una nota!",
            contenido: "Esta es una nota, puedes crear otras, ademas de editarlas, ponerlas como favoritas o eliminarlas :D",
            id: 0,
            fav: true,
        },
    ]);
    const [ iden, setIden ] = useState(1);
    const [ showNote, setShowNote ] = useState({});
    const [ editando, setEditando ] = useState(false);
    const [ mostrandoFav, setMostrandoFav ] = useState(false);

    return (
        <>
            <Header />
            <NotesContext.Provider value={{ notas, setNotas, iden, setIden, showNote, setShowNote, editando, setEditando, mostrandoFav, setMostrandoFav }}>
                <Aside />
                <Main />
            </NotesContext.Provider>
            <Footer />
        </>
    );
};

export default App;