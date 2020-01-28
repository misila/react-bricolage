import React, { Component } from 'react';
import { Collapse, Button, CardBody, Card, Col, Row } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.css';
import logoSection from './img/bricodsfondblanc.bmp';

const login = async(values) => {
    console.log('Connect.js, login, values=', values);
    const response = await fetch('/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(values),
    });

    const body = await response.json();
    console.log('body => ', body);
    if (response.status !== 200) throw Error(body);
console.log('get matricule login = ', body.matricule);
    return body;
  }

class Connect extends Component {

    constructor(props) {
        super(props);
        this.state = {
            collapseAccount: false,
            collapseLogin: false,
            collapsePassword: false,
            matricule: '',
            password: ''
        }
        console.log('constructor Connect');
    }

    handleSuccessfulAuth(data) {
        console.log('Connect.js , handleSuccessfulAuth(data) ');
        this.props.handleLogin(data);
        // this.props.history.push('/home');
    }

    toggleAccount = () =>
        this.setState({ collapseAccount: !this.state.collapseAccount,
                        collapseLogin: false,
                        collapsePassword: false
        })

    toggleLogin = () =>
        this.setState({ collapseLogin: !this.state.collapseLogin,
                        collapsePassword: false,
                        collapseAccount: false
         })

    togglePassword = () =>
        this.setState({ collapsePassword: !this.state.collapsePassword,
                        collapseLogin: false,
                        collapseAccount: false
         })

    handleLoginSubmit = (e) => {
        
        e.preventDefault();
        console.log('handleLoginSubmit, e.target.value =',e.target.value, ', this.state=', this.state);
        console.log('this.state = ', this.state);
        login(this.state).then((body) => {
            if (body.matricule) {
                this.handleSuccessfulAuth(body);
            }
        });
    }
        

    render() {

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

                        <Button outline color="primary mr-2" id="#createAccount" onClick={this.toggleAccount}>
                            Creation d'un compte </Button>
                        <Button outline color="primary mr-2" id="#login" onClick={this.toggleLogin}>
                            Log In </Button>
                        <Button outline color="primary mr-2" id="#password" onClick={this.togglePassword}>
                            Nouveau mot de passe
                        </Button>
                        <br />
                        <br />
                        <Collapse toggler='#createAccount' isOpen={this.state.collapseAccount}>
                            <Row><Col sm="12" md={{size:6, offset: 3 }}>
                            <Card>
                                <CardBody>
                                    <form method='post' action='createaccount'>
                                    <div className="form-group">
                                        <label> Matricule </label>
                                        <input type="text" onChange={ (e) => this.setState({matricule: e.target.value}) } name="matricule" className="form-control" id="createMatricule" placeholder="Numéro de matricule" required></input>
                                    </div>
                                    <br />
                                    <div className="form-group">
                                        <button type="submit" className="btn btn-primary"> Activer le compte </button>
                                    </div>
                                    </form>
                                </CardBody>
                            </Card></Col></Row>
                        </Collapse>

                        <Collapse toggler='#login' isOpen={this.state.collapseLogin}>
                        <Row><Col sm="12" md={{size:6, offset: 3 }}>
                            <Card>
                                <CardBody>
                                    <form method='post' onSubmit={ (e) => this.handleLoginSubmit(e) } >
                                    <div className="form-group">
                                        <label> Matricule </label>
                                        <input type="text" onChange={(e) => this.setState({ matricule: e.target.value })} className="form-control" id="createMatricule" name="matricule" placeholder="Numéro de matricule" required></input>
                                    </div>
                                    <div className="form-group">
                                        <label> Mot de Passe </label>
                                        <input type="password" onChange={(e) => this.setState({ password: e.target.value })} className="form-control" id="createPassword" name="password" placeholder="Password" required ></input>
                                        <br />
                                        <button type="submit" className="btn btn-primary"> Se connecter </button>
                                    </div>
                                    </form>
                                </CardBody>
                            </Card></Col></Row>
                        </Collapse>

                        <Collapse toggler="#password" isOpen={this.state.collapsePassword} >
                        <Row><Col sm="12" md={{size:6, offset: 3 }}>
                            <Card>
                                <CardBody>
                                    <form method='post' action='renewpasswd' >
                                    <div className="form-group">
                                        <label> Matricule </label>
                                        <input type="text" onChange={ (e) => this.setState({matricule: e.target.value}) } name="matricule" className="form-control" id="createMatricule" placeholder="Numéro de matricule"></input>
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
}

export default Connect;