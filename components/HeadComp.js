import Head from 'next/head'

export default function HeadComp() {
    return (
        <Head>
            <title>Beelance</title>
            <script async defer src={`https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_PLACES_API_KEY}&libraries=places`}></script>
        </Head>
    )
}

