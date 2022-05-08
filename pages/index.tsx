import Head from 'next/head'
import { useEffect, useState } from 'react'
import Switch from 'react-switch'
import { SetDiodeStatusRequest } from '../model/SetDiodeStatusRequest'
import LoadingSpinner from '../components/LoadingSpinner'
import { parseBoolean } from '../lib/utils'
import Header from "../components/Header"

const HomePage = () => {
  const [isChecked, setChecked] = useState(false)
  const [isChangingDiodeState, setChangingDiodeState] = useState(false)

  const handleCheckedChange = async (newChecked: boolean) => {
    const setDiodeState = async () => {
      setChangingDiodeState(true)

      const request: SetDiodeStatusRequest = {
        isChecked: newChecked,
      }
      const response = await fetch('/api/diode/set', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(request),
      })

      const rawText: string = await response.text()
      const isChecked: boolean = parseBoolean(rawText)
      console.log('Response: ' + isChecked)
      setChecked(isChecked)
      setChangingDiodeState(false)
    }
    setDiodeState().catch(console.error)
  }

  useEffect(() => {
    const fetchDiodeState = async () => {
      setChangingDiodeState(true)
      const response = await fetch('/api/diode')
      const rawText: string = await response.text()
      const isChecked: boolean = parseBoolean(rawText)
      console.log('Response: ' + isChecked)
      setChecked(isChecked)
      setChangingDiodeState(false)
    }
    fetchDiodeState().catch(console.error)
  }, [])

  return (
    <div>
      <Head>
        <title>Table Tennis Robot GUI</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />

      <div className="flex flex-row p-2">
        <LoadingSpinner isLoading={isChangingDiodeState} />
      </div>

      <div className="flex h-screen flex-col items-center justify-center">
        <Switch
          onChange={handleCheckedChange}
          checked={isChecked}
          className="react-switch"
          checkedIcon={false}
          uncheckedIcon={false}
          disabled={isChangingDiodeState}
        />
        <p className="mt-2">
          Diode <span>{isChecked ? 'enabled' : 'disabled'}</span>
        </p>

        {/* Test view on top */}
        <div className="container relative mx-auto w-1/2 bg-gray-500 p-4">
          <div className="absolute top-1/4 left-1/4 h-1/2 w-1/2 rounded-lg bg-red-300 p-4">
            div
          </div>
        </div>
      </div>
    </div>
  )
}

export default HomePage
