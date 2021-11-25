import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import SearchBar from '../components/SearchBar'
import LibraryPage from '../components/LibraryPage'
import LibraryButton from '../components/LibraryButton'
import LibraryBookItem from '../components/LibraryBookItem'

export default function Home() {
  return (
    <LibraryPage>
      <screen>
        <div className="flex items-center justify-between">
          <div className="text-4xl font-bold">
            the<br />library.
          </div>
          <SearchBar className="relative" placeholder="Search by Book Title, Author, or ISBN" />
          <LibraryButton text="Login">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
            </svg>
          </LibraryButton>
        </div>


        <section className="flex h-screen mt-5">
          <div className="lg:w-30 md:w-20"></div>
          <div className="flex flex-col">
            <div className="py-5">
              <p className="text-3xl font-bold">Results</p>
              <p className="text-md text-library-text text-opacity-60">Click a book to view details</p>
            </div>
            <div className="flex flex-col gap-10">
              <LibraryBookItem />
              <LibraryBookItem />
              <LibraryBookItem />
            </div>
          </div>

        </section>


      </screen>
    </LibraryPage>
  )
}
