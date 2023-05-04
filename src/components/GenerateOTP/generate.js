import {useState} from 'react'

export function GenerateOTP(){

    const [mobile, setMobile]=useState()
    const [err, setErr]=useState('')

    function userInput(e){
        e.preventDefault()
        setMobile(e.target.value)
    }

    async function handleOtp(){
        try{
            
        const ex=/^[6-9]\d{9}$/

        if(!ex.test(mobile)){
            setErr('Invalid Mobile Number')
            return
        }

        const url='https://cdn-api.co-vin.in/api/v2/auth/public/generateOTP'

        const response=await fetch(url,{
            method:'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body:JSON.stringify({mobile:mobile})
        })
        
        if(!response.ok){
            throw new Error("Failed to send OTP")
        }

        setMobile('')
        setErr('')
    }

    catch(error){
        console.log(error)
    }

    }

    return (
        <>
        <div>
            <h1>Generate OTP</h1>
            Enter Mobile Number: 
            <input onChange={userInput} value={mobile} type="number" placeholder='mobile'/>
            <button onClick={handleOtp}>Get OTP</button>
        </div>
        <div>
            <h4>{err}</h4>
        </div>
        </>
    )
} 
