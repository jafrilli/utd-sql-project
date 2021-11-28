import React from 'react'
import LibraryButton from '../components/LibraryButton'
import Link from 'next/link'
import useSWR from 'swr'
import { useRouter } from 'next/router'
import { useAppContext } from '../lib/state'

export function LibraryBookSearchItem({ isbn }) {

    // check availability
    const { data, error } = useSWR(`/api/book?isbn=${isbn}`, (url) => fetch(url).then(res => res.json()))

    if (data) {
        return (
            <figure className="flex text-library-text">
                <img src={`https://covers.openlibrary.org/b/isbn/${data.isbn}-M.jpg`} alt="" className="h-40 rounded-lg bg-white bg-opacity-30" />
                <div className="flex flex-col px-7 py-3">
                    <p className="text-2xl font-medium">{data.title}</p>
                    <p className="text-library-text text-opacity-50 text-md">by {(data.Authors ?? []).map(a => a.name).join(', ')}</p>
                    <p className="text-library-text text-opacity-50 text-md">ISBN: {isbn}</p>
                    <div className="flex-grow"></div>
                    {/* the bottom grid */}
                    {(data.Loans ? (data.Loans.length > 0 ? <LibraryBookSearchItemUnavailable data={data} /> : <LibraryBookSearchItemAvailable data={data} />) : [])}
                </div>
            </figure>

        )
    }
    return (<div>{error}</div>)
}

export function LibraryBookSearchItemAvailable({ data }) {
    const router = useRouter()
    const { cardId } = useAppContext()

    const checkout = () => {
        if (cardId && cardId.startsWith('ID'))
            fetch('/api/checkout', {
                method: 'POST',
                body: JSON.stringify({ cardId, isbn: data.isbn }),
                headers: {
                    'Content-Type': 'application/json',
                }
            })
                .then(async (res) => {
                    const body = await res.json()
                    if (res.status == 200) {
                        router.push(`/borrower`)
                    }
                    else {
                        if (body.messages) alert(body.messages.join('\n'))
                        console.log('failed')
                    }
                })
        else {
            alert("You must be logged in to checkout a book!")
        }
    }

    return (
        <div className="flex-grow flex gap-7 items-center">
            <p className="text-green-600 font-semibold text-md">Available</p>
            <div className="h-3/5 border-l-2 border-library-text border-opacity-20"></div>
            <LibraryButton text="Checkout" onClick={checkout}>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M7.707 10.293a1 1 0 10-1.414 1.414l3 3a1 1 0 001.414 0l3-3a1 1 0 00-1.414-1.414L11 11.586V6h5a2 2 0 012 2v7a2 2 0 01-2 2H4a2 2 0 01-2-2V8a2 2 0 012-2h5v5.586l-1.293-1.293zM9 4a1 1 0 012 0v2H9V4z" />
                </svg>
            </LibraryButton>
        </div>
    )
}

export function LibraryBookSearchItemUnavailable({ data }) {
    const dueDate = data.Loans[0].dueDate
    const daysLeft = Math.round((new Date(dueDate) - new Date()) / (1000 * 60 * 60 * 24))
    return (
        <div className="flex-grow flex gap-7 items-center">
            <p className="text-red-600 font-semibold text-md">Unavailable</p>
            <div className="h-3/5 border-l-2 border-library-text border-opacity-20"></div>
            <div className="flex flex-col items-center">
                <p className="font-thin text-md">To Be Returned In</p>
                <p className="text-library-text font-semibold text-md">{daysLeft} days</p>
            </div>
        </div>
    )
}

export function LibraryBookBorrowerItem({ isbn }) {

    // check availability
    const router = useRouter()
    const { cardId } = useAppContext()
    const { data, error } = useSWR(`/api/book?isbn=${isbn}`, (url) => fetch(url).then(res => res.json()))

    const checkin = () => {
        if (cardId && cardId.startsWith('ID'))
            fetch('/api/checkin', {
                method: 'POST',
                body: JSON.stringify({ cardId, isbns: [data.isbn] }),
                headers: {
                    'Content-Type': 'application/json',
                }
            })
                .then(async (res) => {
                    const body = await res.json()
                    if (res.status == 200) {
                        alert('Successfully checked in book!')
                        router.reload()
                    }
                    else {
                        if (body.messages) alert(body.messages.join('\n'))
                        console.log('failed')
                    }
                })
        else {
            alert("You must be logged in to checkin a book!")
        }
    }

    if (data && !data.messages && data.Loans[0]) {
        const dateOut = new Date(data.Loans[0].dateOut)
        const dueDate = new Date(data.Loans[0].dueDate)
        const daysLeft = Math.round((dueDate - new Date()) / (1000 * 60 * 60 * 24))
        return (
            <figure className="flex text-library-text">
                <img src={`https://covers.openlibrary.org/b/isbn/${data.isbn}-M.jpg`} alt="" className="h-40 rounded-lg bg-white bg-opacity-30" />
                <div className="flex flex-col px-7 py-3">
                    <div onClick={checkin}><p className="text-2xl font-medium underline">{data.title}</p></div>
                    <p className="text-library-text text-opacity-50 text-md">by {(data.Authors ?? []).map(a => a.name).join(', ')}</p>
                    <p className="text-library-text text-opacity-50 text-md">ISBN: {isbn}</p>
                    <div className="flex-grow"></div>
                    {/* the bottom grid */}
                    <div className="flex-grow flex gap-7 items-center">
                        <div className="flex flex-col items-center">
                            <p className="text-library-text font-semibold text-md">{dateOut.toLocaleString('default', { month: 'short', day: 'numeric' })}</p>
                            <p className="font-thin text-md -mt-0.5">Checked out</p>
                        </div>
                        <div className="h-3/5 border-l-2 border-library-text border-opacity-20"></div>
                        <div className="flex flex-col items-center">
                            <p className="text-library-text font-semibold text-md">{dueDate.toLocaleString('default', { month: 'short', day: 'numeric' })}</p>
                            <p className="font-thin text-md -mt-0.5">Due Date</p>
                        </div>
                        <div className="h-3/5 border-l-2 border-library-text border-opacity-20"></div>
                        <div className="flex flex-col items-center">
                            <p className="text-library-text font-semibold text-md">{daysLeft} days</p>
                            <p className="font-thin text-md -mt-0.5">Until Due</p>
                        </div>
                    </div>
                </div>
            </figure>
        )
    }
    return (<div>{error}</div>)
}