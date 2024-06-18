import { HiXMark } from "react-icons/hi2";
import Button from "./Button";
import { useOutsideClick } from "../services/useOutsideClick";

const Modal = ({ show, onClose, children }) => {
  const ref = useOutsideClick(() => onClose());
  if (!show) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm">
      <div className="fixed inset-0 bg-black opacity-50 " />
      <div className="relative rounded-lg bg-slate-200 p-6 shadow-lg border-solid border-2 border-black " ref={ref}>
        <div className="flex justify-end">
          <Button onClick={() => onClose()}>
            <HiXMark />
          </Button>
        </div>
        {children}
      </div>
    </div>
  );
};

export default Modal;
