import React, {useState} from 'react';
import{ Stack, Container, Form, Button, Col, Row} from "react-bootstrap";

import "../../src/components/stilos.css"

import firebaseApp from "../credenciales";
import { 
    getAuth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signInWithRedirect,
    GoogleAuthProvider,
} from "firebase/auth";
const auth = getAuth(firebaseApp);
const googleProvider = new GoogleAuthProvider();

const Logueo = () => {
    const [estaRegistrandose, setEstaRegistrandose] = useState(false);

    async function submitHandler(e) {
        e.preventDefault();
        const correo = e.target.formBasicEmail.value;
        const contra = e.target.formBasicPassword.value;
        if(estaRegistrandose){
            //si se registra
            const usuario = await createUserWithEmailAndPassword(
                auth,
                correo,
                contra);
        }
        else {
            // si quiere iniciar secion
            signInWithEmailAndPassword(auth, correo, contra);
        }
    }
    return (

    <Container  className="reg">
    <Row>
        <Col >
            
        <Stack gap={3}>
        <h1>  {estaRegistrandose ? "Registrate" : "Inicia Secion"}</h1>
        <Form  onSubmit={submitHandler}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
                
                <Form.Label>Ingrese su Correo Electronico</Form.Label>

                <Form.Control type="email" placeholder="Ingrese su Correo" />
                
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Contraseña</Form.Label>
                <Form.Control type="password" placeholder="Contraseña" />
            </Form.Group>
            
            <Button variant="primary" type="submit">
                {estaRegistrandose ? "Registrate" : "Inicia Secion"}
            </Button>
            </Form>

            <Button 
                variant="success" 
               // type="submit" 
                style={{width:"300px"}}
                onClick= {() => signInWithRedirect(auth, googleProvider)}
                >
                Acceder con Google
            </Button>

            <Button
            style={{width: "300px"}}
             variant="secondary" onClick= {() => setEstaRegistrandose(!estaRegistrandose)}>
                {estaRegistrandose ? "¿Ya tienes cuenta? Inicia Secion" : "¿No tienes Cuenta? Registrate!"}
            </Button>

        </Stack>
        </Col>
        </Row>
    </Container>
        
    );
};
export default Logueo;