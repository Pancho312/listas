import React, {useState} from 'react';
import{ Stack, container, Form, Button } from "react-bootstrap";

import firebaseApp from "../credenciales";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
const auth = getAuth(firebaseApp);

const Logueo = () => {
    const [estaRegistrandose, setEstaRegistrandose] = useState(false);

    async function submitHandler(e) {
        e.preventDefault();
        const correo = e.target.formBasicEmail.value;
        const contra = e.target.formBasicPassword.value;
        /*console.log(correo, contra);*/
        const usuario = await createUserWithEmailAndPassword(auth, correo, contra);
        console.log(usuario);

    }
    return (
    <container>
        <Stack gap={3}>
        <h1>  {estaRegistrandose ? "Registrate" : "Inicia Secion"}</h1>
        <Form onSubmit={submitHandler}>
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

            <Button variant="primary" type="submit" style={{width:"300px"}}>
                Acceder con Google
            </Button>

            <Button
            style={{width: "300px"}}
             variant="primary" onClick= {() => setEstaRegistrandose(!estaRegistrandose)}>
                {estaRegistrandose ? "¿Ya tienes cuenta? Inicia Secion" : "¿No tienes Cuenta? Registrate!"}
            </Button>

        </Stack>
    </container>
    );
};
export default Logueo;