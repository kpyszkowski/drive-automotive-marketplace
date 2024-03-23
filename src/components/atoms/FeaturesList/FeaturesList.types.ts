import type { HTMLAttributes, ComponentPropsWithoutRef, ReactNode } from 'react'

export type FeaturesListItem = {
  label: string
  value: string
  icon: (args: HTMLAttributes<SVGSVGElement>) => ReactNode
}

export type FeaturesListProps = {
  items: FeaturesListItem[]
} &
  ComponentPropsWithoutRef<'ul'>
