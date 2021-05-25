import React,{useState} from 'react';
import styles from "../../css/general.css"
import { Container, Row, Col, Image, Form, Button } from "react-bootstrap";
import Navbar1 from "../Navbar";
import Aside from "../Aside";
import { BsDownload } from "react-icons/bs";
import {Link} from "react-router-dom";
import axios from "axios";


const AnadirP = (props) => {
  const [inputValues, setInputValues] = useState({
    img:null,
		nombre:"",
		referencia:"",
		tipo:"hombre",
		categoria:"clasicos",
		precio:0
  });
	const subirImg = (event)=>{
		console.log(event.target.files[0])
		const values = event.target.files[0]
		setInputValues({...inputValues, img:event.target.files[0]})
	}
  const handleOnChange = (event) => {
    console.log(event.target.value)
    const { name, value } = event.target;
    setInputValues({ ...inputValues, [name]: value });
  };
  const registrar=async(e)=>{
			e.preventDefault()
			console.log(inputValues.img)
    	await axios.post("http://localhost:4000/api/products",{
			img:inputValues.img,
			nombre:inputValues.nombre,
			referencia:inputValues.referencia,
			tipo:inputValues.tipo,
			categoria:inputValues.categoria,
			element:[],
			precio:inputValues.precio
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
	    		<Col lg={4} md={6} sm={7} xs={8} className="d-flex text-dark-center justify-content-center flex-column minimo m-auto">
	    			<h1 className={window.screen.width<700?"text-dark pl-2 margent":"text-dark pl-2"}>Añadir plantilla</h1>
	    			<Form encType = "multipart/form-data">
	    				<Form.Row className="pl-2">
							  <Form.Group controlId="formBasicEmail" className="mr-3">
							    <Form.Label>Nombre</Form.Label>
							    <Form.Control type="email" style={{width:"13em" ,minWidth:"8em"}} className="pb-3 pt-3 TextoFormulario" 
									 placeholder="Ingrese el nombre" name="nombre" value={inputValues.nombre} onChange={handleOnChange} 
									/>
							  </Form.Group>
							  <Form.Group controlId="formBasicEmail">
							    <Form.Label>Referencia</Form.Label>
							    <Form.Control type="email" style={{width:"13em" ,minWidth:"8em"}} className="pb-3 pt-3 TextoFormulario"
									  placeholder="Ingrese la referencia" name="referencia" value={inputValues.referencia} onChange={handleOnChange}
									/>
							  </Form.Group>
						  </Form.Row>
	    				<Form.Row className="pl-2">
							  <Form.Group controlId="formBasicEmail" className="mr-3">
							    <Form.Label>Precio</Form.Label>
							    <Form.Control type="email" style={{width:"13em" ,minWidth:"8em"}} className="pb-3 pt-3 TextoFormulario"
									  placeholder="Ingrese el precio" name="precio" value={inputValues.precio} onChange={handleOnChange}
									/>
							  </Form.Group>
							  <Form.Group controlId="formBasicEmail" className="mr-3" >
							    <Form.Label className="d-block">Seleccione el tipo</Form.Label>
							    <select style={{width:"12em" ,minWidth:"5rem",height:"2.4rem"}} className="px-3 rounded py-2 TextoFormulario text-muted" 
										name="tipo" value={inputValues.tipo} onChange={handleOnChange}
									>
								    <option selected value="hombre">Hombre</option>
								    <option value="mujer">Mujer</option>
								    <option value="niño">Niño</option>
								    <option value="niña">Niña</option>
									</select>
							  </Form.Group>
							</Form.Row>
	    				<Form.Row encType="multipart/form-data" className="pl-2">
							  <Form.Group controlId="formBasicPassword" className="mr-3">
							    <Form.Label className="d-block">Seleccione categoria</Form.Label>
							    <select style={{width:"12em" ,minWidth:"7rem",height:"2.4rem"}} className="px-3 rounded py-2 TextoFormulario text-muted" 
										name="categoria" value={inputValues.categoria} onChange={handleOnChange}
									>
								    <option selected value="deportivos">Deportivos</option>
								    <option value="clasicos">Clasicos</option>
								    <option value="sandalias">Sandalias</option>
								    <option value="tenis">Tenis</option>
								    <option value="colegiales">Colegiales</option>
									</select>
								</Form.Group>
							  <div className="mt-2">
									<Form.File id="exampleFormControlFile1" name="img" label="Example file input" onChange={subirImg}/>
							  	<BsDownload className="ml-1" size="1.4em"/>
							  </div>
							</Form.Row>
							{/*<Link to="/añadir" className="text-reset">*/}
							  <Button variant="dark" type="submit" Button variant="dark" size="lg" block 
									className="pt-0 pb-1 mt-1 mb-2TextoBoton" formEncType="multipart/form-data" onClick={registrar}
								>
								    Añadir plantilla
							  </Button>
						  {/*</Link>*/}
						</Form>
	    		</Col>
	    	</Row>
	    </Container>
    </div>
  );
}

export default AnadirP;
