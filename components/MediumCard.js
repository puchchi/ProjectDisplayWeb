import Link from 'next/link'
import Image from 'next/image'

function MediumCard() {
    return (
        <div className=" flex flex-col w-full relative ">
            <div className="rounded-xl overflow-hidden relative 
            h-[20rem] w-full">
                <Link href="/gotoprofile">
                    <a className="">
                        <Image src="/images/editor_picks_1.png"
                            layout="fill"
                            objectFit="cover"
                        />
                    </a>
                </Link>
            </div>
            <h3 className="font-semibold text-lg tracking-wide mt-2">Guitarist</h3>
        </div>
    )
}

export default MediumCard
