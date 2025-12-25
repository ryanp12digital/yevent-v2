'use client'

import { useMemo } from 'react'

export interface UTMParams {
  utm_source?: string
  utm_medium?: string
  utm_campaign?: string
  utm_term?: string
  utm_content?: string
}

export function useUTMTracker() {
  const utms = useMemo(() => {
    if (typeof window === 'undefined') return {}

    const searchParams = new URLSearchParams(window.location.search)
    return {
      utm_source: searchParams.get('utm_source') || undefined,
      utm_medium: searchParams.get('utm_medium') || undefined,
      utm_campaign: searchParams.get('utm_campaign') || undefined,
      utm_term: searchParams.get('utm_term') || undefined,
      utm_content: searchParams.get('utm_content') || undefined,
    }
  }, [])

  return utms
}