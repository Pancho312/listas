import React,{ useState, useEffect} from "react";

import firebaseApp from "../credenciales";
import { getAuth, signOut} from "firebase/auth";
import { getFirestore, doc, getDoc, setDoc } from "firebase/firestore";

import { Container, Button, Badge } from "react-bootstrap";

import AgregarTarea from "./AgregarTarea";
import ListadoTarea from "./ListadoTarea";

const auth = getAuth(firebaseApp);
const firestore = getFirestore(firebaseApp);

const Home = ({correoUsuario}) => {
    const [arrayTareas, setArrayTareas] = useState(null);
    

    const fakeData =[
        { id: 1, descripcion: "tarea falsa 1", url:"https://piscum.photos/420"},
        { id: 2, descripcion: "tarea falsa 2", url:"https://piscum.photos/420"},
        { id: 3, descripcion: "tarea falsa 3", url:"https://piscum.photos/420"},
    ];
    async function buscarDocumentOrCrearDocumento(idDocumento){
        //creara una referencia al docuemnto de firebase
        const docuRef = doc(firestore,  `usuarios/${idDocumento}`);
        //buscar docuemnto 
        const consulta = await getDoc(docuRef);
        // revisara si existe
        if(consulta.exists()){
            //casi que si
            const infoDocu = consulta.data();
            return infoDocu.tareas;
        }else {
            //caso que no
            await setDoc(docuRef, {tareas: [...fakeData]});
            const consulta = await getDoc(docuRef);
            const infoDocu = consulta.data();
            return infoDocu.tareas;
        }
    }

    useEffect(()=>{
        async function fetchtareas(){
            const tareasFetchadas = await buscarDocumentOrCrearDocumento(correoUsuario);
            setArrayTareas(tareasFetchadas);
        }
        fetchtareas();
    } , []);

    return (
    <Container>
        
        <h2>Bienvenido</h2>
        
        <hr/>
        <AgregarTarea
            arrayTareas={arrayTareas}
            setArrayTareas = {setArrayTareas}
            correoUsuario = {correoUsuario} />


        {
            arrayTareas ?
        <ListadoTarea 
        arrayTareas={arrayTareas}
        setArrayTareas = {setArrayTareas}
        correoUsuario = {correoUsuario} />
        : null
}

        <Button
            variant="success" 
            onClick={()=> signOut(auth)} >Cerrar Sesion 
        </Button>
    </Container> 
    );
}
export default Home;