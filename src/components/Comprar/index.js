import React from 'react';
import styles from "../../css/general.css"
import { Container, Row, Col, Image, Form, Button, Badge, Card, Tab, Tabs } from "react-bootstrap";
import Navbar1 from "../Navbar";
import Aside from "../Aside";
import { BsDownload } from "react-icons/bs";
import tenisrosado from "../../media/tenis-rosado.jfif";
import { BiX }  from "react-icons/bi";
import axios from "axios";

class Añadirc extends React.Component {
	constructor(props){
		super(props)
		this.state = {
			user:{
				car:[]
			}
		}
		this.total = this.total.bind(this);
		this.bajarc = this.bajarc.bind(this);
		this.producto = this.producto.bind(this);
		this.getuser = this.getuser.bind(this);
		this.pagar = this.pagar.bind(this);
	}
	async componentDidMount(){
		const user= await this.getuser()
		var values = 0
		for(var i =0; i<user.car.length;i++){
			var copias=0
			for(var e =0; e<user.car[i].element.length;e++){
				copias+=parseInt(user.car[i].element[e].cantidad)
			}

			values += parseInt(user.car[i].precio)*copias
		}
		this.setState({
			user,
			values
		});
	}
	async pagar(){
		var resultado = this.state.user
		var purch = resultado.car
		resultado.car = []
		resultado.purchases = resultado.purchases.push(purch)
		console.log(resultado)
		const usr = await axios.put("http://localhost:4000/api/users/6025b4f8df101221d86d2a60",resultado)

		this.props.actionbuy()
	}
	async getuser(){
		const usr = await axios.get("http://localhost:4000/api/users/6025b4f8df101221d86d2a60")
		const user = usr.data
		return user
	}
	async bajarc(x,y){
		var user = this.state.user
		const prod = await axios.get("http://localhost:4000/api/products")
		var product = prod.data
		const indic = product.findIndex((elm)=> elm._id=user.car[x]._id)
		if(indic==-1){
			product.push(user.car[x])
		}
		else{
			const inde = product[indic].element.findIndex((elm)=> elm.talla==user.car[x].element[y].talla && elm.color==user.car[x].element[y].color)
			if(inde==-1){
				product[indic].element.push(user.car[x].element[y])
			}
			else{
				product[indic].element[inde].cantidad = (parseInt(product[indic].element[inde].cantidad)+parseInt(user.car[x].element[y].cantidad)).toString()
			}
		}
		if(user.car[x].element.length>1){
			user.car[x].element.splice(y,1)
		}
		else{
			if(user.car.length=1){
				user.car = []
				this.props.actionbuy()
			}
			else{
				user.car[x] = []
			}
		}
		await axios.put("http://localhost:4000/api/products/"+product[indic]._id,product[indic])
		await axios.put("http://localhost:4000/api/users/6025b4f8df101221d86d2a60",user)
		this.setState({user})
	}
	total(){
		const valor = this.state.values
		console.log(valor)
		return(
				<div>
				<hr className="text-light mt-3" style={{borderColor:"white"}}></hr>
				<h5 className="text-light float-left">Total</h5>
				<h5 className="text-light float-right">{valor}</h5>
			</div>
		)
	}
	producto(){
		var user = this.state.user
		console.log(user.car)
		if(user.car != undefined){
			return(
				user.car.map((carroi,index)=>{
					const nombr = carroi.nombre
					const ref = carroi.referencia
					const price = parseInt(carroi.precio)
					return(
						carroi.element.map((todo,ubicacion)=>{
								return(
									<div className="d-inline mt-3 flex-row justify-content-arround" key={index}>
										<div className="outline mx-2 mt-3">
											<img style={{width:"3rem", height:"3rem"}} src={tenisrosado} className="d-inline rounded m-3"/>
											<p className="text-light my-4 py-2 d-inline">{nombr}<span className="text-transparent">{ref}</span></p>
											{parseInt(todo.cantidad)>1?<p className="text-light mx-4 my-4 py-2 d-inline">x{todo.cantidad}</p>:<p className="d-inline"></p>}
											<BiX color="white" size="1.2em" onClick={()=>{this.bajarc(index,ubicacion)}} className="float-right d-inline-block mt-2 mr-2 cerrar"/>
											<p className="text-light mx-3 my-4 py-2 d-inline float-right">{(parseInt(todo.cantidad)*price).toString()}</p>
										</div>
									</div>
								)
						})
					)
				})
			)
		}
	}
	render (){
		const { todos, user } = this.state
		const { actionToPerform, actionbuy } = this.props
		const {bajarc} = this
		var variv= 100
		var i=0
	  return (
	  	<div className="d-flex text-dark-center align-items-center justify-content-center SinEspacios fixed-top largo transparente">
	  		<BiX color="white" size="1.5em" style={{position:"absolute", top:"2em", right:"2em",zIndex:1}} onClick={actionToPerform}/>
		    <Container fluid className="Ampliador SinEspacios contenedor">
		    	<Row className="Ampliador contenedor">
		    		<Col  lg={12} className="d-flex text-dark-center justify-content-center flex-column m-auto largo p-4">
		    			{window.screen.width<950?
				  			<div className="d-flex flex-column notanlargo scroll">
								  <div className="fondo completo p-4 minimo">
								  	<h3 className="text-light mt-3 text-center">Factura</h3>
								  	<div style={{height:"80%"}} className="scroll">
							  			{this.producto()}
								  	</div>
								  	{this.total()}
								  </div>
								  <div className="bg-light completo p-4 minimo">
								  	<h3 className="text-dark my-3 text-center">Metodo de pago</h3>
								  	<Tabs defaultActiveKey="Tarjeta" id="uncontrolled-tab-example">
										  <Tab eventKey="Efectivo" title="Efectivo">
										    <div>
										    </div>
										  </Tab>
										  <Tab eventKey="Tarjeta" title="Tarjeta">
										    <div className="p-4" style={{height:"24rem"}}>
											    <Form.Row>
											    	<Form.Group as={Col} controlId="formBasicEmail">
													    <Form.Label>Numero de tarjeta</Form.Label>
													    <Form.Control type="email" className="pb-3 pt-3 TextoFormulario"  placeholder="Ingrese el numero de tarjeta" />
													  </Form.Group>
											    	<Form.Group  as={Col} controlId="formBasicPassword">
													    <Form.Label>CVC-CVV</Form.Label>
													    <Form.Control type="email" className="pb-3 pt-3 TextoFormulario"  placeholder="Ingrese cvc-cvv" />
													  </Form.Group>
										    	</Form.Row>
										    		<p className="mb-1">Fecha de caducidad</p>
										    	<Form.Row>
											    	<Form.Group controlId="formBasicEmail" className="mr-2">
													    <Form.Control type="email" style={{width:"6em"}} className="TextoFormulario"  placeholder="DD" />
													  </Form.Group>
											    	<Form.Group controlId="formBasicEmail" className="mr-2">
													    <Form.Control type="email" style={{width:"6em"}} className="TextoFormulario"  placeholder="MM" />
													  </Form.Group>
											    	<Form.Group controlId="formBasicEmail" className="mr-2">
													    <Form.Control type="email" style={{width:"6em"}} className="TextoFormulario"  placeholder="AA" />
													  </Form.Group>
										    	</Form.Row>
										    </div>
										  </Tab>
										  <Tab eventKey="Transferencia" title="Transferencia">
										    <div>
										    </div>
										  </Tab>
										  <Tab eventKey="Giro" title="Giro">
										    <div>
										    </div>
										  </Tab>
										  <Tab eventKey="PayPal" title="PayPal">
										    <div>
										    </div>
										  </Tab>
										</Tabs>
										<div className="completo d-flex justify-content-center">
									    <Button variant="dark" onClick={this.pagar}>
									    	Pagar
									    </Button>
									  </div>
								  </div>
								</div>
									:
				  			<div className="d-flex flex-row notanlargo">
								  <div className="bg-light mitad p-4">
								  	<h3 className="text-dark my-3 text-center">Metodo de pago</h3>
								  	<Tabs defaultActiveKey="Tarjeta" id="uncontrolled-tab-example">
										  <Tab eventKey="Efectivo" title="Efectivo">
										    <div>
										    </div>
										  </Tab>
										  <Tab eventKey="Tarjeta" title="Tarjeta">
										    <div className="p-4" style={{height:"24rem"}}>
											    <Form.Row>
											    	<Form.Group as={Col} controlId="formBasicEmail">
													    <Form.Label>Numero de tarjeta</Form.Label>
													    <Form.Control type="email" className="pb-3 pt-3 TextoFormulario"  placeholder="Ingrese el numero de tarjeta" />
													  </Form.Group>
											    	<Form.Group  as={Col} controlId="formBasicPassword">
													    <Form.Label>CVC-CVV</Form.Label>
													    <Form.Control type="email" className="pb-3 pt-3 TextoFormulario"  placeholder="Ingrese cvc-cvv" />
													  </Form.Group>
										    	</Form.Row>
										    		<p className="mb-1">Fecha de caducidad</p>
										    	<Form.Row>
											    	<Form.Group controlId="formBasicEmail" className="mr-2">
													    <Form.Control type="email" style={{width:"6em"}} className="TextoFormulario"  placeholder="DD" />
													  </Form.Group>
											    	<Form.Group controlId="formBasicEmail" className="mr-2">
													    <Form.Control type="email" style={{width:"6em"}} className="TextoFormulario"  placeholder="MM" />
													  </Form.Group>
											    	<Form.Group controlId="formBasicEmail" className="mr-2">
													    <Form.Control type="email" style={{width:"6em"}} className="TextoFormulario"  placeholder="AA" />
													  </Form.Group>
										    	</Form.Row>
										    </div>
										  </Tab>
										  <Tab eventKey="Transferencia" title="Transferencia">
										    <div>
										    </div>
										  </Tab>
										  <Tab eventKey="Giro" title="Giro">
										    <div>
										    </div>
										  </Tab>
										  <Tab eventKey="PayPal" title="PayPal">
										    <div>
										    </div>
										  </Tab>
										</Tabs>
										<div className="completo d-flex justify-content-center">
									    <Button variant="dark" onClick={this.pagar}>
									    	Pagar
									    </Button>
									  </div>
								  </div>
								  <div className="fondo mitad p-4">
								  	<h3 className="text-light mt-3 text-center">Factura</h3>
								  	<div style={{height:"80%"}} className="scroll">
							  			{this.producto()}
								  	</div>
								  	{this.total()}
								  </div>
								</div>
		    			}
			    	</Col>
		    	</Row>
		    </Container>
	    </div>
		);
	}
}

export default Añadirc;