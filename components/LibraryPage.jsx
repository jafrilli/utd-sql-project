import React from 'react'

export default function LibraryPage(props) {
    return (
        <div className="w-screen min-h-screen bg-library-bg px-20 py-10 text-library-text font-sans">
            {props.children}
        </div>
    )
}
