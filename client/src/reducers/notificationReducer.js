import {createSlice} from '@reduxjs/toolkit'
import  { useEffect } from 'react'

const notificationSlice = createSlice({
    name: 'notification',
    initialState: null,
    reducers: {
        addNotification(state, action) {
            return action.payload
        }       
    }
})

export const {addNotification} = notificationSlice.actions

export const showNotification = (notif) => {
    return dispatch => {
        setTimeout(() => {
            dispatch(addNotification(null))
        }, 3000);
        dispatch(addNotification(notif))
    }
}

export default notificationSlice.reducer

