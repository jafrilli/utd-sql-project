import React from 'react'
import LibraryNavBar from './LibraryNavBar'

export default function LibraryPage(props) {
    return (
        <div className="h-xl px-20 py-10 bg-cover bg-library-bg text-library-text font-sans">
            {props.children}
        </div>
    )
}
