
export default function NavBar() {
  return (
  
      <nav className="navbar navbar-expand-lg navbar-dark ">
    <div className="container-fluid">
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav me-auto mb-2 mb-lg-0">
        <li className="nav-item">
          <a className="nav-link active" aria-current="page" href="/">Home</a>
        </li>
        <li className="nav-item">
          <a className="nav-link txtlight" href="#">Popular</a>
        </li>
        <li className="nav-item dropdown ">
          <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
          Genres
          </a>
          <ul className="dropdown-menu dropdown-menu-dark" aria-labelledby="navbarDropdown">
            <li><a className="dropdown-item" href="#">Action</a></li>
            <li><a className="dropdown-item" href="#">Another action</a></li>
            <li><a className="dropdown-item" href="#">Another action</a></li>
            <li><a className="dropdown-item" href="#">Another action</a></li>
            </ul>
        </li>
        {/* <li className="nav-item">
          <a className="nav-link disabled">Disabled</a>
        </li> */}
      </ul>
      <form class="d-flex "style={{'margin-right':"50px"}}>
        <input className="form-control "style={{'color':'white','background':"rgba(0, 0, 0, 0.3)",border:'none'}} type="search" placeholder="Type..." aria-label="Search"/>
        <button className=" animsearch" type="submit">Search</button>
      </form>
      <div className=" dropdown dropstart" >
          <a className="nav-link  userb"style={{color:"white"}} href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
            
          </a>
          <ul className="dropdown-menu dropdown-menu-dark dm" aria-labelledby="navbarDropdown">
            <li><a className="dropdown-item" href="#">Profile</a></li>
            <li><a className="dropdown-item" href="#">Saved</a></li>
            <li><hr className="dropdown-divider"/></li>
            <li><a className="dropdown-item" href="#">Log out</a></li>
          </ul>
        </div>
    </div>
  </div>
</nav>
  );
}
