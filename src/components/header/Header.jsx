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

export default Header;
