'use client'
import type { FileInputProps } from '@/components/molecules/FileInput/FileInput.types'
import { mergeRefs } from '@/utils'
import {
  ExclamationCircleIcon as ErrorIcon,
  DocumentDuplicateIcon as FileIcon,
  TrashIcon,
  ArrowUpTrayIcon as UploadIcon,
} from '@heroicons/react/24/outline'
import clsx from 'clsx'
import type { Variants } from 'framer-motion'
import { AnimatePresence, m } from 'framer-motion'
import Image from 'next/image'
import { forwardRef, useCallback, useEffect, useState } from 'react'
import { useDropzone } from 'react-dropzone'
import styles from './FileInput.module.css'
import { useFormContext } from 'react-hook-form'

const errorVariants: Variants = {
  hidden: { opacity: 0, y: '-50%', height: 0 },
  visible: { opacity: 1, y: 0, height: 'auto' },
}
const iconButtonVariants = {
  hidden: { opacity: 0, x: '100%' },
  visible: { opacity: 1, x: 0 },
}
const itemVariants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: { opacity: 1, scale: 1 },
}

type FileWithPreview = File & { preview: string }

export const FileInput = forwardRef<HTMLInputElement, FileInputProps>(
  (props, forwardedRef) => {
    const {
      label,
      className = '',
      placeholderHeading,
      placeholderDescription,
      dragPlaceholderHeading,
      dragPlaceholderDescription,
      icon: Icon = FileIcon,
      error,
      name,
      onValueChange,
      defaultValue = [],
      ...restProps
    } = props

    const { trigger } = useFormContext()

    const handleFormValueUpdate = useCallback(
      (value: File[]) => {
        if (onValueChange && name) {
          onValueChange(value)
          trigger(name)
        }
      },
      [name, onValueChange, trigger],
    )

    const [files, setFiles] = useState<FileWithPreview[]>([])

    useEffect(() => {
      if (defaultValue.length === 0) return setFiles([])

      setFiles(
        defaultValue.map((file) =>
          Object.assign(file, { preview: URL.createObjectURL(file) }),
        ),
      )
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const handleOnDrop = useCallback(
      (acceptedFiles: File[]) => {
        const newFiles = [
          ...files,
          ...acceptedFiles.map((file) =>
            Object.assign(file, { preview: URL.createObjectURL(file) }),
          ),
        ]
        setFiles(newFiles)

        handleFormValueUpdate(newFiles)
      },
      [files, handleFormValueUpdate],
    )

    const {
      open: handleOpen,
      isDragActive,
      getInputProps,
      getRootProps,
      inputRef,
    } = useDropzone({
      onDrop: handleOnDrop,
      noClick: files.length > 0,
    })

    const handleDelete = useCallback(
      (index?: number) => {
        const updatedFiles = index
          ? files.filter((_, fileIndex) => fileIndex !== index)
          : []

        setFiles(updatedFiles)
        handleFormValueUpdate(updatedFiles)
      },
      [files, handleFormValueUpdate],
    )

    return (
      <div
        {...getRootProps({
          className,
        })}
      >
        <m.div
          layout="size"
          className={clsx(
            styles.container,
            error && styles.containerError,
            isDragActive && styles.containerDragActive,
          )}
        >
          <m.div
            layout="position"
            className={clsx(styles.header, error && styles.headerError)}
          >
            <span
              className={clsx(styles.label)}
              data-testid="input-label"
            >
              {label}
            </span>
            <m.div
              layout="position"
              className={styles.headerButtonsWrapper}
            >
              <AnimatePresence>
                <button
                  type="button"
                  key="upload-button"
                  className={styles.headerButton}
                  onClick={handleOpen}
                >
                  <UploadIcon />
                </button>
                {files.length > 0 && (
                  <m.button
                    type="button"
                    key="delete-button"
                    className={styles.headerButton}
                    onClick={() => handleDelete()}
                    variants={iconButtonVariants}
                    initial="hidden"
                    animate="visible"
                    exit="hidden"
                  >
                    <TrashIcon />
                  </m.button>
                )}
              </AnimatePresence>
            </m.div>
          </m.div>
          <m.div
            layout="position"
            className={clsx(
              styles.wrapper,
              files.length === 0 && styles.placeholderWrapper,
            )}
          >
            {files.length ? (
              <ul className={styles.previewWrapper}>
                <AnimatePresence mode="popLayout">
                  {files.map(
                    (file, index) =>
                      file && (
                        <m.li
                          layout="position"
                          variants={itemVariants}
                          initial="hidden"
                          animate="visible"
                          exit="hidden"
                          key={file.preview}
                          className={styles.previewItem}
                        >
                          <Image
                            className={styles.previewImage}
                            src={file.preview}
                            alt={file.name}
                            width={0}
                            height={0}
                            onLoad={() => URL.revokeObjectURL(file.preview)}
                          />
                          <button
                            type="button"
                            className={styles.previewButton}
                            onClick={() => handleDelete(index)}
                          >
                            <TrashIcon />
                          </button>
                        </m.li>
                      ),
                  )}
                </AnimatePresence>
              </ul>
            ) : (
              <div
                className={clsx(
                  styles.placeholder,
                  error && styles.placeholderError,
                  isDragActive && styles.placeholderDragActive,
                )}
              >
                <Icon className={styles.placeholderIcon} />
                <p className={styles.placeholderHeading}>
                  {isDragActive
                    ? dragPlaceholderHeading ?? placeholderHeading
                    : placeholderHeading}
                </p>
                <p className={styles.placeholderDescription}>
                  {isDragActive
                    ? dragPlaceholderDescription ?? placeholderDescription
                    : placeholderDescription}
                </p>
              </div>
            )}
          </m.div>
        </m.div>
        <AnimatePresence>
          {error && (
            <m.p
              className={styles.error}
              variants={errorVariants}
              initial="hidden"
              animate="visible"
              exit="hidden"
            >
              <ErrorIcon />
              {error}
            </m.p>
          )}
        </AnimatePresence>
        <input
          {...getInputProps({
            ref: mergeRefs(inputRef, forwardedRef),
            name,
            ...restProps,
          })}
        />
      </div>
    )
  },
)
FileInput.displayName = 'FileInput'
