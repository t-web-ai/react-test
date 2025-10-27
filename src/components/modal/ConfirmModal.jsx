import { useEffect } from "react";

function ConfirmModal({
  show: { show, id, user, setUser, selector },
  onClose,
  onConfirm,
}) {
  useEffect(() => {
    document.body.style.overflow = show ? "hidden" : "";
  }, [show]);

  if (!show) return null;

  return (
    <>
      {/* Backdrop */}
      <div className="modal-backdrop fade show" style={{ zIndex: 1040 }}></div>

      {/* Modal */}
      <div
        className="modal fade show d-block container"
        tabIndex="-1"
        style={{ zIndex: 1050 }}
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content border-0 shadow-lg rounded-3 overflow-hidden">
            <div className="modal-header bg-danger text-white">
              <h5 className="modal-title">
                <i className="bi bi-exclamation-triangle me-2"></i> Confirm
                Delete
              </h5>
              <button
                type="button"
                className="btn-close btn-close-white"
                onClick={onClose}
              ></button>
            </div>

            <div className="modal-body fs-5">
              Are you sure you want to delete this item? This action cannot be
              undone.
            </div>

            <div className="modal-footer d-flex justify-content-end">
              <button className="btn btn-secondary" onClick={onClose}>
                Cancel
              </button>
              <button
                className="btn btn-danger"
                onClick={() => onConfirm({ id, user, setUser, selector })}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ConfirmModal;
