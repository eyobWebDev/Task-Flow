import {create } from "zustand"
import {Axios} from "../api/axiosInstance.js"
import toast from "react-hot-toast"
import {io } from "socket.io-client"
import { errorToaster, successToaster } from "@/widget/toaster.jsx"
import { BASE_API_URL, NODE_ENV } from "@/utils/constants.js"
import { useProjectStore } from "./useProjectStore.jsx"
import { useWorkspaceStore } from "./useWorkspaceStore.jsx"

const BASEURL = NODE_ENV == "development" ? "http://localhost:5001" : BASE_API_URL

export const useAuthStore = create((set, get) => ({
    authUser: null,
    isSigningUp: false,
    isLoggingIn: false,
    isLoggingOut: false,
    isCheckingAuth: true,
    onlineUsers: [],
    socket: null,
    searchedUser: [],
    isSearchingUser: false,

    setAuthUser: (user) => {
        set({authUser: user})
    },
    
    checkAuth: async () => {
        try {
            const res = await Axios.get("/api/auth/check-auth")
            set({authUser: res.data})
            get().connectSocket()
        }catch (e){
            console.log("Error checking auth", e)
        } finally {
            set({isCheckingAuth: false})
        }
    },

    signup: async (data) => {
        set({isSigningUp: true})
        try{
            const res = await Axios.post("api/auth/signup", data)
            set({authUser: res.data})
            get().connectSocket()
            successToaster("Accounted created succcesfully!")
        }catch (e){
        errorToaster(e.response.data.message)
        } finally {
            set({isSigningUp: false})
        }
    },

    login: async (data) => {
        set({isLoggingIn: true})
        try{
            const res = await Axios.post("api/auth/login", data)
            set({authUser: res.data})
            get().connectSocket()
            successToaster("Logged in succesfully.")
        }catch (e){
        errorToaster(e.response.data.message)
        } finally {
            set({isLoggingIn: false})
        }
    },

    logout: async () => {
        set({isLoggingOut: true})
        try{
            const res = await Axios.post("api/auth/logout")
            set({authUser: null})
            get().disconnectSocket()
            successToaster("Logged out succesfully.")
        }catch (e){
        errorToaster(e.response.data.message)
        } finally {
            set({isLoggingOut: false})
        }
    },

    updateProfilePic: async (data) => {
        try{
            const res = await Axios.post("api/auth/update-profile-pic", data)
        
            if (res.status != 200){
                errorToaster("Invalid data.")
            }
            set({authUser: res.data})
            successToaster("profile picture updated succesfully.")
        }catch (e){
            console.log("Error updating profile picture.", e)
            errorToaster(e.response ?.data.message || "something went wrong.")
        }
    },

    updateProfile: async (data) => {
        try{
            const res = await Axios.post("api/auth/update-profile", data)
        
            if (res.status != 200){
                errorToaster("Invalid data.")
            }
            set({authUser: res.data})
            successToaster("profile updated succesfully.")
        }catch (e){
            console.log("Error updating profile.", e)
            errorToaster(e.response?.data.message || "something went wrong.")
        }
    },

    updateLastActive: async (data) => {
        try{
            const res = await Axios.put("api/auth/update-last-active", data)
        
            if (res.status != 200){
                errorToaster("Invalid data.")
            }
            set({authUser: res.data})
        }catch (e){
            console.log("Error updating profile.", e)
            errorToaster(e.response?.data.message || "something went wrong.")
        }
    },  

    searchUser: async (query) => {
       
        set({isSearchingUser: true})
        try{
             const res = await Axios.get(`api/auth/search?q=${query}`)
                set({searchedUser: res.data})
        }catch (e){
            errorToaster(e.response.data.message)
        } finally {
            set({isSearchingUser: false})
        }
    },

    connectSocket: async () => {
        const socket = io(BASEURL, {
            query: {
                userId: get().authUser._id,
            }
        })
        set({socket})
        socket.connect()
        socket.on("getOnlineUsers", userId => {
            set({onlineUsers: userId})
        })

        socket.on("new-member", newproject => {
            console.log("member joining");
            console.log("newproject", newproject);
            useProjectStore.getState().setSelectedProject(newproject)
            successToaster("New User Joined!", "", "X")
        })
        socket.on("new-invite", data => {
            set({authUser: data.invitee})
            successToaster("New Member request!", `${data.newInvite.invitedBy.username} in vited you to join the "${newInvite.projectId.name}" project.`, "See more", `.workspace/${useWorkspaceStore.getState().selectedWorkspace._id}/projects/invitations`)
        })
        socket.on("new-member-decline", data => {
            console.log("newproject", data.newproject);
            useProjectStore.getState().setSelectedProject(data.newproject)
            successToaster("User Declined Invitation Joined!", `The user "${data.username}" declined invite to the "${data.newproject.name}" project!`, "X")
        })
    },

    disconnectSocket: async () => {
        if(get().socket?.connected) get().socket?.disconnect()
    }
}))