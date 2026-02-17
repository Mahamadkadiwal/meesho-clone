import SignUpForm from "@/app/_component/User/SignUpForm"
import Image from "next/image"
export default function Page() {
    return (
        <div className="h-screen w-screen flex justify-center overflow-y-auto 
        bg-linear-to-b from-[rgb(253,233,242)] to-[rgb(253,240,232)]">
            <div className="mt-10 mb-20 h-177 w-108 relative bg-(--header-bg) rounded-lg border border-(--form-border-color)">
                <div className="overflow-hidden rounded-lg">
                    <Image src="/signup/signupbg.webp" alt="signup" width={433} height={200} className="object-fill" />
                </div>
                <div className="flex flex-col justify-between bg-(--header-bg)">    
                    <div className="mt-10 pl-12 pr-12 rounded-lg">
                        <h6 className="text-(--text-color) font-bold text-xl leading-7 m-0 p-0">Sign Up to view your profile</h6>
                        <div className="flex items-end bg-(--header-bg) mt-5">
                            <SignUpForm />
                        </div>
                    </div>
                </div>

                <span
                    className="absolute bottom-5 left-26 right-26
                    flex flex-wrap items-center justify-center
                    text-xs tracking-[0.012em]"
                >
                    By continuing, you agree to Meesho&apos;s&nbsp;
                    <a href="" className="mx-1 font-semibold text-[12px] leading-4 text-[rgb(159,32,137)] font-['Mier_demi']">
                        Terms & Conditions
                    </a>
                    and&nbsp;
                    <a href="" className="mx-1 font-semibold text-[12px] leading-4 text-[rgb(159,32,137)] font-['Mier_demi']">
                        Privacy Policy
                    </a>
                </span>

            </div>

        </div>
    )
}
