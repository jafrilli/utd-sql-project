import React from 'react'
import { useRouter } from 'next/router'
import { useAppContext } from '../lib/state'
import SearchBar from './SearchBar'
import LibraryButton from './LibraryButton'
import Link from 'next/link'

export default function LibraryNavBar({ onEnter }) {
    const { cardId, setCardId } = useAppContext()
    const router = useRouter()

    const loginButton = (
        <LibraryButton text="Login" onClick={() => router.push('/login')}>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
            </svg>
        </LibraryButton>
    )

    const profileButton = (
        <LibraryButton text="Profile" onClick={() => router.push(`/borrower/${cardId}`)}>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
            </svg>
        </LibraryButton>
    )
    return (
        <div className="flex items-center justify-between">
            <Link href="/">
                <a className="text-4xl font-bold">
                    the<br />library.
                </a>
            </Link>
            <SearchBar onEnter={onEnter} className="relative" placeholder="Search by Book Title, Author, or ISBN" />
            {(cardId == null) ? loginButton : profileButton}
        </div>
    )
}
