import React from 'react';
import styles from "../../css/general.css";
import { Container, Row, Col, Image, Form, Button, Nav, Navbar, FormControl, Card, Accordion, Pagination } from "react-bootstrap";
import Logo from "../../media/logo.png";
import grafico1 from "../../media/grafico1.png";
import grafico2 from "../../media/grafico2.jpg";
import grafico3 from "../../media/grafico3.jpg";
import grafico4 from "../../media/grafico4.jpg";
import Navbar1 from "../Navbar";
import Carta from "../Card";
import Aside from "../Aside";

class Estadisticas extends React.Component{
	constructor(props){
		super(props)
	}
	render(){
	  return (
	    <Container fluid className="Ampliador">
	    	<Row className="Ampliador">
					<Navbar1/>
					{(window.screen.width<992)?
	    		<Col lg={12} className="SinEspacios">
	    			<Aside admin tipo="estadisticas" />
	    		</Col>
					:
					<div></div>}
	    	</Row>
	    	<Row className="Ampliador pb-5 px-5">
	    		<Col lg={12} className="SinEspacios">
	    			<Carta tipo="grafico" title="Grafico de productos vendidos por vendedor">
	    				<img src={grafico1}/>
	    			</Carta>
	    		</Col><Col lg={12} className="SinEspacios">
	    			<Carta tipo="grafico" title="Grafico de ventas por dia">
	    				<img src={grafico2}/>
	    			</Carta>
	    		</Col><Col lg={12} className="SinEspacios">
	    			<Carta tipo="grafico" title="Grafico de marcas mas vendidas">
	    				<img src={grafico3}/>
	    			</Carta>
	    		</Col><Col lg={12} className="SinEspacios">
	    			<Carta tipo="grafico" title="Grafico de ventas al dia por genero">
	    				<img src={grafico4}/>
	    			</Carta>
	    		</Col>
	    	</Row>
	    </Container>
	  );
	}
}

export default Estadisticas;