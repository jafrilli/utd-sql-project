import Head from 'next/head'
import Image from 'next/image'
import styles from '../../styles/Home.module.css'
import SearchBar from '../../components/SearchBar'
import LibraryPage from '../../components/LibraryPage'
import LibraryButton from '../../components/LibraryButton'

export default function Details() {
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


                <section className="flex justify-center h-screen mt-16">
                    <img src="https://m.media-amazon.com/images/I/71Q1Iu4suSL._AC_SL1000_.jpg" alt="" className="h-96 rounded-lg" />
                    <div className="flex flex-col gap-2 px-7 py-3">
                        <div>
                            <p className="text-2xl font-medium">Harry Potter and the Deathly Hallows</p>
                            <p className="text-library-text text-opacity-50 text-md">by J.K Rowling</p>
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
                        <p className="text-md text-library-text w-96">
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi.
                        </p>
                    </div>
                </section>


            </screen>
        </LibraryPage>
    )
}
