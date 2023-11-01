
import { GetStaticPropsContext, GetStaticProps, GetStaticPaths } from 'next'
import axios from 'axios'
import { withLayot } from '../../layout/Layout'
import { MenuItem } from '../../interface/menu.interface'
import { TopPageModel } from '../../interface/page.interface'
import { ParsedUrlQuery } from 'querystring'
import { ProductModel } from '../../interface/product.interface'


const firstCategory = 0;
function Course({menu, page, products}:CourseProps): JSX.Element {
  return (
    <div>
        {products.length}
    </div>
  )
}
export default withLayot(Course)

export const getStaticPaths: GetStaticPaths = async () => {
    const { data: menu } = await axios.post<MenuItem[]>(process.env.NEXT_PUBLIC_DOMAIN + "/api/top-page/find", {
		firstCategory
	});
    return {
        paths: menu.flatMap(m => m.pages.map(p => '/courses/' + p.alias)),
        fallback: true,
    }
}

export const getStaticProps: GetStaticProps<CourseProps> = async ({params}: GetStaticPropsContext<ParsedUrlQuery>) => {
    if(!params) {
        return {
            notFound: true
        }
    }

	const { data: menu } = await axios.post<MenuItem[]>(process.env.NEXT_PUBLIC_DOMAIN + "/api/top-page/find", {
		firstCategory
	});
    const { data: page} = await axios.get<TopPageModel>(process.env.NEXT_PUBLIC_DOMAIN + "/api/top-page/byAlias/" + params.alias);
    const { data: products} = await axios.post<ProductModel[]>(process.env.NEXT_PUBLIC_DOMAIN + "/api/product/find", {
        category: page.category,
        limit: 10,
    });
	return {
		props: {
			page,
			firstCategory,
            menu,
            products,
		}
	};
};

interface CourseProps extends Record<string, unknown> {
	page: TopPageModel;
	firstCategory: number;
    menu: MenuItem[];
    products: ProductModel[];
}