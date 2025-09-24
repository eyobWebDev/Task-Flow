import { create } from "zustand";

export const useTeamStore = create((set, get) => ({
    membersList: [],
    pendingMembersList: [],

    setPendingMemberList: (data) => {
        set({pendingMembersList: [...get().pendingMembersList, data]})
    },
    setMemberList: (data) => {
        set({membersList: [...get().membersList, data]})
    },
}))