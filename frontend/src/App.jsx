import { useEffect, useState } from 'react'
import './App.css'
import { toast, Toaster } from "sonner"
import ToastButton from './widget/ToastButton'
import { Loader2, X } from 'lucide-react'
import { Button } from './components/ui/button'
import { errorToaster, successToaster } from '@/widget/toaster'
import { BASE_API_URL, NODE_ENV } from '@/utils/constants'
import { Navigate, Route, Routes, useNavigate } from 'react-router-dom'
import HomePage from './pages/HomePage'
import LogInPage from './pages/LogInPage'
import SignUpPage from './pages/SignUpPage'
import { useAuthStore } from './store/useAuthStore'
import "./App.css"
import WorkspacePage from './pages/WorkspacePage'
import { useWorkspaceStore } from './store/useWorkspaceStore'
import CreateWorkspaceForm from './features/workspace/CreateWorkspacePage'
import ProjectDashBoardPage from './pages/ProjectDashBoardPage'
import CreateProjectPage from './features/project/CreateProjectDialog'
import { useProjectStore } from './store/useProjectStore'



function App() {
  const {checkAuth, logout, isCheckingAuth, isLoggingOut, authUser} = useAuthStore()
  const {selectedWorkspace, getWorkspaces} = useWorkspaceStore()
  const {getProjects} = useProjectStore()
  const navigate = useNavigate()

  useEffect(() => {
      checkAuth()      
      getWorkspaces()
      getProjects()
      
      if(authUser?.lastActiveProject) localStorage.setItem("lastActiveProject", authUser.lastActiveProject)
      if(authUser?.lastActiveWorkspace) localStorage.setItem("lastActiveWorkspace", authUser.lastActiveWorkspace)
      authUser?.lastActiveProject && navigate(`/workspace/${authUser.lastActiveWorkspace._id}/projects/${authUser.lastActiveProject._id}`)
      authUser?.lastActiveWorkspace && navigate(`/workspace/${authUser.lastActiveWorkspace._id}/projects`)
  }, [])

  const Logout = () =>{
      logout()
  }

  if (isCheckingAuth || isLoggingOut){
      console.log("checking auth")
      return (
          <div className="fixed inset-0 flex justify-center items-center">
          <Loader2 size={64} className="animate-spin text-blue-500 h-6 w-6" />
          </div>
      )
  }


  return (
    <>
    <Routes>
      <Route path='/*' element={!authUser ? <HomePage /> : <Navigate to={authUser.lastActiveWorkspace ? `/workspace/${authUser.lastActiveWorkspace._id }/projects` : authUser.lastActiveProject ? `/workspace/${authUser.lastActiveWorkspace._id }/projects/${authUser.lastActiveProject._id}` : "/workspace"} />} />
      <Route path='/auth/login' element={!authUser ? <LogInPage /> : <Navigate to={`/workspace`} />} />
      <Route path='/auth/signup' element={!authUser ? <SignUpPage /> : <Navigate to={`/workspace`} />} />
      <Route path='/auth/logout' element={authUser ? <Logout />: <Navigate to={`/`} />} />
      <Route path='/workspace/new' element={authUser ? <CreateWorkspaceForm /> : <Navigate to={`/`} />} />
      <Route path='/workspace/:id/projects/new' element={authUser ? <CreateProjectPage /> : <Navigate to={`/`} />} />
      <Route path='/workspace/:id/projects/*' element={authUser ? <ProjectDashBoardPage /> : <Navigate to={`/`} />} />
      <Route path='/workspace'element={authUser ? <WorkspacePage /> : <Navigate to={`/`} />} />
    </Routes>

    <Toaster />
  </>
  )
}


export default App
