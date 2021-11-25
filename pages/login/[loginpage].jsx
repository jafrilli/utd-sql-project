import Head from 'next/head'
import Image from 'next/image'
import styles from '../../styles/Home.module.css'

export default function Details() {
  return (
    <div class="min-h-screen flex items-center justify-center bg-purple-200">

      <div class="p-16 w-2/3">

        <h2 class="text-4xl text-center font-bold text-purple-600">Login To Your</h2>
        <h2 class="text-4xl text-center font-bold mb-10 text-purple-600">Library Account</h2>

        <form class="space-y-5 flex flex-col justify-center items-center">

          <div>
            <input type="text"
              class="w-60 border-10 mb-5 border-gray-200 p-3 rounded-lg outline-none focus:border-purple-500"
              placeholder="User Name"
            />
          </div>

          <div>
            <input type="text"
              class="w-60 border-10 mb-10 border-gray-200 p-3 rounded-lg outline-none focus:border-purple-500"
              placeholder="Password"
            />
          </div>

          <div>
            <button class="block w-80 border-10 opacity-80 bg-yellow-400 hover:bg-yellow-300 p-4 rounded-lg text-white hover:text-yellow-800 transition duration-300">Login</button>
          </div>

          <div>
            <button class="font-bold block w-80 h-auto opacity-80 bg-purple-200 hover:p-4 rounded-lg text-purple-600 hover:text-purple-800 transition duration-300">Sign Up</button>
          </div>

        </form>

        <h2 class="text-lg text-center font-bold mt-64 text-purple-600">Librarian Portal</h2>

      </div>

    </div>
  )
}