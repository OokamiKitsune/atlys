import Layout from '@/components/Layout.tsx'
import ItemList from '@/components/ItemList.tsx'
import { useRouter } from 'next/router'

export default function List() {
    return <Layout><ItemList /></Layout>

}

export async function getStaticPaths() {

}

export async function getStaticProps({ params }) {

}