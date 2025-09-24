import { Axios } from "@/api/axiosInstance";
import { create } from "zustand";
import { persist } from "zustand/middleware";
import { useAuthStore } from "./useAuthStore";
import { errorToaster, successToaster } from "@/widget/toaster";
import { useWorkspaceStore } from "./useWorkspaceStore";
import { useProjectStore } from "./useProjectStore";

export const useTaskStore = create(persist((set, get) => ({
    tasks: useProjectStore.getState().selectedProject?.tasks || [],
    selectedTask: null,
    isCreatingTask: false,
    isEditingTask: false,


    setSelectedTask: (task) => {
        set({selectedTask: task})
        localStorage.setItem("selectedTask", task)
    },
    createTask: async (data) => {
        //send request to the backend to create 
        set({isCreatingTask: true})
        try {
            const res = await Axios.post("/api/task/create", data)
            successToaster("Task created Succesfully!", "", "X")
            set({tasks: [...get().tasks, res.data.createdTask]})
            useProjectStore.getState().setSelectedProject(res.data.newProject)
            localStorage.setItem("selectedTask", res.data)
        } catch (e) {
            console.log("Error in creating task", e)
            errorToaster(e)
        } finally {
            set({isCreatingTask: false})
        } 
    },

    editTask: async (data) => {
        //send request to the backend to create 
        set({isEditingTask: true})
        try {
            const res = await Axios.post("/api/task/edit", data)
            successToaster("Task edited Succesfully!", "", "X")
            set({projects: [...get().projects, res.data]})
            set({selectedTask: res.data})
        } catch (e) {
            console.log("Error in editing task", e)
            errorToaster(e)
        } finally {
            set({isEditingTask: false})
        } 
    },

    deleteTask: async (data) => {
        try {
            console.log("deleting task");
            const res = await Axios.post(`/api/task/delete`, data)
            const newProject = res.data.newProject
            set({tasks: get().tasks.filter(task => task._id != res.data.taskId)})
            useProjectStore.getState().setSelectedProject(newProject)
            successToaster("Task deleted succesfully!", "", "X")
        } catch (e) {
            console.log("Error in deleting task", e)
        } 
    },

    changeStatus: async (data) => {
        try {
            const res = await Axios.post(`/api/task/change-status`, data)

            set({selectedTask: res.data.task})
            useProjectStore.getState().setSelectedProject(res.data.newProject)
            console.log("new task", res.data);
            
            successToaster("Task status changed!", "", "X")
        } catch (e) {
            console.log("Error in changing status of task", e)
        } 
    },

    changePriority: async (data) => {
        try {
            const res = await Axios.post(`/api/task/change-priority`, data)

            set({selectedTask: res.data.task})
            useProjectStore.getState().setSelectedProject(res.data.newProject)
            console.log("new task", res.data);
            
            successToaster("Task priority changed!", "", "X")
        } catch (e) {
            console.log("Error in changing priority of task", e)
        } 
    },

    changeAssignee: async (data) => {
        try {
            const res = await Axios.post(`/api/task/assignee`, data)
            set({selectedTask: res.data})
        } catch (e) {
            console.log("Error in changing assignee of task", e)
        } 
    },
}),
{
    name: "task-storage"
}
))