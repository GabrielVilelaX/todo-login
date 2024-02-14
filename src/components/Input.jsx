import styles from "./Input.module.css";

function Input({ children, setInput }) {
  //const [enteredInput, setEnteredInput] = useState("");

  function inputHandler(e) {
    setInput(e.target.value);
  }

  return (
    <div className={styles.container}>
      <label>{children}</label>
      <input className={styles.input} onChange={inputHandler}></input>
    </div>
  );
}

export default Input;
