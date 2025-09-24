import { CheckCircleIcon, XCircle } from 'lucide-react';
import { Navigate } from 'react-router-dom';
import {toast} from 'sonner';

const check = <CheckCircleIcon className='text-green-400 mr-5' />

export const successToaster = (header, description, label, route) => {
    toast(`${header}`, {
        icon: check,
        duration: 2500,
        description: description || "",
        action: {
            label: label || "",
            onClick: () => route ? <Navigate to={route} /> : console.log("check"),
        },
    })
}

export const errorToaster = (header, description, label) => {
    toast(`${header}`, {
        description: description || "",
        icon: <XCircle className='text-red-400' /> ,
        action: {
            label: label || "",
            onClick: () => console.log("Undo"),
        },
    })
}

