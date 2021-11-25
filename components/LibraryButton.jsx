import React from 'react'
import LibrarySheet from './LibrarySheet'

export default function LibraryButton({ children, text, onClick }) {
    return (
        <LibrarySheet onClick={onClick}>
            <div className="flex gap-2">
                {children}
                <div className="text-base font-medium">
                    {text}
                </div>
            </div>
        </LibrarySheet>
    )
}
