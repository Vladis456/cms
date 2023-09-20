import { FC, SetStateAction } from 'react'
import style from './PopUp.module.css'
import cn from 'classnames'
import closeIcon from '../../../assets/img/icons/Group 85.svg'
import { PopupActive, SetPopupActive } from '../Main'
import { Data } from '../../../App'
interface PopUpProps {
	setUpdate: React.Dispatch<SetStateAction<number>>
	setCurrentItems: React.Dispatch<SetStateAction<Data[]>>
	validate: (data: any, event: React.ChangeEvent<HTMLTextAreaElement>) => void
	title: string
	category: string
	units: string
	discount: number
	description: string
	count: number
	price: number
	checked: boolean
	setChecked: React.Dispatch<SetStateAction<boolean>>
	isEdit: boolean
	setIsEdit: React.Dispatch<SetStateAction<boolean>>
	itemIdToEdit: string | null | undefined
}
export const PopUp: FC<PopupActive & SetPopupActive & PopUpProps> = ({ popupActive, setPopupActive, setUpdate, setCurrentItems, validate, title, category, units, discount, description, count, price, checked, setChecked, isEdit, setIsEdit, itemIdToEdit }) => {
	const submit = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault()
		const obj = new FormData(event.currentTarget)
		const newItem = Object.fromEntries(obj)
		if (!isEdit) {
			await fetch('https://imported-ebony-roast.glitch.me/api/goods', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json;charset=utf-8'
				},
				body: JSON.stringify(newItem)
			});
			await fetch('https://imported-ebony-roast.glitch.me/api/goods')
				.then(response => response.json())
				.then(data => { setCurrentItems([...data]) });
			setPopupActive(false)
			setUpdate(prev => prev + 1)
		} else {
			await fetch(`https://imported-ebony-roast.glitch.me/api/goods/${itemIdToEdit}`, {
				method: 'PATCH',
				headers: {
					'Content-Type': 'application/json;charset=utf-8'
				},
				body: JSON.stringify(newItem)
			});
			setIsEdit(false)
			setPopupActive(false)
			setUpdate(prev => prev + 1)
		}

	}

	return <div className={popupActive ? cn(style.popUp, style.active) : style.popUp} onClick={() => { setPopupActive(false) }}>
		<div className={style.popUpContent} onClick={e => { e.stopPropagation() }}>
			<img className={style.popUp__close} src={closeIcon} onClick={() => { setPopupActive(false) }} />
			<div className={style.popUpContainer}>
				<div className={style.popUp__header}>
					<h2 className={style.popUp__title}>Добавить товар</h2>
				</div>
				<form className={style.popUp__main} onSubmit={(e) => { submit(e) }}>
					<div className={style.left}>
						<div className={style.nameInput}>
							<label>наименование</label>
							<textarea required className={style.textareaName} name="title" data-title='title' value={title} onChange={(e: any) => validate(document.querySelector(`.${style.textareaName}`)?.getAttribute('data-title'), e)}></textarea>
						</div>
						<div className={style.categoryInput}>
							<label>категория</label>
							<textarea required className={style.textareaCategory} name="category" data-category='category' value={category} onChange={(e: any) => validate(document.querySelector(`.${style.textareaCategory}`)?.getAttribute('data-category'), e)}></textarea>
						</div>
						<div className={style.unitsInput}>
							<label>единицы измерения</label>
							<textarea required className={style.textareaUnits} name="units" data-units='units' value={units} onChange={(e: any) => validate(document.querySelector(`.${style.textareaUnits}`)?.getAttribute('data-units'), e)}></textarea>
						</div>
						<div className={style.discountInput}>
							<label>discount</label>
							<div className={style.group}>
								<input className={style.checkbox} type="checkbox" defaultChecked={checked} onChange={() => setChecked(!checked)} />
								<textarea disabled={checked ? false : true} className={style.textareaDiscount} name="discount" data-discount="discount" value={discount} onChange={(e: any) => validate(document.querySelector(`.${style.textareaDiscount}`)?.getAttribute('data-discount'), e)}></textarea>
							</div>
						</div>
					</div>
					<div className={style.right}>
						<div className={style.descriptionInput}>
							<label>описание</label>
							<textarea required className={style.textareaDescription} name="description" data-description='description' value={description} onChange={(e: any) => validate(document.querySelector(`.${style.textareaDescription}`)?.getAttribute('data-description'), e)}></textarea>
						</div>
						<div className={style.amountInput}>
							<label>Количество</label>
							<textarea required className={style.textareaAmount} name="count" data-count="count" value={count} onChange={(e: any) => validate(document.querySelector(`.${style.textareaAmount}`)?.getAttribute('data-count'), e)} ></textarea>
						</div>
						<div className={style.priceInput}>
							<label>цена</label>
							<textarea required className={style.textareaPrice} name="price" data-price="price" value={price} onChange={(e: any) => validate(document.querySelector(`.${style.textareaPrice}`)?.getAttribute('data-price'), e)} ></textarea>
						</div>

						<button className={style.addImg}>Добавить изображение</button>

						<button className={style.footer__btn} type="submit" >
							{isEdit ? 'Изменить товар' : 'Добавить товар'}
						</button>

						<input className={style.imgUrl} type="text" name="" id="" />
					</div>

				</form>
				<div className={style.popUp__footer}>
					<p className={style.footer__sum}>Итоговая стоимость: <span className={style.sumIcon}>$</span><span className={style.footerSum}>{discount === 0 ? price * count : Math.floor((price - (discount * (1 / 100) * price)) * count)}</span></p>
				</div>
			</div>
		</div>

	</div>
}