import type { Meta, StoryObj } from '@storybook/react'
import { CollapsibleFeaturesList } from './CollapsibleFeaturesList'
import { FireIcon } from '@heroicons/react/24/outline'

const meta: Meta<typeof CollapsibleFeaturesList> = {
  title: 'Atoms/CollapsibleFeaturesList',
  component: CollapsibleFeaturesList,
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof CollapsibleFeaturesList>

export const Default: Story = {
  args: {
    items: [
      { label: 'Label 1', items: [
        'Item 1', 'Item 2', 'Item 3', 'Item 4'
      ] },
      { label: 'Label 2', items: [
        'Item 1', 'Item 2', 'Item 3', 'Item 4'
      ] },
      { label: 'Label 3', items: [
        'Item 1', 'Item 2', 'Item 3', 'Item 4'
      ] },
      { label: 'Label 4', items: [
        'Item 1', 'Item 2', 'Item 3', 'Item 4'
      ] },
      { label: 'Label 5', items: [
        'Item 1', 'Item 2', 'Item 3', 'Item 4'
      ] },
    ],
  },
}
