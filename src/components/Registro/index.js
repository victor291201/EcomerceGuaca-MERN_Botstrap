import React, { useState } from 'react';
import styles from "../../css/general.css"
import { Container, Row, Col, Image, Form, Button } from "react-bootstrap";
import {Link} from "react-router-dom";
import axios from "axios";



const Registro = () => {
  const [inputValues, setInputValues] = useState({
    username: '',
	password: '',
	correo:""
  });

  const handleOnChange = (event) => {
    console.log(event.target.value)
    const { name, value } = event.target;
    setInputValues({ ...inputValues, [name]: value });
  };
  const registrar=()=>{
    axios.post("http://localhost:4000/api/users",{
		nombre: inputValues.username,
		contraseña: inputValues.password,
	  correo:inputValues.correo,
		isAdmin: true
    })
  }
  return (
  	<div className="LogBack d-flex text-light-center align-items-center justify-content-center">
	    <Container fluid className="Ampliador">
	    	<Row className="Ampliador">
	    		<Col lg={4} md={6} sm={7} xs={8} className="d-flex text-light-center align-items-center justify-content-center mt-n3 m-auto">
	    			<div className="d-block notanlargo">
		    			<h1 styles={{FontWeight:"bold"}} className="text-light">Registro</h1>
		    			<Form className="text-light-center">
							  <Form.Group controlId="formBasicEmail">
							    <Form.Label className="text-light">Correo electronico</Form.Label>
							    <Form.Control type="email" placeholder="Digite correo electronico" name="correo"
                    value={inputValues.correo} onChange={handleOnChange}
                  />
							  </Form.Group>
							  <Form.Group controlId="formBasicEmail">
							    <Form.Label className="text-light">Nombre de usuario</Form.Label>
							    <Form.Control type="email" placeholder="Digite el nombre de usuario" name="username"
                    value={inputValues.username} onChange={handleOnChange}
                  />
							  </Form.Group>
							  <Form.Group controlId="formBasicPassword">
							    <Form.Label className="text-light">Password</Form.Label>
							    <Form.Control type="Contraseña" placeholder="Digite su contraseña"  name="password" 
                    value={inputValues.password} onChange={handleOnChange}
                  />
							  </Form.Group>
							  <Link to="/" className="text-reset notline">
								  <Button variant="dark" type="submit" Button variant="dark" size="lg" block
                    className="py-1 mt-1 mb-2 TextoBoton" onClick={registrar}
                  >
									    Enviar
								  </Button>
							  </Link>
							</Form>
						</div>
	    		</Col>
	    	</Row>
	    </Container>
    </div>
  );
}

export default Registro;