function Input({ children, setInput }) {
  //const [enteredInput, setEnteredInput] = useState("");

  function inputHandler(e) {
    setInput(e.target.value);
  }

  return (
    <div>
      <label>{children}</label>
      <input onChange={inputHandler}></input>
    </div>
  );
}

export default Input;
