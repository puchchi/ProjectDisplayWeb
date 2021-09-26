import React from 'react'
import data from '../data/common.json'
import Link from 'next/link'
import { SearchIcon } from '@heroicons/react/solid'
import { MenuIcon } from '@heroicons/react/solid'
import { UserCircleIcon } from '@heroicons/react/solid'

function SearchBar({ showInMd }) {
    return (
        <div className={`${showInMd ? "hidden sm:inline-flex lg:hidden " : "lg:inline-flex sm:hidden"} w-full`}>
            <button className={` flex  border shadow-search rounded-full border-border hover:shadow-md justify-between mx-auto sm:mx-0 lg:mx-auto cursor-pointer lg:w-72 md:w-64 h-12`} type="button">
                <div className="pl-5  my-auto font-medium text-sm text-dark tracking-wide">
                    <p className="hidden sm:inline-flex">Start your search</p>
                    <p className="inline-flex sm:hidden">Search</p>
                </div>
                <SearchIcon className="w-8 bg-primary text-white rounded-full p-2  mx-2 my-auto " />
            </button>
        </div>
    )
}


function Header() {
    return (
        <header className="sticky top-0 z-50 h-20 bg-background shadow-md  ">

            <div className="px-5 md:px-10 mx-auto max-w-custom grid lg:grid-cols-3 sm:grid-cols-2 grid-cols-3 justify-between items-center h-full">
                {/*  Left side div */}

                <div className="flex gap-4">
                    <div className="relative text-2xl font-bold self-center">{data.projectTitle}</div>
                    {SearchBar({ showInMd: true })}
                </div>

                {/* Center div */}
                {SearchBar({ showInMd: false })}


                {/* Right div */}
                <div className="flex justify-end">
                    <Link href="/artistonboarding">
                        <a className="text-sm text-dark font-medium p-3 tracking-wide hover:bg-gray-100 rounded-full hidden sm:inline-flex">{data.becomeAnArtist}</a>
                    </Link>
                    <div className="flex items-center rounded-full p-2 border gap-1 ml-2 cursor-pointer hover:shadow-md transition-shadow duration-500">
                        <MenuIcon className="h-6" />
                        <UserCircleIcon className="h-6" />
                    </div>
                </div>
            </div>
        </header>
    )
}

export default Header
