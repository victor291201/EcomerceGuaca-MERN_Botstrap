import React from 'react';
import styles from "../../css/general.css"
import { Container, Row, Col, Image, Form, Button } from "react-bootstrap";
import Navbar1 from "../Navbar";
import Aside from "../Aside";
import {Link} from "react-router-dom";


const Configuracion = (props) => {
  return (
  	<div className="d-flex text-dark-center align-items-center justify-content-center SinEspacios">
	    <Container fluid className="Ampliador SinEspacios contenedor">
		    	<Row className="Ampliador contenedor">
		    		<Navbar1/>
		    		<Col lg={2} className="SinEspacios">
		    			<Aside min tipo="configuracion"/>
		    		</Col>
	    		<Col  lg={10} className="d-flex justify-content-center align-items-center minimo">
	    				<div className="d-inline mb-2" style={{width:"26em", height:"21.3em"}}>
	    					{window.screen.width<570?
			    				<h3 className="text-dark">Cambiar {props.nombre? "nombre":"contraseña"}</h3>
		    						:
			    				<h1 className="text-dark">Cambiar {props.nombre? "nombre":"contraseña"}</h1>
	    					}
			    			<Form className="text-dark-center">
								  <Form.Group controlId="formBasicEmail">
								    <Form.Label>Nombre de usuario</Form.Label>
								    <Form.Control type="email" className="pb-3 pt-3 TextoFormulario"  placeholder="Ingrese el nombre de usuario" />
								  </Form.Group>
								  <Form.Group controlId="formBasicEmail">
								    <Form.Label>{props.nombre?"Nuevo nombre de usuario":"Contraseña"}</Form.Label>
								    <Form.Control type="email" className="pb-3 pt-3 TextoFormulario"  placeholder={props.nombre?"Ingrese el nuevo nombre de usuario":"Ingrese la contraseña"} />
								  </Form.Group>
								  <Form.Group controlId="formBasicPassword">
								    <Form.Label>{props.nombre? "Contraseña":"Nueva contraseña"}</Form.Label>
								    <Form.Control type="Contraseña" className="pb-3 pt-3 TextoFormulario"  placeholder={props.nombre?"Ingrese la contrasena":"Ingrese la nueva contraseña"} />
								  </Form.Group>
								  <Link to="/inicio" className="text-reset">
								  	<Button variant="dark" type="submit" Button variant="dark" size="lg" block className="pt-0 pb-1 mt-1 mb-2 TextoBoton">
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

export default Configuracion;