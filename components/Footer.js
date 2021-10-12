import uistring from '../data/uistring.json'
import commonData from '../data/common.json'
import Link from 'next/link'

import { FaFacebookF } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";

function Footer({fixedFooter=true}) {
    return (
        <footer>
            <div className={`${fixedFooter ? "fixed bottom-0 ": "relative "}bg-background-light border-t-1 mt-10  w-full`}>
                <div className="px-customSm md:px-customMd mx-auto max-w-custom">

                    <div className=" flex px-4 py-8 justify-between text-textColor-heavy">
                        <div className="text-sm flex">
                            <p className="capitalize">&copy; {uistring.footer.copyrightYear} {commonData.projectTitle}</p>
                            <p className="w-4 text-center">·</p>
                            <a href="/privacy">
                                <p className="cursor-pointer hover:underline">{uistring.footer.privacy}</p>
                            </a>
                            <p className="w-4 text-center">·</p>
                            <a href="/terms">
                                <p className="cursor-pointer hover:underline">{uistring.footer.terms}</p>
                            </a>
                            <p className="w-4 text-center">·</p>
                            <a href="/contact">
                                <p className="cursor-pointer hover:underline">{uistring.footer.contact}</p>
                            </a>
                            <p className="w-4 text-center">·</p>
                            <a href="/sitemap">
                                <p className="cursor-pointer hover:underline">{uistring.footer.sitemap}</p>
                            </a>
                        </div>

                        <div className="flex">
                            <FaFacebookF className="cursor-pointer"/>
                            <FaTwitter className="ml-4 cursor-pointer"/>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    )
}

export default Footer
