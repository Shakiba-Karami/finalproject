import { useForm } from "react-hook-form";
import { useNavigate, Link } from "react-router-dom";


const SignIn = () => {
    // const navigate = useNavigate
    // const [register, onSubmit] = useForm()


    return (
    <div className="w-90 h-fit absolute top-8 end-3 rounded-xl flex flex-col gap-5 bg-[var(--bg-color)]/80 shadow-xl/25 shadow-fuchsia-200 inset-shadow-s inset-shadow-neutral-50 ring-1 ring-indigo-400/20 py-5 px-2 text-sm">
        <h1>Sign in using Email & Password</h1>
        <input className="rounded-xl bg-[var(--interactive-color)] py-3 px-2 caret-(--accent-color) focus:outline-none focus:ring-2 focus:ring-[var(--accent-color)]" placeholder = 'Username or Email'></input>
        <input className="rounded-xl bg-[var(--interactive-color)] py-3 px-2 caret-(--accent-color) focus:outline-none focus:ring-2 focus:ring-[var(--accent-color)]" placeholder="Password"/>
        <button className="bg-[var(--accent-color)] w-full cursor-pointer py-3 px-8 rounded-xl text-md font-bold font-stretch-150%">Sign In</button>
        <p className="underline text-[var(--accent-color)] decoration-[var(--accent-color)] text-xs">Did you forget your password?</p>
        <div className="flex justify-center gap-1">
            <p>Don't have an account yet?</p>
            <Link to='/register' className="underline text-[var(--accent-color)] decoration-[var(--accent-color)]">Register Here</Link>
        </div>
    </div>
    )
}

export default SignIn
