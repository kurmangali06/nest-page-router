import { Card, HhData,  Htag, Tag } from "../../components";
import { TopPageComponentProps } from "./TopPage.component.props";
import styles from './TopPage.component.module.css'
import { TopLevelCategory } from "../../interface/page.interface";


export const TopPageComponent = ({page, products, firstCategory, ...props }: TopPageComponentProps): JSX.Element => {
	return (
        <div className={styles.wrapper}>
            <div className={styles.title}>
                <Htag tag="h1">{page.title}</Htag>
                {products && <Tag color="grey" size="m">{products.length}</Tag>}
                <span>Сортировка</span>
            </div>
            <div>
                { products && products.map(p => (
                    <div key={p._id}>
                        {p.title}
                    </div>
                ))}
            </div>
            <div className={styles.hhTitle}>
                <Htag tag="h2"> Вакансий - {page.category}</Htag>
                <Tag color="red" size="m">hh.kz</Tag>
            </div>
              {firstCategory == TopLevelCategory.Courses && page.hh && <HhData {...page.hh}/>}
        </div>

	);
};