import { Axios } from "@/api/axiosInstance";
import { create } from "zustand";
import { persist } from "zustand/middleware";
import { useAuthStore } from "./useAuthStore";
import { errorToaster, successToaster } from "@/widget/toaster";
import { useTeamStore } from "./useTeamStore";


export const useProjectStore = create(persist((set, get) => ({
    projects:  [], //useAuthStore.getState().authUser?.lastActiveWorkspace.projects ||
    selectedProject: localStorage.getItem("lastActiveProject"),
    milestones: [],
    invitations: [],
    pendingInvitationsList: [], //useAuthStore.getState().authUser?.invitations.filter(invite => invite.invitedBy.username == authUser.username && invite.status == "pending"),
    isCreatingProject: false,
    isGettingProject: false,
    isAddingMilestone: false,
    isEditingProject: false,
    isInvitingMember: false,
    isAcceptingInvitation: false,
    isRemovingMember: false,

    setSelectedProject: (project) => {
        set({selectedProject: project})
        localStorage.setItem("selectedProject", project)
    },

    createProject: async (data) => {
        //send request to the backend to create 
        set({isCreatingProject: true})
        try {
            const res = await Axios.post("/api/project/create", data)
            successToaster("Project created Succesfully!", "", "X")
            set({projects: [...get().projects, res.data]})
            set({selectedProject: res.data})
            localStorage.setItem("selectedProject", res.data)
        } catch (e) {
            console.log("Error in creating project", e)
            errorToaster(e)
        } finally {
            set({isCreatingProject: false})
        } 
    },

    editProject: async (data) => {
        //send request to the backend to create 
        set({isEditingProject: true})
        try {
            const res = await Axios.post("/api/project/edit", data)
            successToaster("Project edited Succesfully!", "", "X")
            set({projects: [...get().projects, res.data]})
            set({selectedProject: res.data})
        } catch (e) {
            console.log("Error in editing project", e)
            errorToaster(e)
        } finally {
            set({isEditingProject: false})
        } 
    },

    getProjects: async () => {
        //to get all projects the workspace belongs to
        set({isGettingProject: true})
        try {
            const res = await Axios.get(`/api/project/my-projects?workspaceId=${useAuthStore.getState().authUser.lastActiveWorkspace._id}`)
            
            set({projects: res.data})
        } catch (e) {
            console.log("Error in getting Workspaces", e)
        } finally {
            set({isGettingProject: false})
        } 
    },

    deleteProject: async (projectId) => {
        try {
            console.log("deleting");
            const res = await Axios.post(`/api/project/delete?projectId=${projectId}`)
            set({projects: get().projects.filter(project => project._id != projectId)})
            successToaster("Project deleted succesfully!", "", "X")
        } catch (e) {
            console.log("Error in deleting project", e)
        } 
    },

    addMilestone: async (data) => {
        set({isAddingMilestone: true})
        try {
            const res = await Axios.post(`/api/project/milestone/add`, data)
            console.log(res);
            
            set({selectedProject: res.data})
            successToaster("Added Milestone succesfully!", "", "X")
        } catch (e) {
            console.log("Error in adding milestone", e)
        } finally {
            set({isAddingMilestone: false})
        }
    },

    removeMilestone: async (data) => {
        try {
            const res = await Axios.post(`/api/project/milestone/remove`, data)
            set({selectedProject: res.data})
            successToaster("Milestone Removed succesfully!", "", "X")
        } catch (e) {
            console.log("Error in adding milestone", e)
        } 
    },
    
    toggleCompleteMilestone: async (data) => {
        try {
            const res = await Axios.post(`/api/project/milestone/toggle-complete`, data)
            set({selectedProject: res.data})
            successToaster("Milestone completed!", "", "X")
        } catch (e) {
            console.log("Error in adding milestone", e)
        } 
    },

    inviteMember: async (data) => {
        set({isInvitingMember: true})
        try {
            const res = await Axios.post(`/api/project/invite`, data)
            console.log(res.data);
            
            if (res.status == 200){
                set({invitations: [...get().invitations, res.data.newInvite]})
                successToaster("Invitation sent!", "", "X")
            } else if (res.status == 404){
                errorToaster("Can't send invite.", res.data.message, "X")
            }
            else {
                errorToaster("Can't send invite.", res.data.message, "X")
            }
        } catch (e) {
            console.log("Error in inviting a member", e)
        } finally {
            set({isInvitingMember: false})
        }
    },

    getAllInvitations: async () => {
        try {
            const res = await Axios.get(`/api/project/get-invitations`)
            set({invitations: res.data})
        } catch (e) {
            console.log("Error in getting invitations", e)
        } 
    },
    
    acceptOrDeclineInvitation: async (data) => {
        set({isAcceptingInvitation: true})
        try {
            const res = await Axios.post(`/api/project/accept-decline`, data)
            if (res.status == 200){
                useProjectStore.getState().setSelectedProject(res.data)
                successToaster(`You succefully joined "${res.data.name}" project!`, "", "X")

            } else {
                errorToaster(res.data.message, "", "X")
            }

        } catch (e) {
            console.log("Error in accepting or declining invitation", e)
        } finally {
            set({isAcceptingInvitation: false})
        }
    },

    removeMember: async (data) => {
        set({isRemovingMember: true})
        try {
            const res = await Axios.post(`/api/project/remove-member`, data)
            useProjectStore.getState().setSelectedProject(res.data)
            successToaster("User succefully Removed!", "", "X")  
        } catch (e) {
            console.log("Error in removing a member", e)
        } finally {
            set({isRemovingMember: false})
        }
    },

}),
{
    name: "project-storage"
}
))