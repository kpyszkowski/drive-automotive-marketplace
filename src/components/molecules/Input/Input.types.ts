import type { HTMLProps } from 'react'

export interface InputProps extends HTMLProps<HTMLInputElement> {
  label: string
  error?: string
}
