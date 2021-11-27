import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import LibraryPage from '../components/LibraryPage'
import { LibraryBookSearchItem } from '../components/LibraryBookItem'
import LibraryNavBar from '../components/LibraryNavBar'

export default function Home() {

  const [message, setmessage] = useState('')
  const [page, setpage] = useState(1)
  const router = useRouter()
  const { s } = router.query

  const [books, setbooks] = useState([])

  useEffect(() => {
    setpage(1)
    if (s) {
      // search
      search(s)
    }
  }, [s])

  useEffect(() => { }, [books])

  const search = (s) => {
    fetch(`/api/search?s=${s}&page=${page}&amount=${10}`)
      .then(async (res) => {
        const body = await res.json()
        if (res.status == 200) {
          setbooks([...body])
        }
        else {
          if (body.messages) setmessage(body.messages.join('\n'))
          else setmessage('Something went wrong')
        }
      })
  }

  return (
    <LibraryPage>
      <LibraryNavBar onEnter={(input) => {
        router.push({
          pathname: '/',
          query: {
            s: input.replace(" ", "+")  // update the query param
          }
        }, undefined, { shallow: true })
        search(input)
      }} />
      <section className="flex h-screen mt-5">
        <div className="lg:w-30 md:w-20"></div>
        <div className="flex flex-col">
          {books.length > 0 ? <div className="py-5">
            <p className="text-3xl font-bold">Results</p>
            <p className="text-md text-library-text text-opacity-60">Select an available book to checkout</p>
          </div> : <div className="py-5">
            <p className="text-3xl font-bold">Search for something above ^</p>
          </div>}
          <div className="flex flex-col gap-10">
            {books.map(b => (<LibraryBookSearchItem key={b.isbn} isbn={b.isbn} />))}
          </div>
        </div>
      </section>
    </LibraryPage>
  )
}
