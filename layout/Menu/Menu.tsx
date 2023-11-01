import styles from './Menu.module.css';
import cn from 'classnames';
import { useContext, useState } from 'react';
import { AppContext } from '../../context/app.context';
import CoursesIcon from './icons/courses.svg'
import ServicesIcon from './icons/services.svg'
import BooksIcon from './icons/books.svg'
import ProductsIcon from './icons/products.svg'
import { TopLevelCategory } from '../../interface/page.interface';
import { FirstLevelMenuItem, PageItem } from '../../interface/menu.interface';


const firstLevelMenu: FirstLevelMenuItem[] = [
  { route: 'courses', name: 'Курсы', icon: <CoursesIcon />, id: TopLevelCategory.Courses },
  { route: 'services', name: 'Сервисы', icon: <ServicesIcon />, id: TopLevelCategory.Services },
  { route: 'books', name: 'Книги', icon: <BooksIcon />, id: TopLevelCategory.Books },
  { route: 'products', name: 'Продукты', icon: <ProductsIcon />, id: TopLevelCategory.Products }
];

export const Menu = (): JSX.Element => {
  const { menu, setMenu, firstCategory } = useContext(AppContext);



  const buildFirstLevel = () => {
    return (
      <ul className={styles.firstLevelList}>
        {firstLevelMenu.map(m => (
          <li key={m.route}>
            <a href={`/${m.route}`}>
              <a>
                <div className={cn(styles.firstLevel, {
                  [styles.firstLevelActive]: m.id == firstCategory
                })}>
                  {m.icon}
                  <span>{m.name}</span>
                </div>
              </a>
            </a>
            {m.id == firstCategory && buildSecondLevel(m)}
          </li>
        ))}
      </ul>
    );
  };

  const buildSecondLevel = (menuItem: FirstLevelMenuItem) => {
    return (
      <ul className={styles.secondBlock}>
        {menu.map(m => (
          <div key={m._id.secondCategory}>
            <div className={styles.secondLevel}>
              {m._id.secondCategory}
            </div>
            <div className={cn(styles.secondLevelBlock, {
              [styles.secondLevelBlockOpened]: m.isOpened
            })}>
              {buildThirdLevel(m.pages, menuItem.route)}
            </div>
          </div>
        ))}
      </ul>
    );
  };

  const buildThirdLevel = (pages: PageItem[], route: string) => {
    return (
      pages.map((p => (
        <a href={`/${route}/${p.alias}`} key={p.alias} className={cn(styles.thirdLevel, {
          [styles.thirdLevelActive]: true
        })}>
          {p.category}
        </a>
      )))
    );
  };

  return (
    <nav className={styles.menu} >
      {buildFirstLevel()}
    </nav>
  );
};