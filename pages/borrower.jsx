import LibraryPage from '../components/LibraryPage'
import LibraryButton from '../components/LibraryButton'
import LibraryNavBar from '../components/LibraryNavBar'
import { useRouter } from 'next/router'
import { useAppContext } from '../lib/state'
import useSWR from 'swr'
import { LibraryBookBorrowerItem } from '../components/LibraryBookItem'

export default function Borrower() {
    // data needed: loans, fines, borrower
    const fetcher = (...urls) => {
        const f = (u) => fetch(u).then((r) => r.json());

        if (urls.length > 1) {
            return Promise.all(urls.map(f));
        }
        return f(urls);
    }

    const router = useRouter()
    const { cardId, setCardId } = useAppContext()
    const { data, error } = useSWR([`/api/borrower?cardId=${cardId}`, `/api/fines?cardId=${cardId}`], fetcher)

    const payFine = (amount, loanIds) => {
        if (amount == 0) {
            alert("There are no fines for you to pay.")
            return
        }
        fetch('/api/pay', {
            method: 'POST',
            body: JSON.stringify({ loanIds }),
            headers: {
                'Content-Type': 'application/json',
            }
        })
            .then(async (res) => {
                const body = await res.json()
                if (res.status == 200) {
                    alert('Payment was successful!')
                    router.reload()
                }
                else {
                    if (body.messages) alert(body.messages.join('\n'))
                    else alert('Could not complete payment')
                }
            })
    }

    if (data && data.length == 2 && !data[0].messages && !data[1].messages) {
        const fines = []
        const unpaidFines = []
        let totalFine = 0
        for (const fine of data[1]) {
            if (!fine.Fine.paid) {
                totalFine += fine.Fine.amount
                unpaidFines.push(fine)
            }
            fines.push(fine)
        }
        return (<LibraryPage>
            <LibraryNavBar />
            <div className="grid grid-cols-3 gap-8 mt-10">
                <section className="col-span-1 mx-8 my-4 justify-self-end flex flex-col items-center gap-3">
                    <div className="flex items-center justify-center w-60 h-60 rounded-full bg-white">
                        <p className="text-yellow-500 font-bold text-8xl">{data[0].name.split(' ').map(n => n[0])}</p>
                    </div>
                    <div className="text-center">
                        <p className="font-bold text-3xl">{data[0].name}</p>
                        <p className="text-md text-library-text text-opacity-70 mb-3">{cardId}</p>
                        <LibraryButton onClick={() => { setCardId(null); router.push('/login') }} text="Sign Out">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M9 3a1 1 0 012 0v5.5a.5.5 0 001 0V4a1 1 0 112 0v4.5a.5.5 0 001 0V6a1 1 0 112 0v5a7 7 0 11-14 0V9a1 1 0 012 0v2.5a.5.5 0 001 0V4a1 1 0 012 0v4.5a.5.5 0 001 0V3z" clipRule="evenodd" />
                            </svg>
                        </LibraryButton>
                    </div>
                </section>
                <section className="col-span-2 flex flex-col gap-10">
                    <div>
                        <p className="text-3xl font-bold">Fines</p>
                        <div className="flex items-center justify-between w-2/3 mb-5">
                            <div className="flex gap-2 items-end">
                                <p className="font-medium text-5xl text-yellow-400">${totalFine.toFixed(2)}</p>
                                <p className="text-3xl text-yellow-400 text-opacity-60">due</p>
                            </div>
                            <LibraryButton onClick={() => payFine(totalFine, unpaidFines.map(f => f.Fine.loanId))} text="Pay Now">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                    <path d="M4 4a2 2 0 00-2 2v1h16V6a2 2 0 00-2-2H4z" />
                                    <path fillRule="evenodd" d="M18 9H2v5a2 2 0 002 2h12a2 2 0 002-2V9zM4 13a1 1 0 011-1h1a1 1 0 110 2H5a1 1 0 01-1-1zm5-1a1 1 0 100 2h1a1 1 0 100-2H9z" clipRule="evenodd" />
                                </svg>
                            </LibraryButton>
                        </div>
                        {fines.map(f => {
                            return (
                                <div key={f.Book.isbn} className="flex gap-5 mt-2">
                                    {f.Fine.paid ? (<p className="font-bold text-green-500 text-md">PAID</p>) : (<p className="font-bold text-red-500 text-md">UNPAID</p>)}
                                    <p className="font-bold text-md text-yellow-600">${f.Fine.amount.toFixed(2)}</p>
                                    <p className="text-library-text text-md">{f.Book.title} [<span className="text-library-text text-opacity-50">{f.Book.isbn}</span>] </p>
                                </div>
                            )
                        })}
                    </div>
                    <div className="flex flex-col gap-7">
                        <div>
                            <p className="text-3xl font-bold">Books Out ({data[0].Loans.length})</p>
                            <p className="text-md text-library-text text-opacity-60">Click a book to check it in</p>
                        </div>
                        {data[0].Loans.map(l => (<LibraryBookBorrowerItem key={l.isbn} isbn={l.isbn} />))}
                    </div>
                </section>
            </div>
        </LibraryPage>
        )
    }
    if (data && data.length == 2 && (data[0].messages || data[1].messages)) {
        return (<LibraryPage><LibraryNavBar /><div className="text-center mt-10">You need to log in to view your profile. Click the Login button to login.</div></LibraryPage>)
    }
    else return (<div>{error}</div>)
}
