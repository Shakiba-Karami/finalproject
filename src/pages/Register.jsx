
/*https://moviesapi.codingfront.dev/api/v1/register
{id: 23,
name: "CodingFront",
email: "info@codingfront.dev",
created_at: "2020-10-10 12:12:23",
updated_at: "2020-10-10 12:12:23"
}*/
import { useForm } from "react-hook-form";
import * as yup from "yup";
import {yupResolver} from "@hookform/resolvers/yup";
import Header from "@/components/general/header";


const schema = yup.object({
    username : yup.string().min(3).required(), 
    email : yup.string().email().required(),
    password: yup.string().matches(/[a-z]+/).min(5).required(),
    passwordRepeat : yup.string().oneOf([yup.ref("password"), null], `your password doesn't match the last field`)
});

const Register = () => {
const {register, handleSubmit, formState : {errors}} = useForm({mode: "onChange", resolver: yupResolver(schema)})

    const onSubmit = (data) => {
        console.log(data)
        const payload = {
            name : data.name,
            email : data.email,
            password: data.password
        }
        FetchData('https://moviesapi.codingfront.dev/api/v1/register', 'POST', payload)
        .then(result => console.log("User registered:", result))
        .catch(err => console.error(err));
        };


    return (<>
    <div className='px-8 py-3'>

    <Header/>
    <form onSubmit={handleSubmit(onSubmit)} className="w-full sm:w-2/3 md:w-1/2 m-auto mt-10 h-fit rounded-xl flex flex-col gap-5 shadow-xl/25 shadow-fuchsia-200 inset-shadow-s inset-shadow-neutral-50 ring-1 ring-indigo-400/20  py-5 px-2">
        <input {...register('email')} className="rounded-xl bg-[var(--interactive-color)] py-3 px-2" placeholder = 'Email'></input>
        {errors.email && <p>{errors.email.message}</p>}
        <input {...register('username')} className="rounded-xl bg-[var(--interactive-color)] py-3 px-2" placeholder = 'Username'></input>
        {errors.username && <p>{errors.username.message}</p>}
        <input {...register('password')} className="rounded-xl bg-[var(--interactive-color)] py-3 px-2" placeholder="Password"/>
        {errors.password && <p>{errors.password.message}</p>}
        <input {...register('passwordRepeat')} className="rounded-xl bg-[var(--interactive-color)] py-3 px-2" placeholder="Password"/>
        {errors.passwordRepeat && <p>{errors.passwordRepeat.message}</p>}
        <button type="submit" className="bg-[var(--accent-color)] w-full cursor-pointer py-3 px-8 rounded-xl  text-md font-bold font-stretch-150%">Sign up</button>
    </form>  
    </div>  
    </>
    )
}

export default Register