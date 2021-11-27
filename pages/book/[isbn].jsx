import LibraryPage from '../../components/LibraryPage'
import LibraryButton from '../../components/LibraryButton'
import { useRouter } from 'next/router'
import useSWR from 'swr'

export default function Details() {

    const router = useRouter()
    const { isbn } = router.query
    const { data, error } = useSWR(`/api/book?isbn=${isbn}`, (url) => fetch(url).then(res => res.json()))

    if (error) return;

    return (
        <LibraryPage>
            <section className="flex justify-center h-screen mt-16">
                <img src={`https://covers.openlibrary.org/b/isbn/${isbn}-L.jpg`} alt="" className="h-96 rounded-lg" />
                <div className="flex flex-col gap-2 px-7 py-3">
                    <div>
                        <p className="text-2xl font-medium">{data ? data.title : "Loading..."}</p>
                        <p className="text-library-text text-opacity-50 text-md">by {(data ? data.Authors : []).map(a => a.name).join(', ')}</p>
                    </div>
                    <div className="flex gap-7 items-center">
                        <p className="text-green-600 font-semibold text-md">
                            Available
                        </p>
                        <div className="h-3/5 border-l-2 border-library-text border-opacity-20"></div>
                        <LibraryButton text="Checkout">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                            </svg>
                        </LibraryButton>
                    </div>
                </div>
            </section>
        </LibraryPage>
    )
}
