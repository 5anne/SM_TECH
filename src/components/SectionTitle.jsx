import React from 'react';

const SectionTitle = ({ tag, title, description }) => {
    return (
        <div>
            <div className='flex justify-center items-center'>
                <button className='text-[#749B3F] font-semibold bg-[#749B3F1A] px-4 py-1 rounded-2xl'>{tag}</button>
            </div>
            <h1 className='text-center text-[#212337] text-2xl lg:text-4xl font-bold my-3'>{title}</h1>
            <p className='text-center text-[#4A4A52] lg:max-w-xl mx-auto'>{description}</p>
        </div>
    );
};

export default SectionTitle;