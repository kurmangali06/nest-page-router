
import { RatingProps } from './Rating.props';
import styles from './Rating.module.css';
import cn from 'classnames';
import { ForwardedRef, KeyboardEvent, forwardRef, useEffect, useState } from 'react';
import StarIcon from './star.svg'
import { Span } from 'next/dist/trace';

// eslint-disable-next-line react/display-name
export const Rating = forwardRef(({ isEditable = false, error, rating,  setRating, ...props }: RatingProps, ref:ForwardedRef<HTMLDivElement>): JSX.Element => {
	const [ ratingArray, setRatingArray] = useState<JSX.Element[]>(new Array(5).fill(<></>));

	useEffect(()=> {
		constructRating(rating)
	}, [rating])

	const constructRating = (currentRating: number) => {
		const uptatedArray = ratingArray.map((r:JSX.Element, i : number) => {
			return (
				<span 
					key={i}
					className={cn(styles.star, {
					[styles.filled]: i < currentRating,
					[styles.editable]: isEditable
					})}
					onMouseEnter={() => changeDisplay(i + 1)}
					onMouseLeave={() => changeDisplay(rating)}
					onClick={() => onClick(i + 1)}>
					<StarIcon 
						/>
				</span>
			)
		})
		setRatingArray(uptatedArray)
	}
	const changeDisplay = (i: number) => {
		if(!isEditable)
		 return
		constructRating(i)
	}
	const onClick = (i: number) => {
		if(!isEditable || !setRating)
		 return
		 setRating(i)
	}

	const handleSpace = (i: number, e: KeyboardEvent<SVGAElement>) => {
		if(e.code != 'Space' || !setRating)
			return
		setRating(i)
	}
	return (
		<div {...props} ref={ref} className={cn(styles.ratingWrapper, {
			[styles.error]: error
		})}>
			{ratingArray.map((r,i) => (<span key={i}>{r}</span>))}
			{error && <span className={styles.errorMessage}>{error.message}</span>}
		</div>
	);
});