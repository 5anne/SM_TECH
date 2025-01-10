import { doLogout } from '@/app/actions';
import React from 'react';

const LogOut = () => {
    return (
        <div>
            <form action={doLogout}>
                <button className='border-[1px] rounded-lg px-4 py-2 hover:bg-[#FF6A1A]'
                    type='submit'
                >
                    Log Out
                </button>
            </form>
        </div>
    );
};

export default LogOut;