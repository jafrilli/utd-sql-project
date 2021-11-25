import React from 'react'

export default function LibrarySheet({children}) {
    return (
        <div className="flex bg-white bg-opacity-40 px-5 py-4 rounded-xl">
            {children}
        </div>
    )
}
