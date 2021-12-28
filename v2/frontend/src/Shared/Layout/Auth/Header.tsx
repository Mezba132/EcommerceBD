import  React ,{Component} from "react";
import { Link } from "react-router-dom";

const Header = () =>{
        return (
            <div>
                <nav className=" navbar navbar-dark navbar-expand-md bg-dark justify-content-center">
                    <a href="/" className="navbar-brand d-flex w-50 mr-auto">Home</a>
                    <button className="navbar-toggler" type="button" data-toggle="collapse"
                            data-target="#collapsingNavbar3">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="navbar-collapse collapse w-100" id="collapsingNavbar3">
                        {/*<ul className="navbar-nav w-100 justify-content-center">*/}
                        {/*    <li className="nav-item active">*/}
                        {/*        <a className="nav-link" href="#">Link</a>*/}
                        {/*    </li>*/}
                        {/*    <li className="nav-item">*/}
                        {/*        <a className="nav-link" href="//codeply.com">Codeply</a>*/}
                        {/*    </li>*/}
                        {/*    <li className="nav-item">*/}
                        {/*        <a className="nav-link" href="#">Link</a>*/}
                        {/*    </li>*/}
                        {/*</ul>*/}
                        <ul className="nav navbar-nav ml-auto w-100 justify-content-end">
                            <li className="nav-item">
                                <Link to='/register' className='nav-link'>Register</Link>
                            </li>
                            <li className="nav-item">
                                <Link to='/login' className='nav-link'>Login</Link>
                            </li>
                        </ul>
                    </div>
                </nav>
            </div>
        )
}

export default Header;