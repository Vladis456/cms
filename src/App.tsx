import 'normalize.css'
import './App.css'
import { Container } from './Container/Container'
import { useEffect, useState } from 'react'


//  TODO: Сделать чекбокс


export interface Loading {
  loading: boolean
}
export interface Data {
  category: any,
  count: any,
  description: any,
  discount: any,
  id: any,
  image: any,
  price: any,
  title: any,
  units: any,
}


function App() {
  const [dataArray, setData] = useState<Data[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [update, setUpdate] = useState<number>(0)
  const [itemsOnPage, setItemsOnPage] = useState<number>(10)
  const [currentPage, setCurrentPage] = useState<number>(1)
  const [currentItems, setCurrentItems] = useState<Data[]>([])
  const lastIndex = currentPage * itemsOnPage
  const firstIndex = lastIndex - itemsOnPage
  useEffect(() => {
    setLoading(true)
    fetch('https://imported-ebony-roast.glitch.me/api/goods')
      .then((response) => response.json())
      .then((data) => {setData(data); setCurrentItems(data.slice(firstIndex, lastIndex)); setLoading(false);})
  }, [update, currentPage, itemsOnPage])
  return (
    <>
      <Container data={dataArray} setData={setData} loading={loading} setLoading={setLoading} setUpdate={setUpdate} currentItems={currentItems} setCurrentItems={setCurrentItems} currentPage={currentPage} setCurrentPage={setCurrentPage} itemsOnPage={itemsOnPage} setItemsOnPage={setItemsOnPage} lastIndex={lastIndex} firstIndex={firstIndex}/>
    </>
  )
}

export default App
