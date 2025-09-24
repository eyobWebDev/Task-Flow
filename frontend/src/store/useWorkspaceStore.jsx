import { Axios } from "@/api/axiosInstance";
import { create } from "zustand";
import { persist } from "zustand/middleware"
import { useAuthStore } from "./useAuthStore";
import { errorToaster, successToaster } from "@/widget/toaster";
import { useNavigate } from "react-router-dom";

export const useWorkspaceStore = create(persist((set, get) => ({
    myWorkspaces: [],
    selectedWorkspace: localStorage.getItem("selectedWorkspace"),
    currentBadge: "Grid",
    isCreatingWorkspace: false,
    isGettingWorkspaces: false,


    setSelectedWorkspace: (workspace) => {
        set({selectedWorkspace: workspace})
    },
    getWorkspaces: async () => {
        //to get all workspace the user belongs
        const authUser = useAuthStore.getState().authUser
        set({isGettingWorkspace: true})

        try {
            const res = await Axios.get("/api/workspace/my-workspace")
            set({myWorkspaces: res.data})
            console.log(get().selectedWorkspace);
            
        } catch (e) {
            console.log("Error in getting Workspaces", e)
        } finally {
            set({isGettingWorkspace: false})
        } 
    },
    setCurrentBadge: (data) => {
        set({currentBadge: data})
    },
    createWorkspace: async (data) => {
        //send request to the backend to create 
        set({isCreatingWorkspace: true})
        try {
            const res = await Axios.post("/api/workspace/create", data)
            if(res.status == 201){
                successToaster("Workspace created Succesfully!", "", "X")
                set({myWorkspaces: [...get().myWorkspaces, res.data]})
                set({selectedWorkspace: res.data})
            } else {
                errorToaster(res.data.message, "", "X")
            }
            
        } catch (e) {
            console.log("Error in creating Workspaces", e)
            errorToaster(e)
        } finally {
            set({isCreatingWorkspace: false})
        } 
    },
    }),
    {
        name: "workspace-storage"
    },
))