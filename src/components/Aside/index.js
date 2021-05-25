import React from 'react';
import styles from "../../css/general.css";
import { Form, Button, FormControl, Accordion } from "react-bootstrap";
import Logo from "../../media/logo.png";
import {Link} from "react-router-dom";

var tam=0
function tamaño(){
 tam = window.screen.width
 console.log(tam<992)
 return (tam<992)
}
function tipos(x){
	return(
		<div>
			<h5 className="trans text-light px-3 pt-4" type="button" data-toggle="collapse" data-target="#tipos" aria-expanded="false" aria-controls="tipos">
		    Tipos
		  </h5>
		  <div className="collapse mt-4 mb-n3" id="tipos">
			  <div className="bg-light MenuSombra">
			  	<Form>
					  <Form.Group controlId="formBasicCheckbox">
					    <Form.Check className="py-2 px-5" name="tipo" onClick={x} type="checkbox" id="Hombre" label="Hombre" />
					    <Form.Check className="py-2 px-5" name="tipo" onClick={x} type="checkbox" id="Mujer" label="Mujer" />
					    <Form.Check className="py-2 px-5" name="tipo" onClick={x} type="checkbox" id="Niño" label="Niño" />
					    <Form.Check className="py-2 px-5" name="tipo" onClick={x} type="checkbox" id="Niña" label="Niña" />
					  </Form.Group>
				  </Form>
			  </div>
			</div>
		</div>
	)
}

function inicio(){
	return(
		<h5 className="text-light px-3 pt-4"><Link to="/" className="notline text-light">Inicio</Link></h5>
	)
}
function clases(x){
	return(
		<div>
			<h5 className="trans text-light px-3 pt-4" type="button" data-toggle="collapse" data-target="#clases" aria-expanded="false" aria-controls="clases">
			    Clases
			  </h5>
			  <div className="collapse mt-4 mb-n3" id="clases">
				  <div className="bg-light MenuSombra">
				  	<Form>
						  <Form.Group controlId="formBasicCheckbox">
						    <Form.Check className="py-2 px-5" name="categoria" onClick={x} type="checkbox" id="Deportivos" label="Deportivos" />
						    <Form.Check className="py-2 px-5" name="categoria" onClick={x} type="checkbox" id="Tenis" label="Tenis" />
						    <Form.Check className="py-2 px-5" name="categoria" onClick={x} type="checkbox" id="Clasicos" label="Clasicos" />
						    <Form.Check className="py-2 px-5" name="categoria" onClick={x} type="checkbox" id="Colegiales" label="Colegiales" />
						    <Form.Check className="py-2 px-5" name="categoria" onClick={x} type="checkbox" id="Sandalias" label="Sandalias" />
						  </Form.Group>
					  </Form>
				  </div>
				</div>
		</div>
	)
}

function tallas(x){
	return(
		<div>
			<h5 className="trans text-light px-3 pt-4" type="button" data-toggle="collapse" data-target="#tallas" aria-expanded="false" aria-controls="tallas">
		    Tallas
		  </h5>
		  <div className="collapse mt-4 mb-n3" id="tallas">
			  <div className="bg-light MenuSombra">
			  	<Form>
					  <Form.Group controlId="formBasicCheckbox">
					    <Form.Check className="py-2 px-5" name="talla" onClick={x} type="checkbox" id="36" label="36" />
					    <Form.Check className="py-2 px-5" name="talla" onClick={x} type="checkbox" id="37" label="37" />
					    <Form.Check className="py-2 px-5" name="talla" onClick={x} type="checkbox" id="38" label="38" />
					    <Form.Check className="py-2 px-5" name="talla" onClick={x} type="checkbox" id="39" label="39" />
					    <Form.Check className="py-2 px-5" name="talla" onClick={x} type="checkbox" id="40" label="40" />
					    <Form.Check className="py-2 px-5" name="talla" onClick={x} type="checkbox" id="41" label="41" />
					  </Form.Group>
				  </Form>
			  </div>
			</div>
		</div>
	)
}

function perfil(){
	return(
		<h5 className="text-light px-3 pt-4"><Link to="/perfil" className="notline text-light">Perfil</Link></h5>
	)
}

function configuracion(){
	return(
		<div>
		  <h5 className="trans text-light px-3 pt-4" type="button" data-toggle="collapse" data-target="#configuracion" aria-expanded="false" aria-controls="configuracion">
		    Configuracion
		  </h5>
		  <div className="collapse pt-3 mb-0" id="configuracion">
			  <div className="bg-light MenuSombra">
			    <p className="pt-2 mx-4"><Link to="/cambiarcontraseña" className="notline text-dark">Cambiar contraseña</Link></p>
			    <p className="py-2 mx-4"><Link to="/cambiarnombre" className="notline text-dark">Cambiar nombre de usuario</Link></p>
			  </div>
			</div>
		</div>
	)
}

function estadisticas(){
	return(
		<h5 className="text-light px-3 pt-4"><Link to="/estadisticas" className="notline text-light">Estadisticas</Link></h5>
	)
}

function añadir(){
	return(
		<h5 className="text-light px-3 pt-4"><Link to="/añadir" className="notline text-light">Añadir producto</Link></h5>
	)
}

function comprar(action){
	return(
		<h5 className="trans pointer text-light px-3 pt-4" onClick={action}>Comprar</h5>
	)
}

function estilos(x,y){
	if(x()){
		return(
			"bg-dark collapse pb-3"
		)
	}
	else {
		console.log("menor peque")
		console.log(x())
		if(!x() && y){
			return(
				"bg-dark minimo pb-3 scroll"
			)
		}
		else{
			return(
				"pb-3 bg-dark menu scroll"
			)
		}
	}
}

const Aside =(props)=>{
	switch(props.tipo){
		case "añadir":
			return(
				<div className={estilos(tamaño,props.min)} id="navbarNav">
					{window.screen.width<576? inicio():null}
					{tipos()}
				  {clases()}
					{perfil()}
				  {configuracion()}
					{estadisticas()}
				</div>
			)
		case "añadirx":
			return(
				<div className={estilos(tamaño,props.min)} id="navbarNav">
					{window.screen.width<576? inicio():null}
					{perfil()}
				  {configuracion()}
					{estadisticas()}
				</div>
			)
		case "configuracion":
			return(
				<div className={estilos(tamaño,props.min)} id="navbarNav">
					{window.screen.width<576? inicio():null}
					{perfil()}
				  {configuracion()}
					{estadisticas()}
					{añadir()}
				</div>
			)
		case "perfil":
			return(
				<div className={estilos(tamaño,props.min)} id="navbarNav">
					{window.screen.width<576? inicio():null}
				 	{configuracion()}
					{estadisticas()}
					{añadir()}
				</div>
			)
		case "producto":
			return(
				<div className={estilos(tamaño,props.min)} id="navbarNav">
					{window.screen.width<576? inicio():null}
					{perfil()}
				  {configuracion()}
					{estadisticas()}
					{añadir()}
				</div>
			)
		case "estadisticas":
			return(
				<div className={estilos(tamaño,props.min)} id="navbarNav">
					{window.screen.width<576? inicio():null}
					{perfil()}
				  {configuracion()}
					{añadir()}
				</div>
			)
		default:
			return(
				<div className={estilos(tamaño,props.min)} id="navbarNav">
					{tipos(props.actionToSearch)}
				  {clases(props.actionToSearch)}
					{tallas(props.actionToSearch)}
					{perfil()}
				  {configuracion()}
					{estadisticas()}
					{añadir()}
					{comprar(props.actionToPerform)}
				</div>
			)
	}
}

export default Aside;