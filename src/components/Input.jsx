function Input({ children, setInput, type, value, onPress }) {
  function inputHandler(e) {
    setInput(e.target.value);
  }

  function handleKey(e) {
    if (e.key === "Enter") {
      onPress();
    }
  }

  return (
    <div className="flex flex-col items-center">
      {children !== undefined && (
        <label className="font-semibold">{children}</label>
      )}
      <input
        className="mx-auto w-8/12 rounded border-2 border-black bg-gray-100"
        value={value}
        onChange={inputHandler}
        onKeyDown={handleKey}
        type={type === "password" ? "password" : undefined}
      />
    </div>
  );
}

export default Input;
