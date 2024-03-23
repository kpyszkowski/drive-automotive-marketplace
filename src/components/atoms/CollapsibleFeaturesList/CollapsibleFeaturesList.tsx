'use client'
import clsx from 'clsx'
import type { CollapsibleFeaturesListProps } from './CollapsibleFeaturesList.types'
import styles from './CollapsibleFeaturesList.module.css'
import { useState } from 'react'
import { m } from 'framer-motion'
import { ArrowDownRightIcon as TriggerIcon } from '@heroicons/react/24/outline'

const MotionTriggerIcon = m(TriggerIcon)

export const CollapsibleFeaturesList = (
  props: CollapsibleFeaturesListProps,
) => {
  const { items, className = '', ...restProps } = props
  const [currentItemIndex, setCurrentItemIndex] = useState(0)

  return (
    <ul
      className={clsx(className, styles.container)}
      {...restProps}
    >
      {items.map((item, index) => {
        const { label, items: itemsList } = item
        return (
          <li
            key={index}
            className={styles.wrapper}
          >
            <button
              className={styles.trigger}
              onClick={() => setCurrentItemIndex(index)}
            >
              {label}
              <MotionTriggerIcon
                className={styles.triggerIcon}
                animate={{
                  rotate: currentItemIndex === index ? '-90deg' : 0,
                }}
              />
            </button>
            <m.ul
              layout
              className={styles.itemsList}
              animate={{
                height: currentItemIndex === index ? 'auto' : 0,
                transformOrigin: 'bottom',
              }}
              transition={{
                type: 'spring',
                damping: 16,
                mass: 0.56,
              }}
            >
              {itemsList.map((item, itemIndex) => (
                <li
                  className={styles.item}
                  key={itemIndex}
                >
                  {item}
                </li>
              ))}
            </m.ul>
          </li>
        )
      })}
    </ul>
  )
}
