import React from 'react';
import styles from "../../css/general.css";
import { Container, Row, Col, Image, Form, Button, Nav, Navbar, FormControl, Card, Accordion, Pagination, Badge } from "react-bootstrap";
import Logo from "../../media/logo.png";
import Navbar1 from "../Navbar";
import Carta from "../Card";
import Añadirc from "../Añadirc";
import Aside from "../Aside";
import Comprar from "../Comprar";
import axios from "axios";
import { useParams } from 'react-router';

class Producto extends React.Component{
	constructor(props){
		super(props)
		this.state = {
			products:[],
			product:{},
			user:{},
			vaux:"",
			vbtn:true
		}
		this.getDatos = this.getDatos.bind(this);
		this.añadirc = this.añadirc.bind(this);
		this.comprar = this.comprar.bind(this);
		this.original = this.original.bind(this);
		this.bajarc = this.bajarc.bind(this);
		this.añadirv = this.añadirv.bind(this);
		this.addcompra = this.addcompra.bind(this);
  }
  componentDidMount(){
	  this.getDatos();
  }
  
  async getDatos(){
	const datos = await axios.get("http://localhost:4000/api/products");
	const use = await axios.get("http://localhost:4000/api/users/6025b4f8df101221d86d2a60")
	const user = use.data
	const produc = await axios.get("http://localhost:4000/api/products/"+this.props.match.params.id)
	const product = produc.data
	this.setState({
		products:datos.data,
		product,
		user
	});
  }
  añadirc() {
    this.setState(state => ({
	      vaux: "añadirc",
	    })
    );
  }
  comprar() {
    this.setState(state => ({
	      vaux: "comprar"
	    })
    );
  }
  original() {
    this.setState(state => ({
	      vaux: ""
	    })
    );
  }
  async bajarc() {
	const indicet  = this.state.user.car.findIndex(elm=>
		elm._id == this.state.product._id
	)
	var carusr = this.state.user.car
	console.log(carusr)
	carusr.splice(indicet,1)
	const usr = {
		...this.state.user,
		car:carusr
	}
	console.log(usr)
	await axios.put("http://localhost:4000/api/users/6025b4f8df101221d86d2a60",usr)
    this.setState(state => ({
	      vbtn: !state.vbtn,
		  user:usr
	    })
    );
	this.getDatos()
  }
  añadirv(){
    this.setState(state => ({
	      vaux: "",
	      vbtn: !state.vbtn
	    })
    );
	this.getDatos()
  }
  addcompra(){
    this.setState(state => ({
	      vaux: ""
	    })
    );
  }


	render(){
		const { vbtn, vaux, products } = this.state
		const { añadirc, comprar, original, bajarc, añadirv, addcompra } = this
		switch(vaux){
			case "añadirc":
			  return (
			    <Container fluid className="Ampliador">
			    	<Row className="Ampliador">
							<Navbar1/>
			    		<Col lg={12} className="SinEspacios mb-4">
			    			<Carta tipo="producto" btn={vbtn} ActionAñadir={vbtn?añadirc:bajarc} 
							Actioncomprar={comprar} id={this.props.match.params.id}/>
			    			<Carta numero={1}/>
			    			<Carta numero={1}/>
			    		</Col>
			    	</Row>
			    	<Añadirc id={this.props.match.params.id} actionbajar={original} actionsubir={añadirv}/>
			    </Container>
			  )
			case "comprar":
			  return (
			    <Container fluid className="Ampliador">
			    	<Row className="Ampliador">
							<Navbar1/>
			    		<Col lg={12} className="SinEspacios mb-4">
			    			<Carta tipo="producto" btn={vbtn} ActionAñadir={vbtn?añadirc:bajarc} 
							Actioncomprar={comprar} id={this.props.match.params.id}/>
			    			<Carta numero={1}/>
			    			<Carta numero={1}/>
			    		</Col>
			    	</Row>
			    	<Comprar actionToPerform={original} actionbuy={addcompra}/>
			    </Container>
			  )
			default:
			  return (
			    <Container fluid className="Ampliador">
			    	<Row className="Ampliador">
							<Navbar1/>
								{(window.screen.width<992)?
				    		<Col lg={12} className="SinEspacios">
				    			<Aside admin tipo="producto" />
				    		</Col>
								:
								<div></div>}
			    		<Col lg={12} className="SinEspacios mb-4">
			    			<Carta tipo="producto" btn={vbtn} ActionAñadir={vbtn?añadirc:bajarc} 
							Actioncomprar={comprar} id={this.props.match.params.id}/>
			    			<Carta numero={1}/>
			    			<Carta numero={1}/>
			    		</Col>
			    	</Row>
			    </Container>
			  )
		}
	}
}

export default Producto;