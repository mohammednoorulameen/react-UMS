import React, { useEffect, useState } from "react";
import "./Dashboard.css";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setUserList } from "../../../Services/AdminApi";
import { setAdminDetails, clearAdmin } from "../../../Features/SetAdmin";
import {
  getAdminDetails,
  AdminDeleteUser,
  Getdeleteusername,
} from "../../../Services/AdminApi";
import { clearUser } from "../../../Features/SetUser";
import DeleteModal from "../DeleteModal/DeleteModal";

const Dashboard = () => {
  const [users, setUsers] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [deleteUserId, setdeleteUserId] = useState(null);
  const [removeUserName, setdeleteUserName] = useState("");
  const [searchTerm, setSearchTerm] = useState("")
  const navigate = useNavigate();
  const adminDetails = useSelector((state) => state.admin.adminDetails);

  // get user detailes
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchUserList = async () => {
      try {
        const response = await setUserList();
        setUsers(response.data.user);
      } catch (error) {
        console.log("error fetching", error);
        navigate("/admin/adminlogin");
      }
    };

    fetchUserList();

    // get admin details

    const fetchAdminDetails = async () => {
      try {
        const response = await getAdminDetails();
        // console.log("dashboard",response);

        if (response.status == 200) {
          dispatch(setAdminDetails(response.data.adminDetails));
        }
      } catch (error) {
        console.log(error);
      }
    };
    if (!adminDetails) {
      fetchAdminDetails();
    }
  }, [dispatch, adminDetails]);

  // navigate update

  const handleUpdate = (userId) => {
    navigate(`/admin/adminupdate/${userId}`);
  };

  // log out admin

  const handleLogout = () => {
    dispatch(clearAdmin());
    navigate("/admin/adminlogin");
  };

  // handle delete

  const handleDeleteModal = async () => {
    const response = await AdminDeleteUser(deleteUserId);
    if (response.status == 200) {
      console.log("delete user", response);
      setUsers(response.data.user);
      dispatch(clearUser());
      setShowModal(false);
    }
  };

  // open modal and set userid to delete

  const openModal = async (userId) => {
    // get delete username
    const response = await Getdeleteusername(userId);
    setdeleteUserName(response.data.deleteusername);
    setdeleteUserId(userId);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };


  // serach input box
 
const handleSearchInput = (e) => {
  setSearchTerm(e.target.value.toLowerCase());  
};

// Filter users 
const filteredUsers = users.filter((user) =>
  user.username.toLowerCase().includes(searchTerm) ||
  user.email.toLowerCase().includes(searchTerm) ||
  user.phone.includes(searchTerm)
);

  return (
    <div>
      <div className="navbar">
        <div className="logo">
          <img
            src="https://cdn-icons-png.freepik.com/512/8686/8686102.png"
            alt="Logo"
          />
          <a href="#">UMS</a>
        </div>
        <div className="menu">
          <a href="../admin/dashboard">Dashboard</a>
          <a href="../admin/addUser">create</a>
        </div>
        <div className="perfil">
          <div className="contenido-perfil">
            <p>{adminDetails.name}</p>
            {/* <img
            // "https://cdn-icons-png.flaticon.com/512/3177/3177440.png"
              src={`http://localhost:3030${adminDetails?.image}`}
              alt="Usuario"
            /> */}
            <img
              className="w-full h-full rounded-full object-cover border-4 border-blue-500"
              src={`http://localhost:3030${
                adminDetails?.image ||
                "https://cdn-icons-png.flaticon.com/512/3177/3177440.png"
              }`}
              alt="not"
            />
          </div>
          <div className="desplegable">
          <a onClick={handleLogout} type="submit">
              profile
            </a>
            <a onClick={handleLogout} type="submit">
              logout
            </a>
          </div>
        </div>
        <div className="menu-toggle">
          <div></div>
          <div></div>
          <div></div>
        </div>
      </div>
  
      <div className="contenedor contenido-principal p-3">
        <div className="usuarios-barra">
          <h5>UMS ADMIN PANEL</h5>
          <button id="nuevoUsuario" className=" text-sm">
            <i className="bi bi-plus"></i>{" "}
            <Link to={"/admin/adminadduser"}>Add User</Link>
          </button>
        </div>
        
          
            <form action="search" method="post">
          <div className="busqueda-barra">
            <input
              id="nombre"
              name="search"
              value={searchTerm}
              onChange={handleSearchInput}  
              type="search"
              placeholder="Search user"
            />
            <button type="submit">search</button>

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
            {filteredUsers.length > 0 ? (
              filteredUsers.map((users, index) => (
                <tr key={users._id}>
                  <td>
                    <li>{index + 1}</li>
                  </td>
                  <td>
                    <li> {users.username} </li>
                  </td>
                  <td>
                    <li> {users.email} </li>
                  </td>
                  <td>
                    <li> {users.phone} </li>
                  </td>
                  <td>
                    {/* <li> {users.profileImage} </li> */}
                    {/* <li> */}
                    <img
                      src={`http://localhost:3030/Images/${
                        users.profileImage || "/default-profile.png"
                      }`}
                      width="50"
                      height="50"
                      alt="not"
                    />
                  </td>

                  <td className="acciones">
                    <button className="botonEditar">
                      <a
                        className="btn btn-sucess"
                        role="button"
                        onClick={() => handleUpdate(users._id)}
                      >
                        Update{" "}
                      </a>
                    </button>
                    <button className="botonEliminar">
                      <a
                        className="btn btn-danger"
                        role="button"
                        onClick={() => openModal(users._id)}
                      >
                        delete
                      </a>
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6">No user fount</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* modal for delete confirmation */}
      <DeleteModal
        isVisible={showModal}
        onClose={closeModal}
        onConfirm={handleDeleteModal}
        user={removeUserName}
        // delete = { handleDeleteModal }
      />
    </div>
  );
};

export default Dashboard;
