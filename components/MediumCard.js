import Link from 'next/link'
import Image from 'next/image'

function MediumCard({ category, name, coverPic, profileURL }) {
    return (

        <Link href={profileURL}>
            <div className=" flex flex-col w-full relative cursor-pointer ">
                <div className="rounded-xl overflow-hidden relative 
            h-[18rem] sm:h-[19rem] md:h-[20rem] lg:h-[21rem] xl:h-[22rem] 2xl:h-[23rem] w-full">
                    <Image src={coverPic}
                        layout="fill"
                        objectFit="cover"
                    />
                </div>

                <h3 className="font-semibold text-lg tracking-wide mt-2">{category}</h3>
                <p className="text-sm">by <span className="font-medium italic">{name}</span></p>
            </div>
        </Link>

    )
}

export default MediumCard
