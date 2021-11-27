import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { useAppContext } from '../lib/state'
import styles from '../styles/Home.module.css'

export default function Login() {
  const [id, setid] = useState("")
  const [message, setmessage] = useState("")
  const { cardId, setCardId } = useAppContext()
  const router = useRouter()

  const login = (e) => {
    e.preventDefault()
    // validate
    if (id.length == 0) {
      setmessage("All the fields are required. Try again after filling them all.")
      return
    }
    // make the call
    fetch(`/api/borrower?cardId=${id}`)
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

        <h2 className="text-4xl text-center font-bold text-library-text">Login To Your</h2>
        <h2 className="text-4xl text-center font-bold mb-10 text-library-text">Library Account</h2>

        <form className="space-y-5 flex flex-col justify-center items-center">

          <div>
            <input type="text"
              input={id}
              onInput={e => setid(e.target.value)}
              className="w-60 border-10 mb-5 border-gray-200 p-3 rounded-lg outline-none focus:border-purple-500"
              placeholder="Card ID"
            />
          </div>

          <div>
            <button onClick={login} className="block w-80 border-10 opacity-80 bg-yellow-400 hover:bg-yellow-300 p-4 rounded-lg text-white hover:text-yellow-800 transition duration-300">Login</button>
          </div>

          <div>
            <Link href="/signup"><a className="text-center font-bold block w-80 h-auto opacity-80 bg-library-bg hover:p-4 rounded-lg text-library-text hover:text-purple-800 transition duration-300">Sign Up</a></Link>
          </div>
          <p className="text-red-500">{message}</p>

        </form>

        <h2 className="text-lg text-center font-bold mt-64 text-library-text">Librarian Portal</h2>

      </div>

    </div>
  )
}