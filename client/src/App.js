import './App.css';
/* import RequestList from './bricks/RequestList'
import LoanCalculator from './bricks/LoanCalculator'; */
import logo from "./images/logo.png"

import React, { useState } from 'react';
import { Form, Modal, Button, Dropdown } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

import base64 from 'base-64'

function App() {

  const defaultLoginData = {
    login: "",
    password: ""
  }

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

/*     const form = e.currentTarget;
    console.log(form); */

    setLoginCall({ state: "pending" });
/*     console.log(loginCall.state)
    console.log(formateLoginData(loginData.login, loginData.password))
    console.log(base64.encode(formateLoginData(loginData.login, loginData.password))) */

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

        handleCloseLoginModal();
      }
    }); 
  }

  return (

    <div className="App">
      <nav id="navbar">
        <div id="logo-container">
          <img 
              id="logo"
              src={logo}
              alt="Logo"
              height={80}
          />
        </div>
        <div id="navbar-links">
          { loginCall.state !== "success"
            ? <Button id="navbar-login-btn" onClick={handleShowLoginModal}>Přihlášení</Button>
            : <Dropdown>
                <Dropdown.Toggle id="user-dropdown-btn">
                  { loginCall.data.name } ({ loginCall.data.roles[0] })
                </Dropdown.Toggle>
      
            <Dropdown.Menu>
              <Dropdown.Item href="#/action-1">Žádosti</Dropdown.Item>
              <Dropdown.Item href="#/action-2">Odhlásit</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
          }
          
        </div>
      </nav>

      <div className="heading">
        <h1>Online půjčka</h1>
        <p>Výhodný spotřebitelský úvěr sjednáte online z mobilu již za pár minut</p>
      </div>

      <Modal show={showLoginModal} onHide={handleCloseLoginModal}>
        <Form noValidate onSubmit={(e) => handleLoginSubmit(e)}>
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
    </div>
  );
}

export default App;
