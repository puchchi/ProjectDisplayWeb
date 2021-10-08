import Head from 'next/head'
import Banner from '../components/Banner'
import EditorsPick from '../components/EditorsPick'
import Header from '../components/header/Header'

export default function Home() {
  return (
    <>
    <Header/>
    <Banner/>
    <EditorsPick/>
    </>
  )
}
