import Link from 'next/link'
import Image from 'next/image'

function SmallCard({ categoryName, categoryPic, categoryURL, categoryDesc }) {
    return (
        <Link href={categoryURL}>
            <div className="flex relative cursor-pointer">
                <div className="w-[4.5rem] h-[4.5rem] min-w-[4.5rem] overflow-hidden rounded-lg relative">
                    <Image src={categoryPic}
                        layout="fill"
                        objectFit="cover"
                    />
                </div>

                <div className="flex flex-col h-full justify-center
                 text-textColor-heavy px-4 tracking-wide">
                    <h3 className="font-semibold">{categoryName}</h3>
                    <div className="max-h-[3rem] overflow-hidden">
                        {categoryDesc}
                    </div>
                </div>
            </div>
        </Link>
    )
}

export default SmallCard
