import React from 'react';
import styles from "../../css/general.css";
import { Container, Row, Col, Image, Form, Button, Nav, Navbar, FormControl, Card, Accordion, Pagination } from "react-bootstrap";
import Navbar1 from "../Navbar";
import Carta from "../Card";
import Aside from "../Aside";



const Añadir = (props) => {
		return (
	  	<div>
		    <Container fluid className="Ampliador SinEspacios contenedor">
		    	<Row className="Ampliador contenedor">
		    		<Navbar1/>
		    		<Col lg={2} className="SinEspacios">
		    			<Aside admin tipo="añadir"/>
		    		</Col>
		    		<Col lg={10} className="SinEspacios py-4">
		    			<h1 className="text-dark mx-5">Crear plantilla</h1>
		    			<Carta className="p-5" tipo="addplantilla"/>
		    			<h1 className="text-dark mx-5">Usar plantilla</h1>
		    			<Carta tipo="plantillas" numero={3}/>
		    		</Col>
		    	</Row>
		    </Container>
	    </div>
	  );
  
}

export default Añadir;