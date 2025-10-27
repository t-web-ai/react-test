import toast from "react-hot-toast";

const option = {
  style: {
    fontSize: "1.2rem",
  },
};
export function success(message, id) {
  toast.success(message, { id, ...option });
}

export function failed(message, id) {
  toast.error(message, { id, ...option });
}

export function processing(message, id) {
  toast.loading(message, { id, ...option });
}
