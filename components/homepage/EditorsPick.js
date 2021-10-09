import uistring from '../../data/uistring.json'
import editorpicksdata from '../../data/editorpicks.json'
import MediumCard from '../MediumCard'

import Carousel, { consts } from 'react-elastic-carousel'

function carouselArrow({ type, onClick, isEdge }) {

    const isNextArrow = type == consts.NEXT;
    return (

        <div className={`${isNextArrow ? "mr-[-50px] right-[30px] " : "ml-[-50px] left-[30px] "}relative z-10 top-[45%] `}>
            <div className={`${isEdge ? "bg-transparent " : "rounded-full shadow-md border-transparent border-2 bg-white"} w-8 h-8 `}
                onClick={isEdge ? () => { } : onClick}>
                <span className={`${isEdge ? "hidden" : ""}`}>
                    <svg className={`${!isNextArrow ? "transform rotate-180 " : ""} p-2`} viewBox="0 0 18 18" role="img" aria-hidden="false" aria-label="Next" focusable="false" ><path d="m4.29 1.71a1 1 0 1 1 1.42-1.41l8 8a1 1 0 0 1 0 1.41l-8 8a1 1 0 1 1 -1.42-1.41l7.29-7.29z" fillRule="evenodd"></path></svg>
                </span>
            </div>
        </div>

    )
}

function EditorsPick() {

    return (
        <div className="px-customSm md:px-customMd mx-auto max-w-custom">
            <div className="mt-8">
                {/* Editor pick heading */}
                <div>
                    <span className="font-bold text-[2rem] leading-9">{uistring.editorsPick.editorsPick}</span>
                </div>

                {/* Editor pick image */}
                <div className="mt-4 ">
                    <div className="relative  gap-5  max-w-full 
                    justify-between ">
                        <Carousel
                            breakPoints={
                                [{
                                    width: 500,
                                    itemsToShow: 2,

                                },
                                {
                                    width: 768,
                                    itemsToShow: 3,

                                },
                                {
                                    width: 1200,
                                    itemsToShow: 4,

                                }
                                ]
                            }
                            pagination={false}
                            itemPadding={[10, 10]}
                            renderArrow={carouselArrow}
                        >
                            {
                                editorpicksdata.editorPicks.map((pick) => 

                                    <MediumCard
                                        key={pick.artistId}
                                        name={pick.name}
                                        category={pick.category}
                                        coverPic={pick.coverPic}
                                        profileURL={pick.profileURL}
                                    />
                                )
                            }
                        </Carousel>
                    </div>
                </div>

            </div>
        </div >
    )
}

export default EditorsPick
