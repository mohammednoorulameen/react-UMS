import React from 'react'
import './Dashboard.css'
const Dashboard = () => {
  return (
    <div>   
    <div className="navbar">
      <div className="logo">
        <img
          src="https://cdn-icons-png.freepik.com/512/8686/8686102.png"
          alt="Logo"
        />
        <a href="#" >UMS</a>
      </div>
      <div className="menu">
        <a href="../admin/dashboard">Dashboard</a>
        <a href="../admin/addUser">create</a>
      </div>
      <div className="perfil">
        <div className="contenido-perfil">
      
          <img
            src="https://cdn-icons-png.flaticon.com/512/3177/3177440.png"
            alt="Usuario"
          />
        </div>
        <div className="desplegable">
          <a href="logout" type="submit">logout</a>
        </div>
      </div>
      <div className="menu-toggle" onclick="">
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
    
    <div className="contenedor contenido-principal p-3">
      <div className="usuarios-barra">
        <h5>UMS ADMIN PANEL</h5>
        <button id="nuevoUsuario">
          <i className="bi bi-plus"></i> <a href="./addUser">Add User</a>
        </button>
      </div>
    <form action="search" method="post" >
      <div className="busqueda-barra">
        <input id="nombre" name="search" type="search" placeholder="search user" /> 
        <button
        type="submit">
          search
        </button>
      </div>
    </form>
      <table>
        <thead>
          <tr>
            <th>No</th>
            <th>Name</th>
            <th>Email</th>
            <th>phone</th>
            <th>Image</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody id="tablaDatos">
          <tr>
    
            <td scope="row"></td>
            <td><li>name</li></td>
            <td><li>name</li></td>
            <td><li>name</li></td>
            <td><li>name</li></td>
    
            <td className="acciones">
              <button className="botonEditar">
                <a className="btn btn-sucess" role="button" href="">Update </a></button
              ><button className="botonEliminar">
                <a className="btn btn-danger" role="button" href="">delete</a>
              </button>
            </td>
          </tr>
    
         
        
         
        </tbody>
      </table>
     
    </div>
    </div>
  )
}

export default Dashboard