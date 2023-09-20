import { FC } from 'react'
import style from './Header.module.css'
import { Data } from '../../App'
export const Header: FC<{data: Data[], loading: boolean}> = ({data, loading}) => {
	const calcSum = (data: Data[]) => {
		let sum = 0;
		data.forEach((item) => {
			if (item.discount === 0) {
				sum += item.price * item.count
			} else {
				sum += Math.floor((item.price  - (item.discount * (1 / 100) * item.price)) * item.count)
			}
		})
		return sum
	}
	return <header className={style.header}>
		<h2 className={style.header__title}>CMS</h2>
		<p className={style.header__sum}>Итоговая стоимость: <span className={style.sumIcon}>$</span><span className={style.sum}>{loading ? 0 : calcSum(data)}</span></p>
	</header>
}