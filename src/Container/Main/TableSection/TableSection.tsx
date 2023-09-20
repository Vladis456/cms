import { FC, useState, ChangeEvent, SetStateAction } from 'react'
import style from './TableSection.module.css'
import popupStyle from '../PopUp/PopUp.module.css'
import filterIcon from '../../../assets/img/icons/Filter.svg'
import searchIcon from '../../../assets/img/icons/Search.svg'
import arrowLeft from '../../../assets/img/content/Vector.png'
import arrowRight from '../../../assets/img/content/Vector-1.png'
import noPictureIcon from '../../../assets/img/icons/carbon_no-image.svg';
import editIcon from '../../../assets/img/icons/akar-icons_edit.svg';
import deleteIcon from '../../../assets/img/icons/ant-design_delete-outlined.svg';
import type { SetPopupActive } from '../Main'
import { Data } from '../../../App'
interface TableProps {
	data: Data[],
	setData: React.Dispatch<SetStateAction<Data[]>>
	loading: boolean
	setLoading: React.Dispatch<SetStateAction<boolean>>
	setUpdate: React.Dispatch<SetStateAction<number>>
	setTitle: React.Dispatch<SetStateAction<string>>
	setCategory: React.Dispatch<SetStateAction<string>>
	setUnits: React.Dispatch<SetStateAction<string>>
	setDiscount: React.Dispatch<SetStateAction<number>>
	setDescription: React.Dispatch<SetStateAction<string>>
	setCount: React.Dispatch<SetStateAction<number | string>>
	setPrice: React.Dispatch<SetStateAction<number | string>>
	currentItems: Data[]
	currentPage: number
	setCurrentPage: React.Dispatch<React.SetStateAction<number>>
	itemsOnPage: number
	setItemsOnPage: React.Dispatch<SetStateAction<number>>
	lastIndex: number;
	firstIndex: number
	setChecked: React.Dispatch<SetStateAction<boolean>>
	setIsEdit: React.Dispatch<SetStateAction<boolean>>
	setItemIdToEdit: React.Dispatch<SetStateAction<string | null | undefined>>
}
export const TableSection: FC<SetPopupActive & TableProps> = ({ setPopupActive, data, setData, loading, setLoading, setUpdate, setTitle, setCategory, setUnits, setDiscount, setDescription, setCount, setPrice, currentItems, currentPage, setCurrentPage, itemsOnPage, setItemsOnPage, lastIndex, firstIndex, setChecked, setIsEdit, setItemIdToEdit }) => {
	const [value, setValue] = useState<string>('')
	const handleClick = (e: React.MouseEvent<HTMLElement>) => {
		e.stopPropagation();
		setTitle('');
		setCategory('');
		setUnits('');
		setDiscount(0);
		setDescription('');
		setCount('');
		setPrice('');
		setChecked(false);
		(document.querySelector(`.${popupStyle.checkbox}`) as HTMLInputElement).checked = false
		setPopupActive(true)
	}
	const update = (e: ChangeEvent<HTMLInputElement>) => {
		setValue(e?.target?.value.trim());
	};
	const filteredItems = data.filter(item => {
		return item.title.toLowerCase().includes(value.toLowerCase()) || item.category.toLowerCase().includes(value.toLowerCase())
	})
	return <section className={style.main__table}>
		<div className={style.main__tableHeader}>
			<div className={style.main__tableHeaderSearch}>
				<div className={style.main__tableFilterBtn}>
					<img className={style.main__tableFilterImg} src={filterIcon}></img>
					<div className={style.main__tableFilterBtnText}>Фильтр</div>
				</div>
				<div className={style.main__tableHeaderSearchContainer}>
					<img className={style.tableSearchInputImg} src={searchIcon}></img>
					<input className={style.tableSearchInput} onChange={update} placeholder="Поиск по наименованию и категории"></input>
				</div>
			</div>
			<div className={style.addProductBtn} onClick={(e) => handleClick(e)}>
				<p className={style.addProductBtnText}>добавить товар</p>
			</div>
		</div>
		<table className={style.main__tableBody}>
			<thead><tr><th>id</th><th>наименование</th><th>категория</th><th>ед/изм</th><th>количество</th><th>цена</th><th>итог</th><th></th><th></th><th></th></tr></thead>
			<tbody className={style.tbody}>
				{!loading && value === '' ? currentItems.map(item => {
					return <tr key={item.id}>
						<td>{item.id}</td>
						<td>{item.title}</td>
						<td>{item.category}</td>
						<td>{item.units}</td>
						<td>{item.count}</td>
						<td>{item.price}</td>
						<td>{item.discount === 0 ? item.price * item.count : Math.floor((item.price - (item.discount * (1 / 100) * item.price)) * item.count)}</td>
						<td><img src={noPictureIcon} alt="" /></td>
						<td data-id={item.id} onClick={(e) => {
							e.stopPropagation()
							const target = e.target as HTMLElement;
							const itemId = target != document.querySelectorAll(`[data-id="${item.id}"]`)[0] ? target.parentNode?.parentNode?.childNodes[0].textContent : target.parentNode?.childNodes[0].textContent
							fetch(`https://imported-ebony-roast.glitch.me/api/goods/${itemId}`, {
								method: 'GET',
								headers: {
									'Content-Type': 'application/json;charset=utf-8'
								},
							})
								.then(response => response.json())
								.then(data => { setTitle(data.title); setCategory(data.category); setUnits(data.units); setDiscount(data.discount); setDescription(data.description); setCount(data.count); setPrice(data.price); setChecked(data.discount === 0 ? false : true); data.discount !== 0 ? (document.querySelector(`.${popupStyle.checkbox}`) as HTMLInputElement).checked = true : (document.querySelector(`.${popupStyle.checkbox}`) as HTMLInputElement).checked = false; setIsEdit(true); setItemIdToEdit(itemId);setLoading(false); setPopupActive(true); })
						}}><img src={editIcon} alt="" /></td>
						<td data-fordelete={item.id} onClick={async (e) => {
							const target = e.target as HTMLElement;
							const itemId = target != document.querySelectorAll(`[data-fordelete="${item.id}"]`)[0] ? target.parentNode?.parentNode?.childNodes[0].textContent : target.parentNode?.childNodes[0].textContent
							const copy = data;
							const filteredCopy = copy.filter(item => item.id !== itemId)
							await fetch(`https://imported-ebony-roast.glitch.me/api/goods/${itemId}`, {
								method: 'DELETE',
								headers: {
									'Content-Type': 'application/json;charset=utf-8'
								},
							});
							setData([...filteredCopy])
							setUpdate(prev => prev + 2)
						}}><img src={deleteIcon} alt="" /></td>
					</tr>
				})
					: filteredItems.map(item => {
						return <tr key={item.id}>
							<td>{item.id}</td>
							<td>{item.title}</td>
							<td>{item.category}</td>
							<td>{item.units}</td>
							<td>{item.count}</td>
							<td>{item.price}</td>
							<td>{item.discount === 0 ? item.price * item.count : Math.floor((item.price - (item.discount * (1 / 100) * item.price)) * item.count)}</td>
							<td><img src={noPictureIcon} alt="" /></td>
							<td data-id={item.id} onClick={async (e) => {
								const target = e.target as HTMLElement;
								const itemId = target != document.querySelectorAll(`[data-id="${item.id}"]`)[0] ? target.parentNode?.parentNode?.childNodes[0].textContent : target.parentNode?.childNodes[0].textContent
								await fetch(`https://imported-ebony-roast.glitch.me/api/goods/${itemId}`, {
									method: 'GET',
									headers: {
										'Content-Type': 'application/json;charset=utf-8'
									},
								})
									.then(response => response.json())
									.then(data => { setTitle(data.title); setCategory(data.category); setUnits(data.units); setDiscount(data.discount); setDescription(data.description); setCount(data.count); setPrice(data.price); setChecked(data.discount === 0 ? false : true); data.discount !== 0 ? (document.querySelector(`.${popupStyle.checkbox}`) as HTMLInputElement).checked = true : (document.querySelector(`.${popupStyle.checkbox}`) as HTMLInputElement).checked = false; setIsEdit(true); setItemIdToEdit(itemId); setLoading(false); setPopupActive(true); })
							}}><img src={editIcon} alt="" /></td>
							<td data-fordelete={item.id} onClick={(e) => {
								const target = e.target as HTMLElement;
								const itemId = target != document.querySelectorAll(`[data-fordelete="${item.id}"]`)[0] ? target.parentNode?.parentNode?.childNodes[0].textContent : target.parentNode?.childNodes[0].textContent
								const copy = data;
								const filteredCopy = copy.filter(item => item.id !== itemId)
								fetch(`https://imported-ebony-roast.glitch.me/api/goods/${itemId}`, {
									method: 'DELETE',
									headers: {
										'Content-Type': 'application/json;charset=utf-8'
									},
								});
								setData([...filteredCopy])
								setUpdate(prev => prev + 1)
							}}><img src={deleteIcon} alt="" /></td>
						</tr>
					})}
			</tbody>
		</table>
		<div className={style.main__tableFooter}>
			<div className={style.footerItems}>
				<select className={style.pageSetting} value={itemsOnPage} onChange={(event: ChangeEvent<HTMLSelectElement>) => {
					setItemsOnPage(Number(event.target.value))
					setCurrentPage(1)
				}}>
					{!loading && (
						<>
							<option className={style.pageSettingText} value={5}>Показывать на странице: 5</option>
							<option className={style.pageSettingText} value={10}>Показывать на странице: 10</option>
							<option className={style.pageSettingText} value={15}>Показывать на странице: 15</option>
						</>
					)}
				</select>
				<div className={style.pageNumber}>
					<p className={style.pageNumberText}>{firstIndex + 1} - {currentItems.length < itemsOnPage ? data.length - firstIndex + firstIndex : lastIndex} of {data.length}</p>
				</div>
				<div className={style.pageBtns}>
						<img className={style.leftBtn} src={arrowLeft} onClick={() => setCurrentPage(prev => prev !== 1 ? prev - 1 : 1)} />
						<img className={style.rightBtn} src={arrowRight} onClick={() => {
							if (value === '') {
								if (currentItems.length === itemsOnPage && currentPage !== Math.ceil(data.length / itemsOnPage)) {
									setCurrentPage(prev => prev + 1)
								}
							}
						}
						} />
					</div>
			</div>
		</div>
	</section>
}