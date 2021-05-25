import React, {useState,useEffect} from 'react';
import styles from "../../css/general.css"
import { Container, Row, Col, Image, Form, Button, Badge} from "react-bootstrap";
import Navbar1 from "../Navbar";
import Aside from "../Aside";
import {Link} from "react-router-dom";
import axios from "axios";


const AnadirE = (props) => {
	const [inputValues, setInputValues] = useState({
	  img:"",
		categoria:"",
		color:"rojo",
		talla:32,
		cantidad:0
	});
  
	const handleOnChange = (event) => {
	  const { name, value } = event.target;
	  setInputValues({ ...inputValues, [name]: value });
	};
	const registrar= async ()=>{
		const datos = await axios.get("http://localhost:4000/api/products/"+props.match.params.id)
		var img = datos.data.img
		var element = datos.data.element
		img.unshift("http://localhost:4000/public/img/img-1613688995016.jpeg");
		element.unshift({
			color:inputValues.color,
			talla:inputValues.talla,
			cantidad:inputValues.cantidad
		})
	  await axios.put("http://localhost:4000/api/products/"+props.match.params.id,{
			img,
			element
		})
	};
  return (
  	<div className="d-flex text-dark-center align-items-center justify-content-center SinEspacios">
	    <Container fluid className="Ampliador SinEspacios contenedor">
		    	<Row className="Ampliador contenedor">
		    		<Navbar1/>
		    		<Col lg={2} className="SinEspacios">
		    			<Aside min admin tipo="añadirx"/>
		    		</Col>
	    		<Col lg={4} md={6} sm={6} xs={8} className="d-flex text-dark-center justify-content-center flex-column minimo m-auto">
	    			<h1 className="text-dark">Añadir producto</h1>
	    			<Form className="text-dark-center">
						  <Form.Group controlId="formBasicEmail">
						    <Form.Label>Color</Form.Label>
						    <Form.Control as="select" name="color" value={inputValues.color}  onChange={handleOnChange}>
							    <option selected value="Negro">Negro</option>
							    <option value="blanco">Blanco</option>
							    <option value="gris">Gris</option>
							    <option value="azul">Azul</option>
							    <option value="verde">Verde</option>
							    <option value="rojo">Rojo</option>
							    <option value="amarillo">Amarillo</option>
							    <option value="naranja">Naranja</option>
							    <option value="cafe">Cafe</option>
							    <option value="rosado">Rosado</option>
							    <option value="morado">Morado</option>
								</Form.Control>
						  </Form.Group>
						  <Form.Group controlId="formBasicEmail">
						    <Form.Label>Talla</Form.Label>
						    <Form.Control as="select" name="talla"value={inputValues.talla} onChange={handleOnChange}>
							    <option selected value="30">30</option>
							    <option value="31">31</option>
							    <option value="32">32</option>
							    <option value="33">33</option>
							    <option value="34">34</option>
							    <option value="35">35</option>
							    <option value="36">36</option>
							    <option value="37">37</option>
							    <option value="38">38</option>
							    <option value="39">39</option>
							    <option value="40">40</option>
							    <option value="41">41</option>
								</Form.Control>
						  </Form.Group>
						  <Form.Group controlId="formBasicRange">
						    <Form.Label>Cantidad <Badge variant="danger">{inputValues.cantidad}</Badge></Form.Label>
						    <Form.Control type="range" name="cantidad" value={inputValues.cantidad} onChange={handleOnChange}/>
						  </Form.Group>
						  <Link to="/añadir" className="text-reset">
							  <Button variant="dark" type="submit" Button variant="dark" size="lg" block 
									className="pt-0 pb-1 mt-1 mb-2 TextoBoton" onClick={registrar}
								>
								    Añadir elemento
							  </Button>
							</Link>
						</Form>
	    		</Col>
	    	</Row>
	    </Container>
    </div>
  );

}

export default AnadirE;