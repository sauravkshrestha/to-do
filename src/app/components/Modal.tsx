import React, {useState} from "react";

const Modal = () => {
  const [taskChange, setTaskChange] = useState<string>("");
  
  return (
    <div className="modal">
      <div className="modal-wrapper">
        <div className="modal-container">
          <div className="modal-body">
            <label htmlFor="edit-task"></label>
            <input type="text" id="edit-task" name="edit-task" value={taskChange} onChange={e => setTaskChange(e.target.value)} />

            <div className="flex">
              <button className="">change</button>
              <button className="">cancle</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Modal;