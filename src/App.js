import React, {useState, useEffect} from 'react';
import Login from "./components/Login";
import Registro from "./components/Registro";
import Inicio from "./components/Inicio";
import Producto from "./components/Producto";
import Configuracion from "./components/Configuracion";
import Perfil from "./components/Perfil";
import Estadisticas from "./components/Estadisticas";
import AnadirP from "./components/AnadirP";
import AnadirE from "./components/AnadirE";
import Añadir from "./components/Añadir";
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";
import axios from "axios";

const App = (props) => {
	const [Values, setValues] = useState({
		logueado:false,
		usr:{},
		id:""
	});
	
	const obtdatos = async(user, password)=>{
		console.log(user)
		console.log(password)
		const data = await axios.get("http://localhost:4000/api/users")
		const resultado = data.data.find( usuario => usuario.nombre === user );
		if(resultado != null){

			if(password==resultado.contraseña){
				setValues({
					logueado:true,
					usr:resultado
				})
			}
			else{
				alert("contraseña incorrecta")
			}
		}
		else{
			alert("nombre de usuario invalido")
		}
	}
	return(
		<div>
			<p>hola</p>
			{Values.logueado?
				<Router>
					<Switch>
						<Route path={process.env.PUBLIC_URL+"/"} exact component={Inicio}/>
						<Route path={process.env.PUBLIC_URL+"/producto/:id"} component={Producto}/>
						<Route path={process.env.PUBLIC_URL+"/estadisticas"} component={Estadisticas}/>
						<Route path={process.env.PUBLIC_URL+"/añadirp"} component={AnadirP}/>
						<Route path={process.env.PUBLIC_URL+"/añadire/:id"} component={AnadirE}/>
						<Route path={process.env.PUBLIC_URL+"/añadir"} component={Añadir}/>
						<Route path={process.env.PUBLIC_URL+"/cambiarnombre"}>
							<Configuracion nombre/>
						</Route>
						<Route path={process.env.PUBLIC_URL+"/cambiarcontraseña"}>
							<Configuracion/>
						</Route>
						<Route path={process.env.PUBLIC_URL+"/perfil"} component={Perfil}/>
					</Switch>
				</Router>
					:
				<Router>
					<Switch>
						<Route exact path="/">
							<Login logear={obtdatos}/>
						</Route>
						<Route path={process.env.PUBLIC_URL+"/registro"} component={Registro}/>
					</Switch>
				</Router>
		}

		</div>
		
	)
}

export default App;
