import React from 'react'
import LibraryButton from '../components/LibraryButton'

export default function LibraryBookItem({ isbn }) {
    return (
        <figure className="flex text-library-text">
            <img src="https://media.harrypotterfanzone.com/deathly-hallows-us-childrens-edition.jpg" alt="" className="h-40 rounded-lg" />
            <div className="flex flex-col px-7 py-3">
                <p className="text-2xl font-medium underline">Harry Potter and the Deathly Hallows</p>
                <p className="text-library-text text-opacity-50 text-md">by J.K Rowling</p>
                <div className="flex-grow"></div>
                {/* the bottom grid */}
                <div className="flex-grow flex gap-7 items-center">
                    <p className="text-green-600 font-semibold text-md">
                        Available
                    </p>
                    <div className="h-3/5 border-l-2 border-library-text border-opacity-20"></div>
                    <LibraryButton text="Fast Checkout">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                            <path d="M7.707 10.293a1 1 0 10-1.414 1.414l3 3a1 1 0 001.414 0l3-3a1 1 0 00-1.414-1.414L11 11.586V6h5a2 2 0 012 2v7a2 2 0 01-2 2H4a2 2 0 01-2-2V8a2 2 0 012-2h5v5.586l-1.293-1.293zM9 4a1 1 0 012 0v2H9V4z" />
                        </svg>
                    </LibraryButton>
                </div>
            </div>
        </figure>
    )
}
