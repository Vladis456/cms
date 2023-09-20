import React, {FC, SetStateAction} from 'react'
import style from './Container.module.css'
import { Header } from './Header/Header'
import { Main } from './Main/Main'
import { Data } from '../App'
interface ContainerProps {
	data: Data[], 
	loading: boolean,
	setLoading: React.Dispatch<SetStateAction<boolean>> 
	setData: React.Dispatch<SetStateAction<Data[]>>, 
	setUpdate: React.Dispatch<SetStateAction<number>>,
	currentItems: Data[]
	setCurrentItems: React.Dispatch<SetStateAction<Data[]>>
	currentPage: number
	setCurrentPage: React.Dispatch<SetStateAction<number>>
	itemsOnPage: number
	setItemsOnPage: React.Dispatch<SetStateAction<number>>
	lastIndex: number;
	firstIndex: number
}

export const Container: FC<ContainerProps> = ({data, setData, loading, setLoading, setUpdate, currentItems, setCurrentItems, currentPage, setCurrentPage, itemsOnPage, setItemsOnPage, lastIndex, firstIndex}) => {


	return <div className={style.container}>
		<Header data={data} loading={loading}/>
		<Main data={data} setData={setData} loading={loading} setLoading={setLoading} setUpdate={setUpdate} currentItems={currentItems} setCurrentItems={setCurrentItems} currentPage={currentPage} setCurrentPage={setCurrentPage} itemsOnPage={itemsOnPage} setItemsOnPage={setItemsOnPage} lastIndex={lastIndex} firstIndex={firstIndex}/>
		
	</div>
}