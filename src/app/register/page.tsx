'use client'

import Signup from "@/components/Signup"
import Welcome from "@/components/Welcome"
import { useState } from "react"

const RegisterRouter = () => {
  const [step, setStep] = useState(1)
  return (
    <div >
      {
        step === 1 ? <Welcome nextStep={setStep}/> : <Signup nextStep={setStep}/>
      }
    </div>
  )
}

export default RegisterRouter