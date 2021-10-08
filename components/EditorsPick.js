import React from 'react'
import Image from 'next/image'
import uistring from '../data/uistring.json'
import MediumCard from './MediumCard'


function EditorsPick() {
    return (
        <div className="px-customSm md:px-customMd mx-auto max-w-custom">
            <div className="mt-8">
                {/* Editor pick heading */}
                <div>
                    <span className="font-bold text-[2rem] leading-9">{uistring.editorsPick.editorsPick}</span>
                </div>

                {/* Editor pick image */}
                <div className="my-2 mb-24">
                    <div className="relative hidden sm:flex gap-5  max-w-full 
                    justify-between ">
                        <MediumCard />
                        <MediumCard />
                        <MediumCard />
                        <MediumCard />

                    </div>
                </div>
                <div className="rounded-xl relative h-[400px] w-[400px]">
                    <Image src="/images/editor_picks_1.png"
                       layout="fill"
                        objectFit="cover"
                    />
                </div>
            </div>
        </div>
    )
}

export default EditorsPick
