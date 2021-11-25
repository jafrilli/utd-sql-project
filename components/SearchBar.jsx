import React from 'react'
import 'tailwindcss/tailwind.css'

export default function SearchBar({ placeholder }) {
    return (
        <div className="flex gap-5 justify-center items-center flex-grow -m-5">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input 
                placeholder={placeholder} 
                type="text" 
                className="text-lg flex-none w-1/2 placeholder-library-text placeholder-opacity-70 bg-white bg-opacity-50 px-4 py-2.5 rounded-xl tracking-tighter" />
        </div>
    )
}
