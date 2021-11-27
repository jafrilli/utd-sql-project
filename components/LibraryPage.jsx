import React from 'react'
import LibraryNavBar from './LibraryNavBar'

export default function LibraryPage(props) {
    return (
        <div className="w-screen min-h-screen px-20 py-10 bg-library-bg text-library-text font-sans">
            {props.children}
        </div>
    )
}
