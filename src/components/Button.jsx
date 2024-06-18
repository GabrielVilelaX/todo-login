function Button({ children, onClick, className }) {
  //const basePath = "http://localhost:5173";

  function clickHandler(e) {
    e.preventDefault();
    if (onClick) {
      onClick();
    }
  }

  const buttonClass = `rounded border-2 border-black bg-slate-300 p-1 px-4 font-semibold hover:bg-slate-100 ${className ? className : ''}`;

  return (
    <button
      className={buttonClass}
      onClick={clickHandler}
    >
      {children}
    </button>
  );
}

export default Button;
