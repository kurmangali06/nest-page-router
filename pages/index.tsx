import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import { Button, Htag, P, Rating, Tag } from '../components'
import { useState } from 'react'
import { withLayot } from '../layout/Layout'
import { GetStaticProps } from 'next'
import axios from 'axios'
import { MenuItem } from '../interface/menu.interface'



const inter = Inter({ subsets: ['latin'] })

function Home({menu}:HomeProps): JSX.Element {
  const [rating, setRating] = useState<number>(4)
  return (
    <div>
      <Htag tag='h1'>Текс</Htag>
      <Button appearance='ghost' arrow='down'>asdas</Button>
      <Button appearance='primary' arrow='right'>asdas</Button>
      <P size='l'> sasfas</P>
      <Tag size='m' color='primary'>asdasdfas</Tag>
      <Rating rating={rating} isEditable setRating={setRating} />
      <ul>
        {menu.map(m => ( <li key={m._id.secondCategory}>{m._id.secondCategory}</li>))}
      </ul>
    </div>
  )
}
export default withLayot(Home)


export const getStaticProps: GetStaticProps<HomeProps> = async () => {
	const firstCategory = 0;
	const { data: menu } = await axios.post<MenuItem[]>(process.env.NEXT_PUBLIC_DOMAIN + "/api/top-page/find", {
		firstCategory
	});
	return {
		props: {
			menu,
			firstCategory
		}
	};
};

interface HomeProps extends Record<string, unknown> {
	menu: MenuItem[];
	firstCategory: number;
}