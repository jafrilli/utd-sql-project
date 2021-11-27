import LibraryPage from '../../components/LibraryPage'
import LibraryButton from '../../components/LibraryButton'
import LibraryNavBar from '../../components/LibraryNavBar'
import { LibraryBookSearchItemAvailable } from '../../components/LibraryBookItem'
import { useRouter } from 'next/router'
import useSWR from 'swr'

export default function Details() {

    const router = useRouter()
    const { isbn } = router.query
    const { data, error } = useSWR(`/api/book?isbn=${isbn}`, (url) => fetch(url).then(res => res.json()))

    if (error) return;

    return (
        <LibraryPage>
            <LibraryNavBar />
            <section className="flex justify-center h-screen mt-16">
                <img src={`https://covers.openlibrary.org/b/isbn/${isbn}-L.jpg`} alt="" className="h-96 rounded-lg" />
                <div className="flex flex-col gap-2 px-7 py-3">
                    <div>
                        <p className="text-2xl font-medium">{data ? data.title : "Loading..."}</p>
                        <p className="text-library-text text-opacity-50 text-md">by {(data ? data.Authors : []).map(a => a.name).join(', ')}</p>
                    </div>
                    <LibraryBookSearchItemAvailable data={{isbn}} details />
                </div>
            </section>
        </LibraryPage>
    )
}
