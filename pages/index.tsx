import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import { Button, Htag, P } from '../components'




const inter = Inter({ subsets: ['latin'] })

export default function Home(): JSX.Element {
  return (
    <div>
      <Htag tag='h1'>Текс</Htag>
      <Button appearance='ghost' arrow='down'>asdas</Button>
      <Button appearance='primary' arrow='right'>asdas</Button>
      <P size='l'> sasfas</P>
    </div>
  )
}
