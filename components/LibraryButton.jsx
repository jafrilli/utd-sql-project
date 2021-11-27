import React from 'react'
import LibrarySheet from './LibrarySheet'

export default function LibraryButton({ children, text, onClick }) {
    return (
        <button onClick={onClick}>
            <LibrarySheet>
                <div className="flex items-center gap-2">
                    {children}
                    {text.length > 0 && <div className="text-base font-medium">
                        {text}
                    </div>}
                </div>
            </LibrarySheet>
        </button>
    )
}
