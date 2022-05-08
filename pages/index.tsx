import { GetServerSideProps } from 'next'
import Head from 'next/head'
import { useEffect, useState } from 'react'
import Switch from 'react-switch'

interface HomePageProps {
  isInitiallyChecked: boolean
}

const HomePage = (props: HomePageProps) => {
  const [checked, setChecked] = useState(props.isInitiallyChecked)
  const handleCheckedChange = (nextChecked: boolean) => {
    setChecked(nextChecked)
  }

  return (
    <div>
      <Head>
        <title>Table Tennis Robot GUI</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <h1>todo header component</h1>

      <div className="flex h-screen flex-col items-center justify-center">
        <Switch
          onChange={handleCheckedChange}
          checked={checked}
          className="react-switch"
          checkedIcon={false}
          uncheckedIcon={false}
        />
        <p className="mt-2">
          Diode <span>{checked ? 'enabled' : 'disabled'}</span>
        </p>
      </div>
    </div>
  )
}

export default HomePage

export const getServerSideProps: GetServerSideProps<
  HomePageProps
> = async () => {
  const isInitiallyChecked = true

  const homePageProps: HomePageProps = {
    isInitiallyChecked: isInitiallyChecked,
  }

  return {
    props: homePageProps,
  }
}
