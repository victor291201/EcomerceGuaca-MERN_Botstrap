import React,{ useState, useEffect } from 'react';
import styles from "../../css/general.css"
import { Container, Row, Col, Badge, Form, Button, Card  } from "react-bootstrap";
import Navbar1 from "../Navbar";
import Aside from "../Aside";
import { BsDownload } from "react-icons/bs";
import { BiX } from "react-icons/bi";
import axios from "axios";

const Añadirc = (props) => {
	const[values,setValues] = useState({
		talla:"",
		color:"",
		cantidad:0,
		maxV:0,
		user:{
			car:[],
			purchases:[],
			_id:"6025b4f8df101221d86d2a60",
			nombre:"victor",
			contraseña:"123",
			correo:"victor291asded@gmai.com",
			isAdmin:true,
			sales:{vDia:0,vMes:0,vAño:0,vTotal:0}
		},
		product:{
			img:[],
			element:[],
			_id:"",
			nombre:"",
			referencia:"",
			tipo:"",
			categoria:"",
			precio:"",
			createdAt:"",
			updatedAt:"",
			__v:0
		}
	})
	const fetchTodo = async () => {
		const use = await axios.get("http://localhost:4000/api/users/6025b4f8df101221d86d2a60")
		const user = use.data
		const produc = await axios.get("http://localhost:4000/api/products/"+props.id)
		const product = produc.data
		setValues({
			...values,
			user,
			product
		})
	};
	const handleChange = (event) => {
	  const { name, value } = event.target;
		if(name == "cantidad"){
	  	setValues({ ...values, [name]: value });
		}
		else{
			if(name =="color"){
				const aux = values.product.element.filter(
					(elm)=> elm.color == value
				)
				console.log(aux)
				if(values.talla == ""){
					setValues({ ...values, talla:aux[0].talla, maxV:aux[0].cantidad, [name]:value})
				}
				else{
					const aux1 = aux.filter(
						(elm)=> elm.talla == values.talla
					)
					setValues({ ...values, talla:aux[0].talla, maxV:aux1[0].cantidad, cantidad:0, [name]:value})
				}
			}
			if(name =="talla"){
				const aux = values.product.element.filter(
					(elm)=> elm.talla == value
				)
				console.log(aux)
				if(values.color == ""){
					setValues({ ...values, color:aux[0].color, maxV:aux[0].cantidad, [name]:value})
				}
				else{
					const aux1 = aux.filter(
						(elm)=> elm.color == values.color
					)
					setValues({ ...values, color:aux[0].color, maxV:aux1[0].cantidad, cantidad:0, [name]:value})
				}
			}

		}
		
	};
	const submit= async ()=>{
		const ind = values.product.element.findIndex((elm)=> elm.talla==values.talla && elm.color==values.color)
		const imgaux=values.product.img[ind]
		const elmaux = values.product.element[ind]
		if(values.cantidad<values.product.element[ind].cantidad){
			var aux = values.product.element[ind].cantidad-values.cantidad
			var res = values.product
			res.element[ind].cantidad = aux
			res.img.splice(ind,1)
			setValues({
				...values,
				product:{...values.product,res}
			})
		}
		if(values.product.element[ind].cantidad==values.cantidad){
			const aux = values.product.element
			aux.splice(ind,1)
			setValues({
				...values,
				product:{...values.product,element:[aux]}
			})
		}
		await axios.put("http://localhost:4000/api/products/"+props.id,values.product,values.producto)
		const indicet  = values.user.car.findIndex(elm=>
			elm._id == values.product._id
		)
		if(indicet == -1){
			await axios.put("http://localhost:4000/api/users/6025b4f8df101221d86d2a60",
					{
						...values.user,car:[
							...values.user.car,
							{
								...values.product,
								img:[values.product.img[ind]],
								element:[{...values.product.element[ind], cantidad:values.cantidad}]
							}
						]
					}
				)
		}
		else{
			const indicec = values.user.car[indicet].element.findIndex(
					elm=>elm.talla == values.talla && elm.color == values.color		
				)
			console.log(indicec)
			if(indicec == -1){
				var carupdt =[...values.user.car]
				carupdt[indicet]={
					...values.user.car[indicet],
					img:[...values.user.car[indicet].img,values.product.img[ind]],
					element:[
						...values.user.car[indicet].element,
						{...values.product.element[ind], cantidad:values.cantidad},
					]
				}
				await axios.put("http://localhost:4000/api/users/6025b4f8df101221d86d2a60",
					{
						...values.user,car:[
							...carupdt
						]
					}
				)
			}
			else{
				console.log(values.user.car[indicet])
				console.log(values.user.car[indicet].img)
				console.log(values.user.car[indicet].element)
				console.log(values.user.car[indicet].element[indicec])
				var elementupdt = [...values.user.car[indicet].element]
				elementupdt[indicec] = {
					...elementupdt[indicec],
					cantidad: (parseInt(elementupdt[indicec].cantidad,10) + parseInt(values.cantidad)).toString()
				}
				console.log(elementupdt)
				var carupdt =[...values.user.car]
				carupdt[indicet]={
					...values.user.car[indicet],
					element:[
						...elementupdt,
					]
				}
				await axios.put("http://localhost:4000/api/users/6025b4f8df101221d86d2a60",
					{
						...values.user,car:[
							...carupdt
						]
					}
				)
			}
		}
		props.actionsubir()
	}
	useEffect(()=>{
		fetchTodo()
	},[])
  return (
  	<div className="d-flex text-dark-center align-items-center justify-content-center SinEspacios fixed-top largo transparente">
	    <Container fluid className="Ampliador SinEspacios contenedor">
		    	<Row className="Ampliador contenedor">
		    		<Col  lg={4} md={6} sm={6} xs={8}className="d-flex text-dark-center justify-content-center flex-column m-auto">
	  					<BiX color="gray" size="1.5em" style={{position:"absolute", top:"0.5em", right:"1.5em",zIndex:1}} onClick={props.actionbajar}/>
			  			<Card>
							  <Card.Body>
							    <Card.Title>Añadir al carrito</Card.Title>
				    			<Form className="text-dark-center">
				    				<div className="d-flex text-dark-center justify-content-between flex-row m-auto">
										  <Form.Group controlId="formBasicEmail">
										    <Form.Label>Talla</Form.Label>
										    <Form.Control as="select" value={values.talla} onChange={handleChange} name="talla">
													{ values.color==""?
															values.product.element.map((elm,index)=>{
																if(index==0){
																	return(
																		<option selected value={elm.talla}>{elm.talla}</option>
																	)
																}
																return(
																	<option value={elm.talla}>{elm.talla}</option>
																)
															})

														:
															values.product.element.filter(
																(elm)=> elm.color == values.color
															)
															.map((elm,index)=>{
																if(index==0){
																	return(
																		<option selected value={elm.talla}>{elm.talla}</option>
																	)
																}
																return(
																	<option value={elm.talla}>{elm.talla}</option>
																)
															})
													}
												</Form.Control>
										  </Form.Group>
										  
										  <Form.Group controlId="formBasicEmail">
										    <Form.Label>Color</Form.Label>
										    <Form.Control as="select" value={values.color} onChange={handleChange} name="color">
												{ values.talla==""?
															values.product.element.map((elm,index)=>{
																if(index==0){
																	return(
																		<option selected value={elm.color}>{elm.color}</option>
																	)
																}
																return(
																	<option value={elm.color}>{elm.color}</option>
																)
															})

														:
															values.product.element.filter(
																(elm)=> elm.talla == values.talla
															)
															.map((elm,index)=>{
																if(index==0){
																	return(
																		<option selected value={elm.color}>{elm.color}</option>
																	)
																}
																return(
																	<option value={elm.color}>{elm.color}</option>
																)
															})
													}
												</Form.Control>
										  </Form.Group>
									  </div>
									  <Form.Group controlId="formBasicRange">
									    <Form.Label>Cantidad <Badge variant="danger">{values.cantidad}</Badge></Form.Label>
									    <Form.Control type="range" value={values.cantidad} onChange={handleChange} name="cantidad" min="0" max={values.maxV.toString()}/>
									  </Form.Group>
									  <Button variant="dark" Button variant="dark"
										 size="lg" block className="pt-0 pb-1 mt-1 mb-2 TextoBoton" onClick={submit}>
										  Añadir
									  </Button>
									</Form>
							  </Card.Body>
							</Card>
			    	</Col>
		    	</Row>
		    </Container>
	    </div>
	  );
}

export default Añadirc;