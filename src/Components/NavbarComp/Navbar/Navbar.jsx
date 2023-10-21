import React, { useState } from 'react';
import styles from './Navbar.module.css';
import Search from '../Search/Search';
import Logo from '../Logo/Logo';
import Results from '../Results/Results';

function Navbar(props) {

    const [movies, setMovies] = useState(props.tempMovieData);

  return (
    <>  
        <nav className={`navbar navbar-expand-lg bg-body-tertiary ${styles.navBar}`}>
            <div className="container">
                <a className="navbar-brand" href="#">
                    <Logo />
                </a>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav ms-auto mb-2 mb-lg-0 d-flex align-items-center">
                        <li className="nav-item mx-lg-4">
                            <Search query={props.query} setQuery={props.setQuery} />
                        </li>
                        <li className="nav-item">
                            <Results query={props.query} setQuery={props.setQuery} />
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    </>
  )
}

export default Navbar
