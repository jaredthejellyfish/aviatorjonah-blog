import { useEffect, useState } from 'react'

const useDataFetching = <T>(url: string, disabled: boolean = false) => {
  const [data, setData] = useState<T | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [controller, setController] = useState<AbortController | null>(null)

  useEffect(() => {
    // If disabled, abort any ongoing fetch and reset state
    if (disabled) {
      if (controller) {
        controller.abort()
      }
      setData(null)
      setError(null)
      setIsLoading(false)
      return
    }

    // Create AbortController instance
    const abortController = new AbortController()
    setController(abortController)

    const fetchData = async () => {
      try {
        setIsLoading(true)
        setError(null)

        const response = await fetch(url, {
          signal: abortController.signal,
          headers: {
            'Content-Type': 'application/json',
          },
        })

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }

        const result: T = await response.json()
        setData(result)
      } catch (error) {
        // Only set error if it's not an abort error
        if ((error as Error).name !== 'AbortError') {
          setError((error as Error).message)
        }
      } finally {
        setIsLoading(false)
      }
    }

    fetchData()

    // Cleanup function
    return () => {
      abortController.abort()
    }
  }, [url, disabled]) // Re-run if url or disabled changes

  const refetch = async () => {
    if (disabled) {
      // If disabled, do not perform fetch
      return
    }

    // Abort previous request if it exists
    if (controller) {
      controller.abort()
    }

    const newController = new AbortController()
    setController(newController)

    try {
      setIsLoading(true)
      setError(null)

      const response = await fetch(url, {
        signal: newController.signal,
        headers: {
          'Content-Type': 'application/json',
        },
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const result: T = await response.json()
      setData(result)
    } catch (error) {
      if ((error as Error).name !== 'AbortError') {
        setError((error as Error).message)
      }
    } finally {
      setIsLoading(false)
    }
  }

  return { data, error, isLoading, refetch }
}

export default useDataFetching
