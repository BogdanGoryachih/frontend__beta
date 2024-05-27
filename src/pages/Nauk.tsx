import { FC } from 'react'
import { instance } from '../api/axios.api'
import {
	ICategory,
	INauk,
} from '../types/types'
import { toast } from 'react-toastify'
import TransactionTable from '../components/TransactionTable'
import NaukForm from '../components/NaukForm'
import NaukTable from '../components/NaukTable'
import { runScript } from './Transactions'

export const	naukLoader = async () => {
	const categories = await instance.get<ICategory[]>('/categories')
	const transactions = await instance.get<INauk[]>('/nauk')
	const totalIncome = await instance.get<number>('/nauk/income/find')
	const totalExpense = await instance.get<number>('/nauk/expense/find')

	const data = {
		categories: categories.data,
		transactions: transactions.data,
		totalIncome: totalIncome.data,
		totalExpense: totalExpense.data,
	}
	return data
}
export const naukAction = async ({ request }: any) => {
	switch (request.method) {
		case 'POST': {
			const formData = await request.formData()
			const newTransaction = {
				title: formData.get('title'),
				amount: +formData.get('amount'),
				category: formData.get('category'),
				type: formData.get('type'),
			}

			await instance.post('/nauk', newTransaction)
			toast.success('Transaction added.')
			return null
		}
		case 'PATCH': {
			const formData = await request.formData();
			const transactionId = formData.get('id');
		  
			// Получите обновленные данные транзакции из формы
			const updatedTransaction = {
			  title: formData.get('title'),
			  amount: +formData.get('amount'),
			  category: formData.get('category'),
			  type: formData.get('type'),
			};
		  
			// Отправьте запрос на сервер для обновления транзакции
			await instance.patch(`/nauk/nauk/${transactionId}`, updatedTransaction);
			
			toast.success('Transaction updated.');
			return null;
		  }
		case 'DELETE': {
			const formData = await request.formData()
			const transactionId = formData.get('id')
			await instance.delete(`/nauk/nauk/${transactionId}`)
			toast.success('Transaction deleted.')
			return null
		}
	}
}

const Transactions: FC = () => {
	// const { totalExpense, totalIncome } =
	// 	useLoaderData() as IResponseTransactionLoader
	return (
		<>
			<div className="mt-4 grid grid-cols-3 items-start gap-4">
				{/* Add Transaction Form */}
				<div className="col-span-2 grid">
					<NaukForm />
				</div>

				{/* Statistic blocks */}
				{/* <div className="rounded-md bg-slate-800 p-3">
					<div className="grid grid-cols-2 gap-3">
						<div>
							<p className="text-md text-center font-bold uppercase">
								Total Income:
							</p>
							<p className="mt-2 rounded-sm bg-green-600 p-1 text-center">
								{formatToUSD.format(totalIncome)}
							</p>
						</div>
						<div>
							<p className="text-md text-center font-bold uppercase">
								Total Expense:
							</p>
							<p className="mt-2 rounded-sm bg-red-500 p-1 text-center">
								{formatToUSD.format(totalExpense)}
							</p>
						</div>
					</div>

					<>
						<Chart totalExpense={totalExpense} totalIncome={totalIncome} />
					</>
				</div> */}
			</div>

			{/* Transactions Table */}
			<h1 className="my-5">
			<button onClick={() => runScript('transaction')}>Завантажити таблцию</button>
				<NaukTable limit={5} />
			</h1>
		</>
	)
}

export default Transactions
