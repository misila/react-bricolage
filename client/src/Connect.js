import React, { useState } from 'react';
import { Collapse, Button, CardBody, Card, Col, Row } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.css';
import logoSection from './img/bricodsfondblanc.bmp';

const login = async(values) => {
    
    const response = await fetch('/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(values),
    });

    const body = await response.json();
    
    if (response.status !== 200) throw Error(body);
    return body;
  }

function Connect(props) {

    const [collapseAccount, toggleAccount] = useState(false);
    const [collapseLogin, toggleLogin] = useState(false);
    const [collapsePassword, togglePassword] = useState(false);
    const [matricule, setMatricule] = useState('');
    const [password, setPassword] = useState('');
        
    return (
        <div className="container text-center">
            <div className="row justify-content-center">
                <div className="col-10 col-md-10 col-lg-8 col-xl-7">
                    <img src={logoSection} alt="Section Bricolage CE DS" />
                    <div className="display-4 text-primary mt-3 mb-2">
                        Section Bricolage CE DS
                    </div>
                    <p className="Lead">
                        Connectez-vous au portail de la section Bricolage du CE DS
                        pour réserver vos outils.
                    </p>

                    <Button outline color="primary mr-2" id="#createAccount" onClick={toggleAccount}>
                        Creation d'un compte </Button>
                    <Button outline color="primary mr-2" id="#login" onClick={toggleLogin}>
                        Log In </Button>
                    <Button outline color="primary mr-2" id="#password" onClick={togglePassword}>
                        Nouveau mot de passe
                    </Button>
                    <br />
                    <br />
                    <Collapse toggler='#createAccount' isOpen={collapseAccount}>
                        <Row><Col sm="12" md={{size:6, offset: 3 }}>
                        <Card>
                            <CardBody>
                                <form method='post' action='createaccount'>
                                <div className="form-group">
                                    <label> Matricule </label>
                                    <input type="text" onChange={ (e) => setMatricule(e.target.value) } name="matricule" className="form-control" id="createMatricule" placeholder="Numéro de matricule" required></input>
                                </div>
                                <br />
                                <div className="form-group">
                                    <button type="submit" className="btn btn-primary"> Activer le compte </button>
                                </div>
                                </form>
                            </CardBody>
                        </Card></Col></Row>
                    </Collapse>

                    <Collapse toggler='#login' isOpen={collapseLogin}>
                        <Row><Col sm="12" md={{size:6, offset: 3 }}>
                            <Card>
                                <CardBody>
                                    <form method='post' onSubmit={ (e) => {
                                        //this.handleLoginSubmit(e) 
                                        e.preventDefault();
                                        login({matricule, password }).then( (body) => {
                                            if (body.matricule) {

                                                props.handleLogin(body);
                                            }
                                        } );
                                    }} >
                                    <div className="form-group">
                                        <label> Matricule </label>
                                        <input type="text" onChange={(e) => setMatricule(e.target.value) } className="form-control" id="createMatricule" name="matricule" placeholder="Numéro de matricule" required></input>
                                    </div>
                                    <div className="form-group">
                                        <label> Mot de Passe </label>
                                        <input type="password" onChange={(e) => setPassword(e.target.value) } className="form-control" id="createPassword" name="password" placeholder="Password" required ></input>
                                        <br />
                                        <button type="submit" className="btn btn-primary"> Se connecter </button>
                                    </div>
                                    </form>
                                </CardBody>
                            </Card></Col></Row>
                        </Collapse>

                        <Collapse toggler="#password" isOpen={collapsePassword} >
                        <Row><Col sm="12" md={{size:6, offset: 3 }}>
                            <Card>
                                <CardBody>
                                    <form method='post' action='renewpasswd' >
                                    <div className="form-group">
                                        <label> Matricule </label>
                                        <input type="text" onChange={ (e) => setMatricule(e.target.value) } name="matricule" className="form-control" id="createMatricule" placeholder="Numéro de matricule"></input>
                                    </div>
                                    <br />
                                    <div className="form-group">
                                        <button type="submit" className="btn btn-primary"> Demander un nouveau mot de passe </button>
                                    </div>
                                    </form>
                                </CardBody>
                            </Card></Col></Row>
                        </Collapse>

                        <br/>
                        <br/>
                        <br/>
                    </div>
                </div>
            </div>
        );
    }

export default Connect;