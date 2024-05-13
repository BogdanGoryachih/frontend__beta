export interface IUser {
	id: number
	email: string
	token: string
}

export interface IUserData {
	email: string
	password: string
}

export interface IResponseUser {
	email: string
	id: number
	createdAt: string
	updatedAt: string
	password: string
}

export interface IResponseUserData {
	token: string
	user: IResponseUser
}

export interface ITransaction {
	amount: number
	createdAt: string
	updatedAt: string
	title: string
	type: string
	id: number
	category: ICategory
}

export interface ICategory {
	title: string
	id: number
	createdAt: string
	updatedAt: string
	transactions?: []
	nauk?:[]

}

export interface IResponseTransactionLoader {
	categories: ICategory[]
	transactions: ITransaction[]
	nauk : INauk
	totalIncome: number
	totalExpense: number
}

export interface INauk {
	amount: number
	createdAt: string
	updatedAt: string
	title: string
	type: string
	id: number
	category: ICategory
}