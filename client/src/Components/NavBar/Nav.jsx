import Search from '../SearchBar/Searchbar';

import './Nav.css';

function Nav() {

    return (
        <>
            <header className="bg-dark border border-bottom d-flex justify-content-between align-items-center">
                <div id="title" className="container bg-dark">
                    <nav className="navbar navbar-expand-lg bg-dark">
                        <div id="nav" className="container-fluid d-flex justify-content-center">
                            <h1 className="bolder siteName">
                                <a className="text-decoration-none text-light siteName" href="/home">
                                    Social Network
                                </a>
                            </h1>
                        </div>
                    </nav>
                </div>
                <div id="pages" className="container bg-dark">
                    <nav className="navbar-expand-lg bg-dark d-flex justify-content-center">
                        <div className="container-fluid text-light pageTitle">
                            For you
                        </div>
                        <div className="container-fluid text-light pageTitle">
                            For you
                        </div>
                    </nav>
                </div>
                <div id="search" className="container bg-dark">
                    <nav className="navbar-expand-lg bg-dark">
                        <div className="container-fluid">
                            <Search />
                        </div>
                    </nav>
                </div>
            </header>
        </>
    )
}

export default Nav;