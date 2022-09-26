import './App.css';
import logo from "./images/logo.png"
import { Form, Modal, Button, Dropdown } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

import { Outlet, useNavigate } from "react-router-dom";

import base64 from 'base-64'

import React, { useState, useContext } from 'react';
import UserContext from "./UserProvider";


function App() {
  const navigate = useNavigate();
  const { toggleAuthorization, authorization } = useContext(UserContext);

  const defaultLoginData = {
    login: "",
    password: ""
  }

  const [validated, setValidated] = useState(false);
  const [loginData, setLoginData] = useState(defaultLoginData);
  const [loginCall, setLoginCall] = useState({
    state: "inactive",
    data: ""
  })

  const [showLoginModal, setShowLoginModal] = useState(false);
  const handleCloseLoginModal = () => setShowLoginModal(false);
  const handleShowLoginModal = () => setShowLoginModal(true);

  const setLoginField = (name, val) => {
    const newLoginData = {...loginData};
    newLoginData[name] = val;

    return setLoginData(newLoginData);
  }

  const formateLoginData = (login, password) => {
    return `${login}:${password}`
  }

  const handleLoginSubmit = async (e) => {
    e.preventDefault();

    const form = e.currentTarget;
    if (!form.checkValidity()) {
      setValidated(true);
    }

    setLoginCall({ state: "pending" });

    fetch("/login", {
      method: "GET",
      headers: {
        "Authorization": "Basic " + base64.encode(formateLoginData(loginData.login, loginData.password)),
      }
    }).then(async (response) => {
      const responseJson = await response.json();

      if (response.status >= 400) {
        setLoginCall({ state: "error", error: responseJson});
      } else {
        setLoginCall({ state: "success", data: responseJson});
        toggleAuthorization(responseJson.roles)
        setLoginData(defaultLoginData);
        handleCloseLoginModal();
        navigate("requestList");
      }
    }); 
  }

  const handleLogout = () => {
    setLoginCall({ 
      state: "inactive",
      data: ""
    })
    toggleAuthorization({ role: [] });
    navigate("/");
  }

  const navigateHome = () => {
    navigate("/");
  }

  return (
    <div className="App">
      <nav id="navbar">
        <div id="logo-container" onClick={navigateHome}>
          <img 
              id="logo"
              src={logo}
              alt="Logo"
              height={80}
          />
        </div>
        <div id="navbar-links">
          { loginCall.state !== "success"
            ? <Button id="navbar-login-btn" onClick={handleShowLoginModal}>PŘIHLÁSIT</Button>
            : <div>
                <Dropdown>
                  <Dropdown.Toggle id="user-dropdown-btn">
                    { loginCall.data.name } ({ loginCall.data.roles[0] })
                  </Dropdown.Toggle>
                  <Dropdown.Menu id="dropdown-menu">
                    <Dropdown.Item onClick={handleLogout}>ODHLÁSIT</Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </div>  
          }
        </div>
      </nav>
      
      { authorization[0] ? (
          <div className="heading">
            <h1>Správa žádostí</h1>
            <p>Seznam žadatelů o spotřebitelský úvěr</p>
          </div>
      ) : (
        <div className="heading">
          <h1>Online půjčka</h1>
          <p>Výhodný spotřebitelský úvěr sjednáte online z mobilu již za pár minut</p>
        </div>
      )}
      

      <Modal show={showLoginModal} onHide={handleCloseLoginModal}>
        <Form noValidate validated={validated} onSubmit={(e) => handleLoginSubmit(e)}>
          <Modal.Header closeButton>
            <Modal.Title>Přihlášení</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form.Group
              className="mb-3"
              controlId="login"
            >
              <Form.Label>Přihlašovací jméno</Form.Label>
              <Form.Control
                type="text"
                value={loginData.login}
                onChange={(e) => setLoginField("login", e.target.value)}
                maxLength={20}
                required
              />
              <Form.Control.Feedback type="invalid">
                Špatné přihlašovací jméno
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group
              className="mb-3"
              controlId="password"
            >
              <Form.Label>Heslo</Form.Label>
              <Form.Control
                type="password"
                value={loginData.password}
                onChange={(e) => setLoginField("password", e.target.value)}
                maxLength={20}
                required
              />
              <Form.Control.Feedback type="invalid">
                Špatné heslo
              </Form.Control.Feedback>
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button 
              variant="secondary" 
              id="back-btn"
              onClick={handleCloseLoginModal}
            >
              Zpět
            </Button>
            <Button 
              variant="primary" 
              id="login-btn"
              type="submit"
            >
              Přihlášit
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>

      <Outlet />
    </div>
  );
}

export default App;
