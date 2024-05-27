import { ChangeEvent, FC, useState } from 'react'
import { FaPlus } from 'react-icons/fa'
import { Form, useLoaderData } from 'react-router-dom'
import { IResponseTransactionLoader } from '../types/types'
import CategoryModal from './CategoryModal'

const TransactionForm: FC = () => {
	const { categories } = useLoaderData() as IResponseTransactionLoader
	const [visibleModal, setVisibleModal] = useState(false)
	const [selectedOption, setSelectedOption] = useState('');

	const handleOptionChange = (event: ChangeEvent<HTMLInputElement>) => {
		setSelectedOption(event.target.value);
	  };

  const handleSubmit = () => {
    // Ваша логика отправки данных или что-то еще
  };

	return (
		<div className="rounded-md bg-slate-800 p-4">
			<Form className="grid gap-2" method="post" action="/transactions">
				<label className="grid" htmlFor="title">
					<span>Ім'я прізвище</span>
					<input
						className="input border-slate-700"
						type="text"
						placeholder="Ім'я прізвище"
						name="title"
						required
					/>
				</label>
				<label className="grid" htmlFor="amount">
					<span>Група</span>
					<input
						className="input border-slate-700"
						type="number"
						placeholder="Група"
						name="amount"
						required
					/>
				</label>

				{/* Select */}
				{categories.length ? (
					<label htmlFor="category" className="grid">
						<span>Категорія</span>
						<select className="input border-slate-700" name="Категорія" required>
							{categories.map((ctg, idx) => (
								<option key={idx} value={ctg.id}>
									{ctg.title}
								</option>
							))}
						</select>
					</label>
				) : (
					<h1 className="mt-1 text-red-300">
						To continue create a category first
					</h1>
				)}

				{/* Add Category */}
				<button
					onClick={() => setVisibleModal(true)}
					className="flex max-w-fit items-center gap-2 text-white/50 hover:text-white"
				>
					<FaPlus />
					<span>Добавити Категорія</span>
				</button>

				{/* Radio Buttons */}
			
      <div className="flex items-center gap-4">
        <label className="flex cursor-pointer items-center gap-2">
          <input
            type="radio"
            name="type"
            value={'income'}
            className="form-radio text-blue-600"
            onChange={handleOptionChange}
          />
          <span>Виданна</span>
        </label>
        <label className="flex cursor-pointer items-center gap-2">
          <input
            type="radio"
            name="type"
            value={'expense'}
            className="form-radio text-blue-600"
            onChange={handleOptionChange}
          />
          <span>Не Виданна</span>
        </label>
      </div>

      {/* Submit button */}
      <button
        className="btn btn-green mt-2 max-w-fit"
        onClick={handleSubmit}
        disabled={!selectedOption} // Кнопка станет неактивной, если selectedOption равен пустой строке (то есть ничего не выбрано)
      >
        Створити
      </button>
			</Form>

			{/* Add Category Modal */}
			{visibleModal && (
				<CategoryModal type="post" setVisibleModal={setVisibleModal} />
			)}
		</div>
		
	)
}

export default TransactionForm
