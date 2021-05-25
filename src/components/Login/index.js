import React,{useState} from 'react';
import styles from "../../css/general.css"
import { Container, Row, Col, Image, Form, Button } from "react-bootstrap";
import Logo from "../../media/logo.png";
import {Link} from "react-router-dom";

const Login = (props) => {
	const [inputValues, setInputValues] = useState({
		nombre:"",
		contraseña:""
	});
  
	const handleOnChange = (event) => {
	  console.log(event.target.value)
	  const { name, value } = event.target;
	  setInputValues({ ...inputValues, [name]: value });
	};
  return (
  	<div className="LogBack d-flex text-light-center align-items-center justify-content-center">
	    <Container fluid className="Ampliador">
	    	<Row className="Ampliador">
	    		<Col lg={4} md={6} sm={7} xs={8} className="d-flex text-light-center align-items-center justify-content-center mt-n3 m-auto">
	    			<Form className="text-light-center">
      				<Image src={Logo} className="img-fluid px-5 py-3"/>
						  <Form.Group controlId="formBasicEmail">
						    <Form.Label className="text-light">Nombre de usuario</Form.Label>
						    <Form.Control type="email" placeholder="Digite el nombre de usuario" 
								className="pb-3 pt-3 TextoFormulario" name="nombre" value={inputValues.nombre} onChange={handleOnChange}/>
						  </Form.Group>
						  <Form.Group controlId="formBasicPassword">
						    <Form.Label className="text-light">Password</Form.Label>
						    <Form.Control type="Contraseña" placeholder="Digite su contraseña" 
								className="pb-3 pt-3 TextoFormulario" name="contraseña" value={inputValues.contraseña} onChange={handleOnChange}/>
						  </Form.Group>
						  <Link to="/" className="text-reset notline">
							  <Button variant="dark" type="submit" Button variant="dark" size="lg" 
									block className="py-1 mt-1 mb-2 TextoBoton" onClick={()=>props.logear(inputValues.nombre,inputValues.contraseña)}
								>
								    Ingresar
							  </Button>
						  </Link>
						  <Link to="/registro" className="text-reset notline">
							  <Button variant="dark" type="submit" Button variant="dark" size="lg" block className="py-1 mt-1 mb-2 TextoBoton">
								    Registrarse
							  </Button>
						  </Link>
						</Form>
	    		</Col>
	    	</Row>
	    </Container>
    </div>
  );
}

export default Login;