function Input({ children, setInput, type, value }) {
  //const [enteredInput, setEnteredInput] = useState("");

  function inputHandler(e) {
    setInput(e.target.value);
  }

  return (
    <div className="flex flex-col">
      <label className="font-semibold">{children}</label>
      <input
        className="bg-gray-100"
        value={value}
        onChange={inputHandler}
        type={type === "password" ? "password" : undefined}
      ></input>
    </div>
  );
}

export default Input;
