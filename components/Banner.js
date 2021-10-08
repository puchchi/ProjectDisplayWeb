import Image from 'next/image'

function Banner() {
    return (
        <div className=" relative top-0 left-0 w-full z-0 h-[300px] sm:h-[400px] md:h-[500px] lg:h-[600px] xl:h-[700px] 2xl:h-[800px]">
            <Image src="/images/Banner.webp"
                layout="fill"
                objectFit="cover"
            />
        </div>
    )
}

export default Banner
