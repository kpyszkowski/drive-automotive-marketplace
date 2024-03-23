import type { Meta, StoryObj } from '@storybook/react'
import { FeaturesList } from './FeaturesList'
import { FireIcon } from '@heroicons/react/24/outline'

const meta: Meta<typeof FeaturesList> = {
  title: 'Atoms/FeaturesList',
  component: FeaturesList,
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof FeaturesList>

export const Default: Story = {
  args: {
    items: [
      { label: 'Power', value: '300 KM', icon: FireIcon },
      { label: 'Fuel', value: 'Diesel', icon: FireIcon },
      { label: 'Mileage', value: '100 000 km', icon: FireIcon },
      { label: 'Year', value: '2019', icon: FireIcon },
      { label: 'Engine', value: '2.0 R6', icon: FireIcon },
    ],
  },
}
