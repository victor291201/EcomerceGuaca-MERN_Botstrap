import React,{useState} from "react"
import styles from "../../css/general.css"
import { Col, Image, Form, Button, Nav, Navbar, FormControl } from "react-bootstrap";
import Logo from "../../media/logoN.png"
import { BiSearch } from "react-icons/bi";
import { Link } from "react-router-dom";
import { AiOutlineMenu } from "react-icons/ai";

const Navbar1 = (props) => {
	const [valorS, setValors] = useState("")
	return(
	<Col lg={12} className="SinEspacios">
			<Navbar bg="light" variant="light" className="d-flex justify-content-between">
			<Navbar.Brand href="#home" className={window.screen.width<576?"":"px-3"}>
					{window.screen.width<992?
						<button className="navbar-toggler d-inline-block align-top" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
							<span className="navbar-toggler-icon"></span>
						</button>
						:
						null
						}
					<Link to="/">
						{window.screen.width<576? null:<Image src={Logo} width="80" height="35" className="d-inline-block align-top"/>}
					</Link>
				</Navbar.Brand>
			<Form inline className="mr-n1 ml-0">
				<FormControl type="text" style={{width:"80%"}} name="cadena"
					onChange={(e)=>setValors(e.target.value)} placeholder="Nombre o Referencia" value={valorS} className="mr-2"
				/>
				<BiSearch color="black" onClick={()=>props.enviarDatos(valorS)} className="m-1" size="1.4em"/>
			</Form>
			</Navbar>
	</Col>
	)
}

export default Navbar1;