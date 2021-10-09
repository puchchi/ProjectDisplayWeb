import Link from 'next/link'
import Image from 'next/image'

function MediumCard({ category, name, coverPic, profileURL }) {
    return (

        <Link href={profileURL}>
            <div className=" flex flex-col w-full relative cursor-pointer ">
                <div className="rounded-xl overflow-hidden relative 
            h-[20rem] w-full">
                    <Image src={coverPic}
                        layout="fill"
                        objectFit="cover"
                    />
                </div>

                <h3 className="font-semibold text-lg tracking-wide mt-2">{category}</h3>
                <span className="text-sm">by {name}</span>
            </div>
        </Link>

    )
}

export default MediumCard
