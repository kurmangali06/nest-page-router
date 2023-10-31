import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import { Button, Htag, P, Rating, Tag } from '../components'
import { useState } from 'react'
import { withLayot } from '../layout/Layout'




const inter = Inter({ subsets: ['latin'] })

function Home(): JSX.Element {
  const [rating, setRating] = useState<number>(4)
  return (
    <div>
      <Htag tag='h1'>Текс</Htag>
      <Button appearance='ghost' arrow='down'>asdas</Button>
      <Button appearance='primary' arrow='right'>asdas</Button>
      <P size='l'> sasfas</P>
      <Tag size='m' color='primary'>asdasdfas</Tag>
      <Rating rating={rating} isEditable setRating={setRating} />
    </div>
  )
}
export default withLayot(Home)