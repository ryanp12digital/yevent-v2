
'use client'

import { useRouter } from 'next/navigation'

export function useSafeRouter() {
  try {
    return useRouter()
  } catch (e) {
    return null
  }
}
