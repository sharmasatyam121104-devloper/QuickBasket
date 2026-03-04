'use client'

import clientErrorHandler from "@/lib/clientErrorHandler"
import { AppDispatch } from "@/redux/store"
import { setUserData } from "@/redux/userSlice"
import axios from "axios"
import { useEffect } from "react"
import { useDispatch } from "react-redux"

const UseGetMe = () => {
    const dispatch = useDispatch<AppDispatch>()
    useEffect(()=>{
        const getMe = async()=>{
            try {
                const {data} = await axios.get("/api/me")
                dispatch(setUserData(data))
            } 
            catch (error) {
                return clientErrorHandler(error)    
            }
        }
        getMe()
    },[])
}

export default UseGetMe