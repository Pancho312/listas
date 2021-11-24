import React from "react";
import {Container, Form, Col, Row, Button} from "react-bootstrap";

import firebaseApp from "../credenciales";
import{getFirestore, updateDoc, doc} from "firebase/firestore";
const firestore = getFirestore(firebaseApp);

const AgregarTarea = ({ correoUsuario, setArrayTareas, arrayTareas }) => {

    async function añadirTarea(e){
        e.preventDefault();
        const descripcion= e.target.formDescripcion.value;
        // crear nuevas tareas de
        const nuevoArrayTareas = [...arrayTareas, 
            {
                id: + new Date() ,
                descripcion: descripcion ,
                url:"https://picsum.photos/420",
            },
        ];
        //actulaiza la base de datos 
        const docuRef = doc(firestore, `usuarios/${correoUsuario}`);
        updateDoc(docuRef, {tareas: [...nuevoArrayTareas]});
        
        //actualizar estados
        setArrayTareas(nuevoArrayTareas);

        //limpiar formulario
        e.target.formDescripcion.value = "";

    }

    return (
    <Container>
        <Form onSubmit={añadirTarea}>
            <Row className="mb-5">
                <Col>
                    <Form.Control type="text" placeholder="Describe tu tarea " id= "formDescripcion"/>
                </Col>
                
                <Col>
                    <Button type="submit">Agregar Tarea</Button>
                </Col>
            </Row>
            <hr/>
        </Form>
    </Container>
    );
}
export default AgregarTarea;

// por si queremos ingresar una imagen
/*      <Col>
            <Form.Control type="file" placeholder="añade archivo"/>
        </Col>
*/