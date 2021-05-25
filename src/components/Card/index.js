import React from 'react';
import styles from "../../css/general.css";
import { Image, Form, Card, Pagination, Carousel, Button } from "react-bootstrap";
import Logo from "../../media/logo.png";
import tenisazul from "../../media/tenis-azul.jfif";
import tenisrojo from "../../media/tenis-rojo.jfif";
import tenisverde from "../../media/tenis-verde.jfif";
import tenisnegro from "../../media/tenis-negro.jfif";
import tenisgris from "../../media/tenis-gris.jfif";
import tenisamarillo from "../../media/tenis-amarillo.jfif";
import tenisnaranjado from "../../media/tenis-naranjado.jfif";
import tenisrosado from "../../media/tenis-rosado.jfif";
import grafico from "../../media/grafico.png";
import Navbar1 from "../Navbar";
import { BsChevronRight } from "react-icons/bs";
import { AiOutlineRight } from "react-icons/ai";
import { AiOutlineLeft } from "react-icons/ai";
import { AiOutlineLine } from "react-icons/ai";
import { BsPlusCircle } from "react-icons/bs";
import {Link} from "react-router-dom";
import axios from "axios";



class Carta extends React.Component {
	constructor(props){
		super(props)
		this.state = {
      todos:[],
      product:{ img:[], element:[]},
			usuario:{},
			meses:["enero", "febrero","marzo","abril","mayo","junio","julio","agosto","septiembre","octubre","noviembre","diciembre"]
		}
	}
	static defaultProps = {
    id:"602eeebcfc936a0958028f5e",
		parametros:{tipo:[],talla:[],categoria:[],cadena:""}
  }
  async componentDidMount(){
		const datos = await axios.get("http://localhost:4000/api/products");
		const user = await axios.get("http://localhost:4000/api/users");
		const producto = await axios.get("http://localhost:4000/api/products/"+this.props.id);
		this.setState({
			todos:datos.data,
			product:producto.data,
			usuario:user.data[0],
		});
  }
	async componentDidUpdate(prevProps){
		if(this.props.parametros != prevProps.parametros){
				const datos = await axios.get("http://localhost:4000/api/products");
				var resTpo = datos.data
				for (var i = 0; i <this.props.parametros.tipo.length; i++){
					resTpo = resTpo.filter(pr => pr.tipo.toLowerCase() == this.props.parametros.tipo[i].toLowerCase())
				}
				var resCls = resTpo
				for (var i = 0; i <this.props.parametros.categoria.length; i++){
					resCls = resCls.filter(pr => pr.categoria == this.props.parametros.categoria[i])
				}
				var resTla = resCls
				for (var i = 0; i <this.props.parametros.talla.length; i++){
					resTla = resTla.filter(pr => {
						for(var e = 0 ; e<pr.element.length;e++){
							if(pr.element[e].talla == this.props.parametros.talla[i]){
								return true 
							}
						}
						return false
					})
			}
			const resTot = resTla.filter(producto=> producto.nombre.includes(this.props.parametros.cadena)||producto.referencia.includes(this.props.parametros.cadena))
			console.log(resTot)
			this.setState(prevstate=>({
					...prevstate,todos:resTot
				})
			)
		}
	}
	render (){
		const { product, todos, usuario,meses } = this.state
		const { tipo, numero, title, children, btn, Actioncomprar, ActionAñadir } = this.props
		var tam=3
		if(window.screen.width < 1072 && window.screen.width > 703){
			tam=2
		}
		function obtmes(index){
			const m = new Date();
			var mes = m.getMonth()
			if(mes-index-1<0){
				mes = 12*Math.floor((index/mes))-12
			}
			return meses[mes-index-1] + ": " + usuario.registro[index];
		}
		function valsrc (colores){
			switch(colores){
	  		case "rojo":
	  		 return( 
	  		 		tenisrojo
	  		 	)
	  		case "azul":
	  		 return( 
	  		 		tenisazul
	  		 	)
	  		case "verde":
	  		 return( 
	  		 		tenisverde
	  		 	)
	  		case "amarillo":
	  		 return( 
	  		 		tenisamarillo
	  		 	)
	  		case "rosado":
	  		 return( 
	  		 		tenisrosado
	  		 	)
	  		case "negro":
	  		 return( 
	  		 		tenisnegro
	  		 	)
	  		case "gris":
	  		 return( 
	  		 		tenisgris
	  		 	)
	  		case "naranjado":
	  		 return( 
	  		 		tenisnaranjado
	  		 	)
	  		default:
	  			return(
	  				tenisnegro
	  			)
			}
		} 
		function Rendercolor (color, index){
    		switch(color){
    			case "rojo":
    				return(
    				<div className="d-inline-block pb-0 ml-0" style={{background:"red", width: 10, height: 10, margin:5}} key={index}>
	    			</div>
	    			)
    			case "azul":
    				return(
    				<div className="d-inline-block pb-0 ml-0" style={{background:"blue", width: 10, height: 10, margin:5}} key={index}>
	    			</div>
	    			)
    			case "negro":
    				return(
    				<div className="d-inline-block pb-0 ml-0" style={{background:"black", width: 10, height: 10, margin:5}} key={index}>
	    			</div>
	    			)
    			case "gris":
    				return(
    				<div className="d-inline-block pb-0 ml-0" style={{background:"gray", width: 10, height: 10, margin:5}} key={index}>
	    			</div>
	    			)
    			case "verde":
    				return(
    				<div className="d-inline-block pb-0 ml-0" style={{background:"green", width: 10, height: 10, margin:5}} key={index}>
	    			</div>
	    			)
    			case "naranjado":
    				return(
    				<div className="d-inline-block pb-0 ml-0" style={{background:"orangered", width: 10, height: 10, margin:5}} key={index}>
	    			</div>
	    			)
    			case "rosado":
    				return(
    				<div className="d-inline-block pb-0 ml-0" style={{background:"fuchsia", width: 10, height: 10, margin:5}} key={index}>
	    			</div>
	    			)
					case "amarillo":
						return(
						<div className="d-inline-block pb-0 ml-0" style={{background:"yellow", width: 10, height: 10, margin:5}} key={index}>
						</div>
						)
					case "amarillo":
						return(
						<div className="d-inline-block pb-0 ml-0" style={{background:"yellow", width: 10, height: 10, margin:5}} key={index}>
						</div>
						)
					case "azul claro":
						return(
						<div className="d-inline-block pb-0 ml-0" style={{background:"#86C4F0", width: 10, height: 10, margin:5}} key={index}>
						</div>
						)
					case "verde claro":
						return(
						<div className="d-inline-block pb-0 ml-0" style={{background:"#96F086", width: 10, height: 10, margin:5}} key={index}>
						</div>
						)
					case "rojo claro":
						return(
						<div className="d-inline-block pb-0 ml-0" style={{background:"#FF6043", width: 10, height: 10, margin:5}} key={index}>
						</div>
						)
					case "amarillo claro":
						return(
						<div className="d-inline-block pb-0 ml-0" style={{background:"#E5EC59", width: 10, height: 10, margin:5}} key={index}>
						</div>
						)
					case "naranja claro":
						return(
						<div className="d-inline-block pb-0 ml-0" style={{background:"#ECA959", width: 10, height: 10, margin:5}} key={index}>
						</div>
						)
    			case "cafe claro":
    				return(
    				<div className="d-inline-block pb-0 ml-0" style={{background:"#8F7A62", width: 10, height: 10, margin:5}} key={index}>
	    			</div>
	    			)
					case "rosado claro":
						return(
						<div className="d-inline-block pb-0 ml-0" style={{background:"#E87EA5", width: 10, height: 10, margin:5}} key={index}>
						</div>
						)
					case "morado claro":
						return(
						<div className="d-inline-block pb-0 ml-0" style={{background:"#C57EE8", width: 10, height: 10, margin:5}} key={index}>
						</div>
						)
					case "piel":
						return(
						<div className="d-inline-block pb-0 ml-0" style={{background:"#FACB95", width: 10, height: 10, margin:5}} key={index}>
						</div>
						)
					case "dorado":
						return(
						<div className="d-inline-block pb-0 ml-0" style={{background:"#FBFF80", width: 10, height: 10, margin:5}} key={index}>
						</div>
						)
					case "plateado":
						return(
						<div className="d-inline-block pb-0 ml-0" style={{background:"#B9B9B9", width: 10, height: 10, margin:5}} key={index}>
						</div>
						)
					case "azul oscuro":
    				return(
    				<div className="d-inline-block pb-0 ml-0" style={{background:"#030555", width: 10, height: 10, margin:5}} key={index}>
	    			</div>
	    			)
					case "verde oscuro":
						return(
						<div className="d-inline-block pb-0 ml-0" style={{background:"#156F03", width: 10, height: 10, margin:5}} key={index}>
						</div>
						)
					case "rojo oscuro":
						return(
						<div className="d-inline-block pb-0 ml-0" style={{background:"#6F0303", width: 10, height: 10, margin:5}} key={index}>
						</div>
						)
					case "amarillo oscuro":
						return(
						<div className="d-inline-block pb-0 ml-0" style={{background:"#B4A40C", width: 10, height: 10, margin:5}} key={index}>
						</div>
						)
					case "naranja oscuro":
						return(
						<div className="d-inline-block pb-0 ml-0" style={{background:"#B44C0C", width: 10, height: 10, margin:5}} key={index}>
						</div>
						)
					case "cafe oscuro":
						return(
						<div className="d-inline-block pb-0 ml-0" style={{background:"#3B190A", width: 10, height: 10, margin:5}} key={index}>
						</div>
						)
					case "rosado oscuro":
						return(
						<div className="d-inline-block pb-0 ml-0" style={{background:"#A80B3B", width: 10, height: 10, margin:5}} key={index}>
						</div>
						)
					case "morado oscuro":
						return(
						<div className="d-inline-block pb-0 ml-0" style={{background:"#8F086E", width: 10, height: 10, margin:5}} key={index}>
						</div>
						)
	    		default:
	    			return(
    				<div className="d-inline-block pb-0 ml-0" style={{background:"white", width: 10, height: 10, margin:5, fontSize:1, color:"red"}} key={index}>
    					error
	    			</div>
	    			)
	    	}
		}
		function Rendertalla (talla, index){
			return(
				<p className="d-inline-block float-right text-muted my-0 pb-0 ml-2" key={index}> {talla} </p>
			)
		}
		function cartap(numero){
			return(
				todos.map((todo,index)=>{
					if(index<numero){
						return(
		  			<Card  style={{ width: '16rem',height:"23rem" }} className="my-4 box-shadow mx-5" key={index}>
			  			<Link to={"/añadire/"+todo._id} className=" notline text-reset">
							  <Card.Img variant="top" style={{ minWidth: '20%',height:"15.5rem" }}  src= {todo.img[0]} />
							  <Card.Body>
							    <Card.Title>{todo.nombre}</Card.Title>
							    <div className="d-flex mb-0">
								    <p className="mb-0">{todo.tipo} / {todo.categoria}</p>
							    </div>
							    <div className="d-flex justify-content-between mt-0">
								    <p className="text-danger">
								      #{todo.referencia}
								    </p>
								    <p className="float-right text-muted">
								      {todo.precio} $
								    </p>
							    </div>
							  </Card.Body>
							</Link>
						</Card>
						)
					}
					
				})
			)
		}
		function cartan(numero){
			return(
				todos.map((todo,index)=>{
					if(index<numero && todo.element.length>2){
						return(
		  			<Card  style={{ width: '16rem',height:"23rem" }} className="my-4 mx-5 box-shadow" key={index}>
			  			<Link to={"/producto/"+todo._id}  className="notline text-reset">
							  <Card.Img variant="top" style={{ minWidth: '20%',height:"15.5rem" }}  src= {todo.img[0]} />
							  <Card.Body>
							    <Card.Title>{todo.nombre}</Card.Title>
							    <div className="mb-0 px-0 mx-0 d-flex justify-content-between" >
							    	<div className="d-inline-block mr-n1">
									    {todo.element.map((todo, index)=>{
									    	return(Rendercolor(todo.color, index));
									    })}
								    </div>
								    <div className="ml-0 d-inline-block ">
								      {todo.element.map((todo,index)=>{
								      	return(Rendertalla(todo.talla,index));
								      })}
								    </div>
							    </div>
							    <div className="d-flex justify-content-between px-0 mx-0">
								    <p className="text-muted">
								      {todo.referencia}
								    </p>
								    <p className="float-right text-muted">
								      {todo.precio} $
								    </p>
							    </div>
							  </Card.Body>
							</Link>
						</Card>
						)
					}
					
				})
			)
		}
		switch(tipo){
			case "producto":
				console.log(product.img)
        return (
        <Card className="my-5 mx-5">
          <div id="carouselExampleControls" className="carousel slide" style={{width:"100%", height:"30rem"}} data-ride="carousel">
            <ol class="carousel-indicators">
              <AiOutlineLine color="#B0AFB3" style={{height:100,bottom:5}}data-target="#carouselExampleIndicators" data-slide-to="0" className="active"/>
              <AiOutlineLine color="#B0AFB3" style={{height:100,bottom:5}}data-target="#carouselExampleIndicators" data-slide-to="1"/>
              <AiOutlineLine color="#B0AFB3" style={{height:100,bottom:5}}data-target="#carouselExampleIndicators" data-slide-to="2"/>
            </ol>
            <div className="carousel-inner">
							{
							console.log(product.img.length),
							product.img.map((src,index)=>{
								if(index==0){
									return(
										<div className="carousel-item active" key={index}>
											<img style={{width:"100%", height:"30rem"}}  src={src} className="d-block w-100"/>
										</div>
									)
								}
								return(
									<div className="carousel-item" key={index}>
										<img style={{width:"100%", height:"30rem"}}  src={src} className="d-block w-100"/>
									</div>
								)
							})}
            </div>
            <a className="carousel-control-prev" href="#carouselExampleControls" role="button" data-slide="prev">
              <AiOutlineLeft size="2em" color="#B0AFB3" style={{width:25}} aria-hidden="true"/>
            </a>
            <a className="carousel-control-next" href="#carouselExampleControls" role="button" data-slide="next">
              <AiOutlineRight size="2em" color="#B0AFB3" style={{width:25}} aria-hidden="true"/>
            </a>
          </div>
          <Card.Body>
            <div style={{height:"6rem"}}>
              <Card.Title>{product.nombre}</Card.Title>
              <div>
                {product.element.map((elm,index)=>{
                  return(Rendercolor(elm.color,index));
                })} 
                {product.element.map((elm,index)=>{
                  return(Rendertalla(elm.talla,index));
                })} 
              </div>
              <Card.Text className="float-right text-muted">
                {product.precio} $
              </Card.Text>
            </div>
            <Button variant="dark" className={window.screen.width<381?"float-right d-block ml-3":"float-right d-block"} onClick={Actioncomprar}>
              Comprar 
            </Button>
            <Button variant="dark" className={window.screen.width<381?"float-right d-block mt-3":"float-right d-block mr-3"} onClick={ActionAñadir}>
              {btn? "Añadir al carrito":"Bajar del carrito"}
            </Button>
          </Card.Body>
        </Card>
      )
			case "perfil":
				return(
				<Card className="my-5 mx-5">
					  <Card.Body>
					  	<div style={{height:"6rem"}}>
						    <Card.Title className="mb-0">{usuario.nombre}</Card.Title>
						    <div className="my-4">
						    {window.screen.width<940?
						    		<div className="d-flex flex-column" style={{width:"80%",marginRigth:"10%",marginLeft:"10%"}}>
						    			<div>
							    			<div className="celda py-2 mx-2 text-center bg-dark text-light">Ventas este mes</div>
							    			<div className="celda py-2 mx-2 text-center">{usuario.vMes}</div>
						    			</div>
						    			<div>
							    			<div className="celda py-2 mx-2 text-center bg-dark text-light">Total de ventas</div>
							    			<div className="celda py-2 mx-2 text-center">{usuario.vTotal}</div>
						    			</div>
							    		<div>
							    			<div className="celda py-2 mx-2 text-center bg-dark text-light">Ventas de hoy</div>
							    			<div className="celda py-2 mx-2 text-center scroll2" style={{height:"12em"}}>{/*
                          usuario.registro.map((num,index)=>{
							    				  return <p>{obtmes(index)}</p>
							    			})*/} 3
							    			</div>
						    			</div>
							    	</div>
						    			:
						    		<div className="tabla" style={{width:"60%",marginRigth:"20%",marginLeft:"20%"}}>
						    			<div className="celda py-1 px-5 bg-dark text-light">Ventas este mes</div>
						    			<div className="celda py-1 px-5 bg-dark text-light">Total de ventas</div>
						    			<div className="celda py-1 px-5 bg-dark text-light">Ventas de hoy</div>
						    			<div className="celda py-1 px-5">{usuario.vMes}</div>
						    			<div className="celda py-1 px-5">{usuario.vTotal}</div>
						    			<div className="celda py-1 px-5">{/*usuario.registro.map((num,index)=>{
						    				return <p>{obtmes(index)}</p>
						    			})*/}3
						    			</div>
							    	</div>
						    }
						    	
						    </div>
								<Card.Text className="float-right text-muted">
							    {usuario.isAdmin?
                    <Link to="/añadir" className="text-reset">
                      <Button variant="dark" className="float-right d-block">
                        Añadir producto 
                      </Button>
                    </Link>
							        :
							      <div></div>	
							  	}
						    </Card.Text>
					    </div>
					  </Card.Body>
					</Card>
					)
		  case "grafico":
		  	return(
		  			<Card className="mt-5">
						  <Card.Body>
						  	<div style={{height:"6rem"}}>
							    <Card.Title>{title}</Card.Title>
									<Card.Text className="float-right text-muted">
								    	{children}
							    </Card.Text>
						    </div>
						  </Card.Body>
						</Card>
					)
			case "plantillas":
				return(
	  			<div className="d-flex flex-wrap justify-content-center pb-4">
	    			{cartap(numero*tam)}
	    			<Pagination className="m-0 my-n3  pt-4 d-flex justify-content-center col-lg-12 colorb">
						  <Pagination.Prev />
						  <Pagination.Item>{1}</Pagination.Item>
						  <Pagination.Item>{2}</Pagination.Item>
						  <Pagination.Item>{3}</Pagination.Item>
						  <Pagination.Next />
						</Pagination>
	  			</div>
		  	)
		  case "addplantilla":
		  	return(
		  		<div className="px-5">
		  			<Card border="secondary"style={{ width: '16rem',height:"18rem" }} className={window.screen.width<422?"my-4 box-shadow":"box-shadow my-4 mx-5"}>
					  	<Link to="/añadirp" className="notline text-reset">
						    <Card.Header className="mb-2">Nueva plantilla</Card.Header>
						    <Card.Body>
						      <Card.Text className="d-flex justify-content-center">
						    		<BsPlusCircle className="my-5" color="gray" size="4em"/>
						      </Card.Text>
							  </Card.Body>
						  </Link>
						</Card>
					</div>
		  	)
		  default:
				return(
	  			<div className="d-flex flex-wrap justify-content-center pt-5 pb-4">
	    			{cartan(numero*tam)}
	    			<Pagination className="m-0 my-n3 d-flex pt-4 justify-content-center col-lg-12">
						  <Pagination.Prev />
						  <Pagination.Item>{1}</Pagination.Item>
						  <Pagination.Item>{2}</Pagination.Item>
						  <Pagination.Item>{3}</Pagination.Item>
						  <Pagination.Next />
						</Pagination>
	  			</div>
		  	)

		}
	}
  
}

export default Carta;