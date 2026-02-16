"use client";
import { loginUser } from '@/app/actions/user.action';
import { LoginFormInputs, loginSchema } from '@/app/schema/singnin.schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { SubmitHandler, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';

export default function SignInForm() {
    const router = useRouter();

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<LoginFormInputs>({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            email: '',
            password: '',
        },
    });

    const onSubmit: SubmitHandler<LoginFormInputs> = async (data) => {
        try {
            const user = await loginUser(data);
            console.log('user', user);
            toast.success('Logged In.')
            router.push('/user');
        } catch (error) {
            if (error instanceof Error) {
                toast.error(error.message);
            } else {
                toast.error("An unknown error occurred");
            }
        }
    };

    return (
        <form className='flex flex-col w-full' method="post" onSubmit={handleSubmit(onSubmit)}>
            <div className="relative w-full mt-6">
                <input
                    type="text"
                    id="email"
                    {...register('email')}
                    placeholder=" "
                    className="peer w-full text-base font-normal leading-5 
                    bg-transparent outline-none z-1
                    pt-2 pb-1.75 px-0
                    text-(--text-color)
                    border-0 border-b border-b-[rgb(206,206,222)]
                    focus:border-b-(--hover-color)
                    caret-(--hover-color)"
                />
                {errors && (
                    <span
                        id={`error`}
                        className="text-red-500 text-xs"
                    >
                        {errors?.email?.message}
                    </span>
                )}
                <label
                    htmlFor="email"
                    className="
                    absolute left-0 top-3
                    text-(--input-label-color)
                    text-base
                    transition-all duration-200
                    px-1 pointer-events-none peer-focus:-translate-y-6
                    peer-focus:-translate-x-2
                    peer-focus:text-xs
                    peer-focus:bg-white
                    peer-focus:px-2
                    peer-focus:text-(--hover-text)
                    peer-not-placeholder-shown:-translate-y-6
                    peer-not-placeholder-shown:-translate-x-2
                    peer-not-placeholder-shown:text-xs
                    peer-not-placeholder-shown:bg-white
                    peer-not-placeholder-shown:px-2
                    peer-placeholder-shown:translate-y-0
                    peer-placeholder-shown:text-base"
                >
                    Email
                </label>
            </div>
            <div className="relative w-full mt-6">
                <input
                    type="password"
                    id="password"
                    {...register('password')}
                    placeholder=" "
                    className="peer w-full text-base font-normal leading-5 not-italic
                    bg-transparent outline-none z-1
                    pt-2 pb-1.75 px-0
                    text-[rgb(53,53,67)]
                    border-0 border-b border-b-[rgb(206,206,222)]
                    focus:border-b-(--hover-color)
                    caret-(--hover-color)"
                />
                {errors && (
                    <span
                        id={`error`}
                        className="text-red-500 text-xs"
                    >
                        {errors?.password?.message}
                    </span>
                )}
                <label
                    htmlFor="password"
                    className="
                    absolute left-0 top-3
                    text-(--input-label-color)
                    text-base
                    transition-all duration-200
                    px-1 pointer-events-none peer-focus:-translate-y-6
                    peer-focus:-translate-x-2
                    peer-focus:text-xs
                    peer-focus:bg-white
                    peer-focus:px-2
                    peer-focus:text-(--hover-text)
                    peer-not-placeholder-shown:-translate-y-6
                    peer-not-placeholder-shown:-translate-x-2
                    peer-not-placeholder-shown:text-xs
                    peer-not-placeholder-shown:bg-white
                    peer-not-placeholder-shown:px-2
                    peer-placeholder-shown:translate-y-0
                    peer-placeholder-shown:text-base"
                >
                    Password
                </label>
            </div>
            <button className="primary-btn mt-6" disabled={isSubmitting}>
                <span>{isSubmitting ? "Signing..." : "Continue"}</span>
            </button>
        </form>
    )
}
