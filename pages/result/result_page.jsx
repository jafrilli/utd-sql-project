import React from "react";
import Head from 'next/head';
export default function ResultPage() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-library-400">
          <div className="bg-white p-16 rounded shadow-2xl w-2/3">
            <div className="flex justify-center mx-2 items-center  mb-10 flex-col w-22">
              <h1 className="text-3xl font-bold mt-20 mb-20 ">
                What do you plan on doing after graduation?
              </h1>
    
              <button className="w-3/5 h-10 px-6 text-gray-700 bg-blue-100 block border-0 border-b-2 border-blue-500 hover:bg-yellow-500 text-gray-800 transition-colors duration-150 rounded-lg focus:shadow-outline mb-6">
                Law School
              </button>
    
              <button className="w-3/5 h-10 px-6 text-gray-700 bg-blue-100 block border-0 border-b-2 border-blue-500 hover:bg-yellow-500 text-gray-800 transition-colors duration-150 rounded-lg focus:shadow-outline mb-6">
                Medical School
              </button>
    
              <button className="w-3/5 h-10 px-6 text-gray-700 bg-blue-100 block border-0 border-b-2 border-blue-500 hover:bg-yellow-500 text-gray-800 transition-colors duration-150 rounded-lg focus:shadow-outline mb-6">
                Research
              </button>
    
              <button className="w-3/5 h-10 px-6 text-gray-700 bg-blue-100 block border-0 border-b-2 border-blue-500 hover:bg-yellow-500 text-gray-800 transition-colors duration-150 rounded-lg focus:shadow-outline mb-6">
                Graduate School
              </button>
    
              <button className="w-3/5 h-10 px-6 text-gray-700 bg-blue-100 block border-0 border-b-2 border-blue-500 hover:bg-yellow-500 text-gray-800 transition-colors duration-150 rounded-lg focus:shadow-outline mb-6">
                Industry
              </button>
    
              <button className="w-3/5 h-10 px-6 text-gray-700 bg-blue-100 block border-0 border-b-2 border-blue-500 hover:bg-yellow-500 text-gray-800 transition-colors duration-150 rounded-lg focus:shadow-outline mb-6">
                Entreprenurship
              </button>
    
              <button className="w-3/5 h-10 px-6 text-gray-700 bg-blue-100 block border-0 border-b-2 border-blue-500 hover:bg-yellow-500 text-gray-800 transition-colors duration-150 rounded-lg focus:shadow-outline mb-6">
                Military
              </button>
    
              <button className="w-3/5 h-10 px-6 text-gray-700 bg-blue-100 block border-0 border-b-2 border-blue-500 hover:bg-yellow-500 text-gray-800 transition-colors duration-150 rounded-lg focus:shadow-outline mb-6">
                Undecided
              </button>
            </div>
          </div>
        </div>
      );
  }