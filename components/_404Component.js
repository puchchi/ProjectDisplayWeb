import Link from 'next/link'

function _404Component() {
    return (
        <div className="px-customSm md:px-customMd mx-auto max-w-custom relative">
            <div className="relative py-48 text-textColor-heavy flex flex-col items-center">
                <h2 className="font-semibold text-8xl">404</h2>
                <p className="my-2">Page not found</p>
                <Link href="/">
                    <button className="mt-6 py-4 px-6 rounded-xl text-white tracking-wide bg-primary cursor-pointer font-semibold">Go to home page</button>
                </Link>
            </div>
        </div>
    )
}

export default _404Component
