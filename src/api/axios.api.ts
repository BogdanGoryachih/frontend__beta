import axios from 'axios'
import { getTokenFromLocalStorage } from '../helpers/localstorage.helper'

export const instance = axios.create({
	baseURL: 'https://gk45g0ml-3001.euw.devtunnels.ms/',
	headers: {
		Authorization: `Bearer ` + getTokenFromLocalStorage() || '',
	},
})
