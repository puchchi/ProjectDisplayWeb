import uistring from '../../data/uistring.json'
import topcategories from '../../data/topcategory.json'
import SmallCard from '../SmallCard'
import { HiOutlinePlusCircle } from 'react-icons/hi'
import Link from 'next/link'

function TopCategories() {
    return (
        <div className="px-customSm md:px-customMd mx-auto max-w-custom">
            <div className="mt-12 heading-type-100">
                <h2>{uistring.topcategories.topcateries}</h2>
            </div>
            <div className="grid grid-row grid-cols-1 xl:grid-cols-4 lg:grid-cols-3 sm:grid-cols-2
            mt-8 relative gap-8 justify-between">
                {
                    topcategories.topCategories.map((topCategory, index) => {
                        return (
                            <SmallCard
                                key={topCategory.categoryId}
                                categoryName={topCategory.categoryName}
                                categoryPic={topCategory.categoryPic}
                                categoryURL={topCategory.categoryURL}
                                categoryDesc={topCategory.categoryDesc}
                            />
                        )
                    }
                    )
                }

                {/* View all categories */}
                <Link href="/allcategories">
                    <div className="flex cursor-pointer">
                        <HiOutlinePlusCircle className="p-2 w-[4.5rem] h-[4.5rem] text-textColor-light" />
                        <h2 className="self-center px-2">{uistring.topcategories.viewAllCategories}</h2>
                    </div>
                </Link>
            </div>
        </div>
    )
}

export default TopCategories
