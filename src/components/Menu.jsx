import "../styles/Menu.css";

function Menu() {
  return (
    <div className="background">
        <div className="menu-content">
            <div className="icons-menu">
                <div className="left-side-menu">
                    <img src={require('../symbols/nav-symbols/cerrar.svg').default} alt="Notificación" />
                </div>
                <div className="right-side-menu">
                    <img src={require('../symbols/nav-symbols/notification.svg').default} alt="Notificación" />
                    <img src={require('../symbols/nav-symbols/profile.svg').default} alt="Perfil" />
                </div>
            </div>
            <div className="button first">INICIO</div>
            <div className="button">SERIES</div>
            <div className="button">PELÍCULAS</div>
            <div className="button">AGREGADAS RECIENTEMENTE</div>
            <div className="button">POPULARES</div>
            <div className="button">MIS PELÍCULAS</div>
            <div className="button">MI LISTA</div>
            <div className="button"> AGREGAR PELÍCULA</div>
            <div className="button">CERRAR SESIÓN</div>
        </div>
    </div>
  );
}
export default Menu;
