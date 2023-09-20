import { FC, useState } from 'react'
import style from './Main.module.css'
import { TableSection } from './TableSection/TableSection'
import { PopUp } from './PopUp/PopUp'
import { Data } from '../../App'
export interface PopupActive {
	popupActive: boolean,
}
export interface SetPopupActive {
	setPopupActive: React.Dispatch<React.SetStateAction<boolean>>
}
interface MainProps {
	data: Data[],
	setData: React.Dispatch<React.SetStateAction<Data[]>>,
	loading: boolean,
	setLoading: React.Dispatch<React.SetStateAction<boolean>>
	setUpdate: React.Dispatch<React.SetStateAction<number>>
	currentItems: Data[]
	setCurrentItems: React.Dispatch<React.SetStateAction<Data[]>>
	currentPage: number
	setCurrentPage: React.Dispatch<React.SetStateAction<number>>
	itemsOnPage: number
	setItemsOnPage: React.Dispatch<React.SetStateAction<number>>
	lastIndex: number;
	firstIndex: number
}


export const Main: FC<MainProps> = ({ data, setData, loading, setLoading, setUpdate, currentItems, setCurrentItems, currentPage, setCurrentPage, itemsOnPage, setItemsOnPage, lastIndex, firstIndex }) => {
	const [popupActive, setPopupActive] = useState<boolean>(false);
	const [title, setTitle] = useState<string>('');
	const [category, setCategory] = useState<string>('')
	const [units, setUnits] = useState<string>('');
	const [discount, setDiscount] = useState<any>('')
	const [description, setDescription] = useState<string>('')
	const [count, setCount] = useState<any>('')
	const [price, setPrice] = useState<any>('')
	const [checked, setChecked] = useState<boolean>(false)
	const [itemIdToEdit, setItemIdToEdit] = useState<string | null | undefined>('')
	const [isEdit, setIsEdit] = useState<boolean>(false)
	const validate = async (data: string | null | undefined, event: React.ChangeEvent<HTMLTextAreaElement>) => {
		switch (data) {
			case 'count':
				const countValue = event.target.value
				event.target.value = countValue.replace(/\D/g, '')
				setCount(event.target.value);
				break
			case 'price':
				const priceValue = event.target.value
				event.target.value = priceValue.replace(/\D/g, '')
				setPrice(event.target.value);
				break
			case 'discount':
				const discountValue = event.target.value
				event.target.value = discountValue.replace(/\D/g, '')
				setDiscount(event.target.value);
				break
			case 'title':
				const titleValue = event.target.value
				event.target.value = titleValue.replace(/^[^/\S/]/, '')
				setTitle(event.target.value)
				break
			case 'category':
				const categoryValue = event.target.value
				event.target.value = categoryValue.replace(/^[^/\S/]/, '')
				setCategory(event.target.value)
				break
			case 'units':
				const unitsValue = event.target.value
				event.target.value = unitsValue.replace(/^[^/\S/]/, '')
				setUnits(event.target.value)
				break
			case 'description':
				const descriptionValue = event.target.value
				event.target.value = descriptionValue.replace(/^[^/\S/]/, '')
				setDescription(event.target.value)
				break
		}
	}
	return <div className={style.main}>
		<TableSection setPopupActive={setPopupActive} data={data} setData={setData} loading={loading} setLoading={setLoading} setUpdate={setUpdate} setTitle={setTitle} setCategory={setCategory} setUnits={setUnits} setDiscount={setDiscount} setDescription={setDescription} setCount={setCount} setPrice={setPrice} currentItems={currentItems} currentPage={currentPage} setCurrentPage={setCurrentPage} itemsOnPage={itemsOnPage} setItemsOnPage={setItemsOnPage} lastIndex={lastIndex} firstIndex={firstIndex} setChecked={setChecked} setIsEdit={setIsEdit} setItemIdToEdit={setItemIdToEdit}/>
		<PopUp popupActive={popupActive} setPopupActive={setPopupActive} setUpdate={setUpdate} setCurrentItems={setCurrentItems} validate={validate} title={title} category={category} units={units} discount={discount} description={description} count={count} price={price} checked={checked} setChecked={setChecked} isEdit={isEdit} setIsEdit={setIsEdit} itemIdToEdit={itemIdToEdit}/>
	</div>
}