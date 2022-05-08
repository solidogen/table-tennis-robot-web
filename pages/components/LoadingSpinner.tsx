interface LoadingSpinnerProps {
  isLoading: boolean
}

const LoadingSpinner = (props: LoadingSpinnerProps) => {
  if (props.isLoading) {
    return <div>Loading...</div>
  } else {
    return null
  }
}

export default LoadingSpinner
