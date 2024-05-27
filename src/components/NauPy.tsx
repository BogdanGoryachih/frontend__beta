import { ChangeEvent, FC, useState } from 'react'
import { Form, useLoaderData } from 'react-router-dom'


const NaukForm: FC = () => {




	return (
		<div className="rounded-md bg-slate-800 p-4">
			<Form className="grid gap-2" method="post" action="/add_data_to_table1">
				<label className="grid" htmlFor="title">
					<span>Name Surname</span>
					<input
						className="input border-slate-700"
						type="text"
						placeholder="Name Surname"
						name="title"
						required
					/>
				</label>
				<label className="grid" htmlFor="amount">
					<span>Group</span>
					<input
						className="input border-slate-700"
						type="number"
						placeholder="Group"
						name="amount"
						required
					/>
				</label>
	  
			</Form>
		</div>
		
		
	)
}

export default NaukForm
