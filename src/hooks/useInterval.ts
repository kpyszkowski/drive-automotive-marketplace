import { useEffect } from 'react'

const useInterval = (callback: VoidFunction, interval: number) => {
  useEffect(() => {
    let lastTimestamp = 0

    function loop(timestamp: number) {
      if (timestamp - lastTimestamp >= interval) {
        callback()
        lastTimestamp = timestamp
      }

      requestAnimationFrame(loop)
    }

    const requestId = requestAnimationFrame(loop)

    return () => cancelAnimationFrame(requestId)
  }, [])
}

export default useInterval