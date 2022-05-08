interface LoadingSpinnerProps {
  isLoading: boolean
}

const LoadingSpinner = (props: LoadingSpinnerProps) => {
  if (props.isLoading) {
    return <div>Loading...</div>
  } else {
    return <div>Settings saved</div>
  }
}

export default LoadingSpinner
