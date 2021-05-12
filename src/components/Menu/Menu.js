import './Menu.css';
import { NavLink, Link } from 'react-router-dom';

const Menu = () => {
    return (
        <nav className="navbar navbar-expand-lg navbar-light menu navbar-dark">
            <div className="container-fluid px-5 menu-content">
                <Link to='/' className="navbar-brand" href="#">POKEDEX</Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse"
                        data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
                        aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon" />
                </button>
                <div className="collapse navbar-collapse flex-grow-0" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <NavLink exact to="/" activeClassName="active" className="nav-link">
                                All Pokemons
                            </NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink exact to="/pokemons-caught" activeClassName="active" className="nav-link">Caught Pokemons</NavLink>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
};

export default Menu;