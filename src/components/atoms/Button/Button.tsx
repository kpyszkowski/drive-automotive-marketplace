import React, { forwardRef } from 'react'
import styles from './Button.module.css'
import type { ButtonProps } from '@/components/atoms/Button/Button.types'
import clsx from 'clsx'
import Link from 'next/link'

export const Button = forwardRef<
  HTMLAnchorElement & HTMLButtonElement,
  ButtonProps
>((props, ref) => {
  const {
    variant = 'primary',
    size = 'large',
    children,
    className = '',
    href,
    ...restProps
  } = props

  const Component = href ? Link : 'button'

  return (
    <Component
      href={href as string}
      type={href ? undefined : 'button'}
      className={clsx(className, styles.container, [
        variant === 'primary' && styles.containerPrimary,
        variant === 'secondary' && styles.containerSecondary,
        size === 'large' && styles.containerLarge,
        size === 'small' && styles.containerSmall,
      ])}
      data-testid="button"
      ref={ref}
      {...restProps}
    >
      <span className={styles.contentWrapper}>{children}</span>
    </Component>
  )
})

Button.displayName = 'Button'
