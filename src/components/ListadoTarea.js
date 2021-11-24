import React from "react";
import { Stack, Container, Row, Col, Button } from "react-bootstrap";

import firebaseApp from "../credenciales";
import { getFirestore, updateDoc, doc } from "firebase/firestore";
const firestore= getFirestore(firebaseApp);

const ListadoTarea = ({ arrayTareas, correoUsuario, setArrayTareas }) => {

    async function eliminarTarea(idTareaEliminar){
        //crear nuevo array de tareas
        const nuevoArrayTareas = arrayTareas.filter((objetoTarea)=> objetoTarea.id !== idTareaEliminar
        );
        //actualizar la base de datos
        const docuRef = doc(firestore, `usuarios/${correoUsuario}`);
        updateDoc(docuRef, {tareas: [...nuevoArrayTareas]});
        //actualizar stato
        setArrayTareas(nuevoArrayTareas);
    }

    return(  
    <Container> 
        <Stack>
            {arrayTareas.map((objetoTarea) =>{
                return(
                    <>
                    <Row>
                        <Col>
                            {objetoTarea.descripcion}
                        </Col>
                    
                   
                    <Col>
                        <Button 
                        variant="danger"
                        onClick= {() => eliminarTarea(objetoTarea.id)}> Eliminar Tarea </Button>
                    </Col>
                    </Row>
                    <hr/>
                    </>
                );
            })}
        </Stack>
    </Container>
    );
}
export default ListadoTarea;
// <Col>
//<Button variant="secondary"> Ver Archivo </Button>
//</Col>