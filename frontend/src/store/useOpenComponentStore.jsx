import {create } from "zustand"
import {Axios} from "../api/axiosInstance.js"
import toast from "react-hot-toast"
import {io } from "socket.io-client"
import { errorToaster, successToaster } from "@/widget/toaster.jsx"
import { BASE_API_URL, NODE_ENV } from "@/utils/constants.js"


export const useOpenComponentStore = create((set, get) => ({
    openDeleteDialogConsentBox: false,
    setOpenDeleteDialogConsentBox: (state) => {
        set({openDeleteDialogConsentBox: state})
    },

    openEditProjectDrawer: false,
    setOpenEditProjectDrawer: (state) => {
        set({openEditProjectDrawer: state})
    },

    openInviteMemberDialog: false,
    setOpenInviteMemberDialog: (state) => {
        set({openInviteMemberDialog: state})
    },
}))