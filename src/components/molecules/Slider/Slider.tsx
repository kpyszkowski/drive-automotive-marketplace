import React from 'react'
import styles from './Slider.module.css'
import type { SliderProps } from '@/components/molecules/Slider/Slider.types'
import clsx from 'clsx'
import * as SliderPrimitive from '@radix-ui/react-slider'
import { Tooltip } from '../Tooltip/Tooltip'

export const Slider = (props: SliderProps) => {
  const {
    className = '',
    defaultValue = [0],
    minStepsBetweenThumbs = 1,
    label,
    name,
    ...restProps
  } = props

  const isRangeMode = defaultValue.length > 1

  const [value, setValue] = React.useState(defaultValue)

  return (
    <SliderPrimitive.Root
      className={clsx(className, styles.container)}
      defaultValue={defaultValue}
      onValueChange={setValue}
      value={value}
      minStepsBetweenThumbs={minStepsBetweenThumbs}
      name={name}
      {...restProps}
    >
      {label && name && (
        <label
          className={styles.label}
          htmlFor={name}
        >
          {label}
        </label>
      )}

      <SliderPrimitive.Track className={styles.track}>
        <SliderPrimitive.Range className={styles.range} />
      </SliderPrimitive.Track>

      <Tooltip
        className={styles.tooltip}
        content={`${value[0]}`}
        side="bottom"
        open
      >
        <SliderPrimitive.Thumb className={styles.thumb} />
      </Tooltip>

      {isRangeMode && (
        <Tooltip
          className={styles.tooltip}
          content={`${value[1]}`}
          side="bottom"
          open
        >
          <SliderPrimitive.Thumb className={styles.thumb} />
        </Tooltip>
      )}
    </SliderPrimitive.Root>
  )
}
