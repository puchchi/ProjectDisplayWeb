import Link from 'next/link'
import Image from 'next/image'
import uistring from '../../data/uistring.json'

function BuildPortfolioBanner() {
    return (
        <div className="px-customSm md:px-customMd mx-auto max-w-custom">
            <Link href="/buildportfolio">
                <div className="relative cursor-pointer mt-16">
                    {/* Background image */}
                    <div className="hidden md:inline">
                        <div className="relative w-full h-[28rem] mt-12 rounded-xl overflow-hidden">

                            <Image
                                src="/images/build_your_portfolio.png"
                                layout="fill"
                                objectFit="cover"
                            />
                        </div>
                    </div>
                    <div className="inline md:hidden">
                        <div className="relative w-full h-[45rem] sm:h-[50rem] mt-12 rounded-xl overflow-hidden">

                            <Image
                                src="/images/build_your_portfolio_mini.png"
                                layout="fill"
                                objectFit="cover"
                            />
                        </div>
                    </div>

                    {/* Build portfolio text */}
                    <div className="absolute top-0 text-white px-20 h-full w-full md:w-auto">
                        <div className="h-full flex flex-col tracking-wide
                md:justify-center items-center md:items-start mt-8 md:mt-0">
                            <h2 className="text-4xl md:text-5xl font-medium">{uistring.buildPortfolio.tryNow}</h2>
                            <p className="text-md mt-4 md:max-w-[250px] max-w-[400px] ">{uistring.buildPortfolio.buildPortfolio}</p>

                            <div className=" mt-10">
                                <button className="px-6 h-12 tracking-wide bg-white rounded-md font-semibold text-textColor-heavy self-center">{uistring.buildPortfolio.learnMore}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

            </Link>
        </div>

    )
}

export default BuildPortfolioBanner
