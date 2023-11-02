
import { GetStaticPropsContext, GetStaticProps, GetStaticPaths } from 'next'
import axios from 'axios'
import { withLayot } from '../../layout/Layout'
import { MenuItem } from '../../interface/menu.interface'
import { TopLevelCategory, TopPageModel } from '../../interface/page.interface'
import { ParsedUrlQuery } from 'querystring'
import { ProductModel } from '../../interface/product.interface'
import { firstLevelMenu } from '../../helpers/helpers'


function Course({menu, page, products}:CourseProps): JSX.Element {
  return (
    <div>
        {products.length}
    </div>
  )
}
export default withLayot(Course)

export const getStaticPaths: GetStaticPaths = async () => {
    let paths: string[] = [];
    for(const m of firstLevelMenu) {
        const { data: menu } = await axios.post<MenuItem[]>(process.env.NEXT_PUBLIC_DOMAIN + "/api/top-page/find", {
            firstCategory: m.id
        });
        paths = paths.concat(menu.flatMap(s => s.pages.map(p => `/${m.route} + /${p.alias}`)))
    }
    console.log(paths)
    return {
        paths,
        fallback: true,
    }
}

export const getStaticProps: GetStaticProps<CourseProps> = async ({params}: GetStaticPropsContext<ParsedUrlQuery>) => {
    if(!params) {
        return {
            notFound: true
        }
    }

    const firstCategoryItem = firstLevelMenu.find(m => m.route == params.type)
    if(!firstCategoryItem) {
        return {
            notFound: true
        }
    }
    try {
        const { data: menu } = await axios.post<MenuItem[]>(process.env.NEXT_PUBLIC_DOMAIN + "/api/top-page/find", {
            firstCategory: firstCategoryItem.id
        });
        if(menu.length) {
            return {
                notFound: true
            }
        }
        const { data: page} = await axios.get<TopPageModel>(process.env.NEXT_PUBLIC_DOMAIN + "/api/top-page/byAlias/" + params.alias);
        const { data: products} = await axios.post<ProductModel[]>(process.env.NEXT_PUBLIC_DOMAIN + "/api/product/find", {
            category: page.category,
            limit: 10,
        });
        return {
            props: {
                page,
                firstCategory: firstCategoryItem.id,
                menu,
                products,
            }
        };
    }
    catch {
        return {
            notFound: true
        }
    }

};

interface CourseProps extends Record<string, unknown> {
	page: TopPageModel;
	firstCategory: TopLevelCategory;
    menu: MenuItem[];
    products: ProductModel[];
}