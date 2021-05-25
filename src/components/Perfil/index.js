import React from 'react';
import styles from "../../css/general.css";
import { Container, Row, Col, Image, Form, Button, Nav, Navbar, FormControl, Card, Accordion, Pagination } from "react-bootstrap";
import Logo from "../../media/logo.png";
import Navbar1 from "../Navbar";
import Carta from "../Card";
import Aside from "../Aside";
import axios from "axios";

class Perfil extends React.Component{
	constructor(props){
		super(props)
		this.state = {
			todos:
				{titulo: "Yzy - 2020", precio:"120.000 - 180.000", tallas:["34","23","40","30"], colores:["azul", "naranjado", "negro", "naranjado"]}
		}
	}
	componentDidMount(){
		this.getDatos();
	}
	
	async getDatos(){
	  const datos = await axios.get("http://localhost:4000/api/products");
	  this.setState({products:datos.data});
	  console.log(datos.data);
	}
	render(){
		const {titulo, precio, tallas, colores} = this.state.todos
	  return (
	    <Container fluid className="Ampliador">
	    	<Row className="Ampliador">
					<Navbar1/>
					{(window.screen.width<992)?
	    		<Col lg={12} className="SinEspacios">
	    			<Aside tipo="perfil" />
	    		</Col>
					:
					<div></div>}
	    		<Col lg={12} className="SinEspacios mb-4">
	    			<Carta tipo="perfil"/>
	    			<Carta tipo="cartas" numero={1}/>
	    			<Carta tipo="cartas" numero={1}/>
	    		</Col>
	    	</Row>
	    </Container>
	  );
	}
}

export default Perfil;