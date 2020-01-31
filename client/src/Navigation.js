import React, { Component } from 'react';
import { FaUsers } from 'react-icons/fa';
import { IoIosPower } from 'react-icons/io';

class Navigation extends Component {

    render () {

        const { user, matricule } = this.props;
        console.log('Navigation ===>  user:', user, ', matricule:', matricule);
        
        return (
            <div className="siteNav family-sans navbar navbar-expand bg-primary navbar-dark higher">
                <div className="container-fluid">
                    <a href="/" className="navbar-brand ">
                        <FaUsers className="mr-1" /> Bienvenu(e)  { matricule } &nbsp; 
                        <IoIosPower className="mr-1" />
                    </a>
                    <div className="navbar-nav mt-auto">
                        <a className="nav-item nav-link" href="/compte"> Mon Compte </a>
                        <a className="nav-item nav-link" href="/reservation"> Mes Réservations </a>
                        <a className="nav-item nav-link" href="/outils"> Nos Outils</a>
                        <a className="nav-item nav-link" href="/reserver"> Réserver </a>
                        <a className="nav-item nav-link" href="/annuler" > Annuler </a>
                        <a className="nav-item nav-link" href="/incident" > Ouvrir un incident </a>
                        <a className="nav-item nav-link" href="/idees" >Boite à idées </a>
                        <a className="nav-item nav-link" href="/reparerDvd"> Réparer des DVD </a>
                        <a className="nav-item nav-link" href="/contact" > Contact </a>
                    </div>
                </div>
            </div>
        );
    }
}
 export default Navigation;