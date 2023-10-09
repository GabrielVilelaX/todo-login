import PropTypes from "prop-types";

function Header(props) {
  function loginHandler() {
    props.onLogOut();
  }
  return (
    <header>
      <h1>TO DO LIST</h1>
      {props.isLoggedIn && <button onClick={loginHandler}>Log Out</button>}
    </header>
  );
}

Header.propTypes = {
  isLoggedIn: PropTypes.bool.isRequired,
  onLogOut: PropTypes.func.isRequired,
};

export default Header;
