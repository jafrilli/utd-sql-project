import Head from 'next/head'
import Image from 'next/image'
import styles from '../../styles/Home.module.css'

export default function Details() {
    return (
        <div class="min-h-screen flex items-center justify-center bg-purple-200">

            <div class="p-16 w-2/3">

                <h2 class="text-4xl text-center font-bold text-purple-600">Sign Up For</h2>
                <h2 class="text-4xl text-center font-bold mb-10 text-purple-600">a Library Card</h2>

                <div class="flex justify-center">
                    <form class="mb-10 grid grid-cols-2 grid-rows-3 gap-4">

                        <div>
                            <input type="text"
                                class="w-auto border-10 mb-2 border-gray-200 p-3 rounded-lg outline-none focus:border-purple-500"
                                placeholder="Full Name"
                            />
                        </div>

                        <div>
                            <input type="text"
                                class="w-auto border-10 mb-2 border-gray-200 p-3 rounded-lg outline-none focus:border-purple-500"
                                placeholder="User Name"
                            />
                        </div>

                        <div>
                            <input type="text"
                                class="w-auto border-10 mb-2 border-gray-200 p-3 rounded-lg outline-none focus:border-purple-500"
                                placeholder="SSN"
                            />
                        </div>

                        <div>
                            <input type="text"
                                class="w-auto border-10 mb-2 border-gray-200 p-3 rounded-lg outline-none focus:border-purple-500"
                                placeholder="Password"
                            />
                        </div>

                        <div>
                            <input type="text"
                                class="w-auto border-10 mb-2 border-gray-200 p-3 rounded-lg outline-none focus:border-purple-500"
                                placeholder="Address"
                            />
                        </div>

                        <div>
                            <input type="text"
                                class="w-auto border-10 mb-2 border-gray-200 p-3 rounded-lg outline-none focus:border-purple-500"
                                placeholder="Retype Password"
                            />
                        </div>

                    </form>

                </div>

                <div class="flex items-center justify-center">
                    <button class="block w-80 border-10 opacity-80 bg-yellow-400 hover:bg-yellow-300 p-4 rounded-lg text-white hover:text-yellow-800 transition duration-300">Sign Up</button>
                </div>

            </div>

        </div>
    )
}