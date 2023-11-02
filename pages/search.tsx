import { withLayot } from '../layout/Layout'
import { GetStaticProps } from 'next'
import axios from 'axios'
import { MenuItem } from '../interface/menu.interface'




function Search(): JSX.Element {
  return (
    <div>
        Search
    </div>
  )
}
export default withLayot(Search)


export const getStaticProps: GetStaticProps<SearchProps> = async () => {
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

interface SearchProps extends Record<string, unknown> {
  menu: MenuItem[];
  firstCategory: number;
}