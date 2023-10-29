import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import { Button, Htag } from '@/components'



const inter = Inter({ subsets: ['latin'] })

export default function Home(): JSX.Element {
  return (
    <div>
      <Htag tag='h1'>Текс</Htag>
      <Button appearance='ghost'>asdas</Button>
      <Button appearance='primary'>asdas</Button>
    </div>
  )
}
