import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useOpenComponentStore } from "@/store/useOpenComponentStore";
import { useEffect, useState } from "react";


export default function DeleteConsentDialog({name, succesCallback, trigger}){
    const {openDeleteDialogConsentBox, setOpenDeleteDialogConsentBox} = useOpenComponentStore()

    return <Dialog open={openDeleteDialogConsentBox} onOpenChange={setOpenDeleteDialogConsentBox}
    >
      <DialogTrigger asChild><span onClick={() => setOpenDeleteDialogConsentBox(true)}>
          {trigger}
        </span></DialogTrigger>
        <DialogContent className={`bg-light-100 flex border-red-100 text-blue-200 flex-col gap-7 p-4`}>
            <DialogHeader className={`flex flex-col items-center`}>
                <DialogTitle className={`text-xl font-bold`}>Do you want to delete {name || ''} ?</DialogTitle>
                <DialogDescription className={`text-sm opacity-80`}>Once you delete it all of the members and sub structure will be deleted.</DialogDescription>
            </DialogHeader>
            <div className="flex items-center gap-5 pl-3 pr-3">
                <Button onClick={succesCallback} className={`w-2/3 btn bg-red-500 hover:bg-red-600`}>Delete</Button>
                <Button onClick={() => setOpenDeleteDialogConsentBox(false)} variant={`outline`} className={`w-1/3 btn btn-active`}>Cancel</Button>
            </div>
        </DialogContent>
    </Dialog>
}