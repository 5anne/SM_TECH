import { doSocialLogin } from '@/app/actions';
import Image from 'next/image';
import google from "../../images/google.jpg";
import { FaGithub } from 'react-icons/fa';

const AuthForm = () => {

    return (
        <div>
            <form action={doSocialLogin} className='flex justify-center items-center mt-4 gap-2'>
                <button
                    className='flex justify-center items-center gap-2 py-2 px-6 border-2 rounded-md text-[#212337] font-bold w-1/2 hover:bg-slate-100'
                    type='submit'
                    name='action'
                    value='google'
                >
                    <Image width={20} height={20} alt='Google' src={google} />
                    Google
                </button>

                <button
                    className='flex justify-center items-center gap-2 py-2 px-6 border-2 rounded-md text-[#212337] font-bold w-1/2 hover:bg-slate-100'
                    type='submit'
                    name='action'
                    value='github'
                >
                    <span className='text-lg'><FaGithub /></span>
                    GitHub
                </button>
            </form>
        </div>
    );
};

export default AuthForm;
