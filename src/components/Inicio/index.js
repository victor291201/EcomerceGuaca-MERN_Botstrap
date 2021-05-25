import React from 'react';
import styles from "../../css/general.css";
import { Container, Row, Col, Image, Form, Button, Nav, Navbar, FormControl, Card, Accordion, Pagination } from "react-bootstrap";
import Navbar1 from "../Navbar";
import Carta from "../Card";
import Aside from "../Aside";
import Comprar from "../Comprar";
import axios from "axios";



class Inicio extends React.Component {
	constructor(props){
		super(props)
		this.state = {
			comprar:false,
			criterios:{tipo:[],talla:[],categoria:[],cadena:""}
		};
		this.handleClick = this.handleClick.bind(this);
		this.compraro = this.compraro.bind(this);
		this.busquedas = this.busquedas.bind(this);
		this.enviardatos = this.enviardatos.bind(this);
  }
  busquedas(e){
		var valor = e.target.id;
		if(e.target.name == "tipo"){
			var retorno = this.state.criterios.tipo
			if(retorno.some(elm => elm == valor)){
				retorno.splice(retorno.findIndex(elm => elm == valor),1);
			}
			else{
				retorno.push(valor)
			}
			this.setState(prevstate=>({
				criterios:{...prevstate.criterios, tipo:retorno}
			}))
		}
		else{
			if(e.target.name == "talla"){
				var retorno = this.state.criterios.talla
				if(retorno.some(elm => elm == valor)){
					retorno.splice(retorno.findIndex(elm => elm == valor),1);
				}
				else{
					retorno.push(valor)
				}
				this.setState(prevstate=>({
					criterios:{...prevstate.criterios, talla:retorno}
				}))
			}
			else{
				if(e.target.name == "categoria"){
					var retorno = this.state.criterios.categoria
					if(retorno.some(elm => elm == valor)){
						retorno.splice(retorno.findIndex(elm => elm == valor),1);
					}
					else{
						retorno.push(valor)
					}
					this.setState(prevstate=>({
						criterios:{...prevstate.criterios, categoria:retorno}
					}))
				}
			}
		}
	}
	enviardatos(x){
		this.setState(prevstate=>({
			criterios:{...prevstate.criterios, cadena:x}
		}))
	}
  handleClick() {
    this.setState(state => ({
	      comprar: !state.comprar
	    })
    );
  }
  compraro() {
    this.setState(state => ({
	      comprar: !state.comprar
	    })
    );
  }
	render(){
		const {comprar,criterios} = this.state
		const { handleClick, compraro, busquedas, enviardatos } = this;
		if(comprar){
			return(
		  	<div>
			    <Container fluid className="Ampliador SinEspacios contenedor">
			    	<Row className="Ampliador contenedor">
			    		<Navbar1 actionToSearch={busquedas} enviarDatos={this.enviardatos}/>
			    		<Col lg={2} className="SinEspacios">
			    			<Aside actionToSearch={busquedas} actionToPerform={handleClick}/>
			    		</Col>
			    		<Col lg={10} className="SinEspacios mb-4">
							<Carta numero={3} parametros={criterios}/>
							<Carta numero={1} parametros={criterios}/>
							<Carta numero={1} parametros={criterios}/>
			    		</Col>
			    	</Row>
			    </Container>
			    <Comprar actionbuy={compraro} actionToPerform={handleClick}/>
		    </div>
			)
		}
		else{
			return(
		  	<div>
			    <Container fluid className="Ampliador SinEspacios contenedor">
			    	<Row className="Ampliador contenedor">
			    		<Navbar1 actionToSearch={busquedas} enviarDatos={this.enviardatos}/>
			    		<Col lg={2} className="SinEspacios">
			    			<Aside actionToSearch={busquedas} actionToPerform={handleClick}/>
			    		</Col>
			    		<Col lg={10} className="SinEspacios mb-4">
			    			<Carta numero={3} parametros={criterios}/>
			    			<Carta numero={1} parametros={criterios}/>
			    			<Carta numero={1} parametros={criterios}/>
			    		</Col>
			    	</Row>
			    </Container>
		    </div>
			)
		}
	}
}

export default Inicio;