import {toast } from 'react-toastify';

export const toastSuccess = (title, timeout = 1000) => {
    toast.success(title, { autoClose: timeout })
}

export const toastError = (title ="Have Error", timeout = 2000) => {
    toast.error(title, { autoClose: timeout })
}

export const toastWarning = (title, timeout = 1000) => {
    toast.warning(title, { autoClose: timeout })
}
