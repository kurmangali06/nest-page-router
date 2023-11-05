import { SearchProps } from './Search.props';
import styles from './Search.module.css';
import cn from 'classnames';
import GlassIcon from './glass.svg'
import { Input } from '../Input/Input';
import { Button } from '../Button/Button';
import { useState ,KeyboardEvent} from 'react';
import { useRouter } from 'next/router';

export const Search = ({  className, ...props }: SearchProps): JSX.Element => {
	const [search, setSearch] = useState<string>('')
	const router = useRouter()


	const redirectToSearch = () => {
		router.push({
			pathname: 'search',
			query:{
				q: search
			}
		})
	}
	const handleKeyDown = (e: KeyboardEvent) => {
		if(e.key == 'Enter') {
			redirectToSearch()
		}
	}
	return (
		<div className={cn(className, styles.search)} {...props}>
			<Input 
				className={styles.input}
				value={search}
				placeholder='Поиск...'
				onChange={(e) => setSearch(e.target.value)}
				/>
			<Button 
				appearance='primary'
				className={styles.button}
				onClick={redirectToSearch}
				onKeyDown={handleKeyDown}
				>
				<GlassIcon/>
			</Button>
		</div>
	);
};