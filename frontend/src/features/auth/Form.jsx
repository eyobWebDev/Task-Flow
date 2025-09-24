import { Button } from "@/components/ui/button";
import { useAuthStore } from "@/store/useAuthStore";
import { el } from "date-fns/locale";
import { Eye, EyeOff, Loader2, Lock, User2Icon, UserPenIcon, UserSquare2Icon } from "lucide-react";
import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";


export default function Form({title}){
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [showPassword, setShowPassword] = useState(false)
    const {isLoggingIn, isSigningUp, login, signup} = useAuthStore()
    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault()

        if (title == "Log In"){
            await login({username, password})
        } else {
            await signup({username, password})
        }
        navigate("/workspace")
    }

    return <form onSubmit={handleSubmit} className="flex mt-3 flex-col gap-5">

        {title == "Log In" && <div>
            <Button variant={`outline`} className={`w-full`}>Log In with Google</Button>
        </div>}
        
        {title == "Log In" &&
        <div className="flex items-center opacity-70 gap-3">
            <hr className="w-full"/> <div>or</div> <hr className="w-full" />
        </div>}

        <div className="flex flex-col gap-2">
            <label>
             <span className="label-text text-gray-300">Username</span>
            </label>
            <div className="text-gray-300 flex gap-4 items-center relative mb-4">
            <UserPenIcon className="absolute z-10 left-3 top-2 w-5 h-5" />
                <input
                  name="password"
                  type={`text`}
                  placeholder="Username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="input input-bordered w-full pl-10"
                />
            </div>
        </div>

        <div className="flex flex-col gap-2">
            <label>
             <span className="label-text text-gray-300">Password</span>
            </label>
            <div className="text-gray-300 relative mb-4">
            <Lock className="absolute z-10 left-3 top-2 w-5 h-5" />
                <input
                  name="password"
                  type={showPassword? "text": "password"}
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="input input-bordered w-full pl-10"
                />
                <div onClick={() => setShowPassword(!showPassword)} className="absolute z-10 right-3 top-2 w-5 h-5">
                {showPassword? <Eye className=" z-10 left-3 top-2 w-5 h-5" />: <EyeOff className=" z-10 left-3 top-2 w-5 h-5" />}
                </div>
            </div>
        </div>
        

        <Button className={`w-full`}>{isLoggingIn || isSigningUp ? <Loader2 className="animate-spin text-blue-500 h-6 w-6" />: title}</Button>

        <div className=" text-center">
        {title == "Log In" ? <div className="flex justify-center gap-1"><div className="opacity-80">Don't have an account sign up </div>
        <NavLink to={`/auth/signup`} className="text-blue-500 hover:underline cursor-pointer opacity-100">Here</NavLink></div> : 
        <div className="flex justify-center gap-1"><div className="opacity-80">Already have an account Sign Up </div>
        <NavLink to={`/auth/login`} className="text-blue-500 hover:underline cursor-pointer opacity-100">Here</NavLink></div> }
        </div>
    </form>
}