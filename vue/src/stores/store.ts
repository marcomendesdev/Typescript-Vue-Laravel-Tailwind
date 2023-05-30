import { defineStore } from 'pinia'
import axiosClient from '@/axiosClient'

export const useAppStore = defineStore('main', {
  state: () => ({
    user: {
      data: {},
      token: localStorage.getItem('token') || null
    }
  }),
  actions: {
    async userSignup(user: any) {
      try {
        const response = await axiosClient.post('/signup', user)
        if (response && response.data) {
          localStorage.setItem('token', response.data.token)
          console.log('Token stored:', response.data.token)
        } else {
          console.log('Token not found in the response')
        }
      } catch (error: any) {
        const { response } = error
        console.log('Error:', response.data.message)
        console.log('Message:', response.data.errors.password)
        
        throw response.data.errors.password
      }
    },
    async userLogin(user: any) {
      try {
        const { data } = await axiosClient.post('/login', user)
        console.log('UserLogin', data.token)
        localStorage.setItem('token', data.token)
      } catch (error: any) {
        const { response } = error
        console.log('Error:', response.data.message)
        throw response.data.message
      }
    },
    async logoutUser() {
      try {
        const response = await axiosClient.post('/logout')
        console.log('ResLogout:', response)
        localStorage.removeItem('token')
        this.user.token = null
      } catch (error) {
        console.log(error)
      }
    }
  },
  getters: {}
})
