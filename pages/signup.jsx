import Head from 'next/head'
import Image from 'next/image'
import { useRouter } from 'next/router'
import styles from '../styles/Home.module.css'
import { useState } from 'react'
import { useAppContext } from '../lib/state'
import axios from 'axios'

export default function Signup() {
    const [name, setname] = useState("")
    const [ssn, setssn] = useState("")
    const [phone, setphone] = useState("")
    const [address, setaddress] = useState("")
    const [message, setmessage] = useState("")
    const { cardId, setCardId } = useAppContext()
    const router = useRouter()

    const signUp = (e) => {
        e.preventDefault()
        // validate
        for (const field of [name, ssn, phone, address]) {
            if (field.length == 0) {
                setmessage("All the fields are required. Try again after filling them all.")
                return
            }
        }
        // make the call
        fetch('/api/borrower', {
            method: 'POST',
            body: JSON.stringify({ name, ssn, phone, address }),
            headers: {
                'Content-Type': 'application/json',
            }
        })
            .then(async (res) => {
                const body = await res.json()
                if (res.status == 200) {
                    setCardId(body.cardId)
                    router.push('/')
                }
                else {
                    if (body.messages) setmessage(body.messages.join('\n'))
                    else setmessage('Something went wrong')
                }
            })
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-library-bg">

            <div className="p-16 w-2/3">

                <h2 className="text-4xl text-center font-bold text-library-text">Sign Up For</h2>
                <h2 className="text-4xl text-center font-bold mb-10 text-library-text">a Library Card</h2>

                <div className="flex justify-center">
                    <form className="mb-10 grid grid-cols-2 gap-4">

                        <div>
                            <input type="text"
                                value={name}
                                onInput={e => setname(e.target.value)}
                                className="w-auto border-10 mb-2 border-gray-200 p-3 rounded-lg outline-none focus:border-purple-500"
                                placeholder="Full Name"
                            />
                        </div>

                        <div>
                            <input type="text"
                                value={phone}
                                onInput={e => setphone(e.target.value)}
                                className="w-auto border-10 mb-2 border-gray-200 p-3 rounded-lg outline-none focus:border-purple-500"
                                placeholder="Phone"
                            />
                        </div>

                        <div>
                            <input type="text"
                                value={ssn}
                                onInput={e => setssn(e.target.value)}
                                className="w-auto border-10 mb-2 border-gray-200 p-3 rounded-lg outline-none focus:border-purple-500"
                                placeholder="SSN"
                            />
                        </div>

                        {/* <div>
                            <input type="text"
                                className="w-auto border-10 mb-2 border-gray-200 p-3 rounded-lg outline-none focus:border-purple-500"
                                placeholder="Password"
                            />
                        </div> */}

                        <div>
                            <input type="text"
                                value={address}
                                onInput={e => setaddress(e.target.value)}
                                className="w-auto border-10 mb-2 border-gray-200 p-3 rounded-lg outline-none focus:border-purple-500"
                                placeholder="Address"
                            />
                        </div>

                        {/* <div>
                            <input type="text"
                                className="w-auto border-10 mb-2 border-gray-200 p-3 rounded-lg outline-none focus:border-purple-500"
                                placeholder="Retype Password"
                            />
                        </div> */}

                    </form>

                </div>

                <div className="flex gap-2 flex-col items-center justify-center">
                    <button onClick={signUp} className="block w-80 border-10 opacity-80 bg-yellow-400 hover:bg-yellow-300 p-4 rounded-lg text-white hover:text-yellow-800 transition duration-300">Sign Up</button>
                    <p className="text-red-500">{message}</p>
                </div>

            </div>

        </div>
    )
}