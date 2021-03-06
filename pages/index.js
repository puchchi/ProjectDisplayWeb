import Banner from '../components/homepage/Banner'
import EditorsPick from '../components/homepage/EditorsPick'
import TopCategories from '../components/homepage/TopCategories'
import Header from '../components/header/Header'
import BuildPortfolioBanner from '../components/homepage/BuildPortfolioBanner'
import Footer from '../components/Footer'

export default function Home() {
  return (
    <>
    <Header/>
    <Banner/>
    <EditorsPick/>
    <TopCategories/>
    <BuildPortfolioBanner/>
    <Footer fixedFooter={false}/>
    </>
  )
}
