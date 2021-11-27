import React from 'react'
import LibrarySheet from './LibrarySheet'

export default function LibraryButton({ children, text, onClick }) {
    return (
        <button onClick={onClick}>
            <LibrarySheet>
                <div className="flex gap-2">
                    {children}
                    <div className="text-base font-medium">
                        {text}
                    </div>
                </div>
            </LibrarySheet>
        </button>
    )
}
