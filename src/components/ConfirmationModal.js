
import "../styles/UserDetails.css";

const ConfirmationModal = ({ onConfirm, onCancel, message }) => {
    return (
      <div className="confirmation-overlay">
        <div className="confirmation-modal">
          <p>{message}</p>
          <button onClick={onConfirm}>Yes</button>
          <button onClick={onCancel}>No</button>
        </div>
      </div>
    );
  };
  
  export default ConfirmationModal;

  