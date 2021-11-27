import LibraryPage from '../../components/LibraryPage'
import LibraryButton from '../../components/LibraryButton'

export default function Borrower() {
    // data needed: loans, fines, borrower
    return (
        <LibraryPage>
            <div className="grid grid-cols-3 gap-8 mt-10">
                <section className="col-span-1 mx-8 my-4 justify-self-end flex flex-col items-center gap-3">
                    <div className="flex items-center justify-center w-60 h-60 rounded-full bg-white">
                        <p className="text-yellow-500 font-bold text-8xl">CD</p>
                    </div>
                    <div className="text-center">
                        <p className="font-bold text-3xl">Chris Davis</p>
                        <p className="text-md text-library-text text-opacity-70">Member since 2021</p>
                    </div>
                </section>
                <section className="col-span-2 flex flex-col gap-10">
                    <div>
                        <p className="text-3xl font-bold">Fines</p>
                        <div className="flex items-center justify-between w-2/3">
                            <div className="flex gap-2 items-end">
                                <p className="font-medium text-5xl text-yellow-400">$30.00</p>
                                <p className="text-3xl text-yellow-400 text-opacity-60">due</p>
                            </div>
                            <LibraryButton text="Pay Now">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                    <path d="M4 4a2 2 0 00-2 2v1h16V6a2 2 0 00-2-2H4z" />
                                    <path fillRule="evenodd" d="M18 9H2v5a2 2 0 002 2h12a2 2 0 002-2V9zM4 13a1 1 0 011-1h1a1 1 0 110 2H5a1 1 0 01-1-1zm5-1a1 1 0 100 2h1a1 1 0 100-2H9z" clipRule="evenodd" />
                                </svg>
                            </LibraryButton>
                        </div>
                    </div>
                    <div className="flex flex-col gap-5">
                        <div>
                            <p className="text-3xl font-bold">Books Out (2)</p>
                            <p className="text-md text-library-text text-opacity-60">Click a book to check it in</p>
                        </div>
                        {/* <LibraryBookItem />
                        <LibraryBookItem />
                        <LibraryBookItem />
                        <LibraryBookItem /> */}
                    </div>
                </section>
            </div>
        </LibraryPage>
    )
}
