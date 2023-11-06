import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import { Button, Htag, Input, P, Rating, Tag, Textarea } from '../components'
import { useState } from 'react'
import { withLayot } from '../layout/Layout'
import { GetStaticProps } from 'next'
import axios from 'axios'
import { MenuItem } from '../interface/menu.interface'



const inter = Inter({ subsets: ['latin'] })

function Home({ menu }: HomeProps): JSX.Element {
  return (
    <div>
        <Input placeholder='text'/>
        <Textarea/>
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