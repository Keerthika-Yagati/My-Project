import { useContext } from "react";
import { ToastContext } from "../context/ToastContext";

function Toast() {
    const { toasts, removeToast } = useContext(ToastContext);

    return (
        <div className="toast-container">
            {toasts.map((toast) => (
                <div key={toast.id} className={`toast toast-${toast.type}`}>
                    <div className="toast-content">
                        {toast.type === "success" && <i className="fas fa-check-circle"></i>}
                        {toast.type === "error" && <i className="fas fa-exclamation-circle"></i>}
                        {toast.type === "info" && <i className="fas fa-info-circle"></i>}
                        <span>{toast.message}</span>
                    </div>
                    <button
                        className="toast-close"
                        onClick={() => removeToast(toast.id)}
                        aria-label="Close notification"
                    >
                        ×
                    </button>
                </div>
            ))}
        </div>
    );
}

export default Toast;
