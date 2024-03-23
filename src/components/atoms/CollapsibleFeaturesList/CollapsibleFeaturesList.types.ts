import type { ComponentPropsWithoutRef } from 'react'

export type CollapsibleFeaturesListProps = {
  items: {
    label: string
    items: string[]
  }[]
} & ComponentPropsWithoutRef<'ul'>
