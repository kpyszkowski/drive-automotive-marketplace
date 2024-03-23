import clsx from 'clsx'
import type { FeaturesListItem, FeaturesListProps } from './FeaturesList.types'
import styles from './FeaturesList.module.css'

export const FeaturesList = (props: FeaturesListProps) => {
  const { items, className = '', ...restProps } = props

  return (
    <ul
      className={clsx(
        className, styles.container
      )}
      {...restProps}
    >
      {items.map((item, index) => {
        const { label, value, icon: Icon } = item as FeaturesListItem
        return (
          <li
            key={index}
            className={styles.item}
          >
            <Icon className={styles.icon} />
            <div
              className={styles.contentWrapper}
            >
              <span className={styles.label}>{label}</span>
              <span className={styles.value}>{value}</span>
            </div>
          </li>
        )
      })}
    </ul>
  )
}
