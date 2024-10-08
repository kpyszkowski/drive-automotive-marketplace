'use client'
import { Avatar, Button, Skeleton } from '@/components'
import { useToast } from '@/hooks'
import {
  deleteComment,
  getCommentsByOfferId,
  postComment,
  signOut,
} from '@/lib'
import { useUserStore } from '@/stores'
import type { parseComment } from '@/utils'
import {
  ChevronRightIcon as ChevronIcon,
  TrashIcon,
} from '@heroicons/react/24/outline'
import clsx from 'clsx'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { useForm, type SubmitHandler } from 'react-hook-form'
import { HiOutlineUser as UserIcon } from 'react-icons/hi2'
import useSWR from 'swr'
import { Modal } from '../Modal/Modal'
import styles from './OfferDiscussionSection.module.css'
import type { OfferDiscussionSectionProps } from './OfferDiscussionSection.types'

const getRandomId = () => Math.floor(Math.random() * 1000)

type AddCommentFormType = {
  comment: string
}

export const OfferDiscussionSection = (props: OfferDiscussionSectionProps) => {
  const { className = '', offerId, ...restProps } = props

  const { data, mutate } = useSWR(offerId, getCommentsByOfferId)
  const { replace } = useRouter()

  const [isOpen, setIsOpen] = useState(false)
  const { userId, firstName, lastName } = useUserStore()

  const latestAuthorsInitials = [
    ...new Set(
      (data ?? []).map(({ author }) => {
        const [firstName, lastName] = author.split(' ')
        return [firstName[0], lastName[0]].join('')
      }),
    ),
  ].slice(-3)

  useEffect(() => {
    if (window.location.hash === '#discussion') {
      setIsOpen(true)
    }
  }, [data])

  const { handleSubmit, register, resetField } = useForm<AddCommentFormType>({
    mode: 'onSubmit',
    reValidateMode: 'onChange',
    defaultValues: {
      comment: '',
    },
  })

  const { toast } = useToast()

  const handleAddComment: SubmitHandler<AddCommentFormType> = async ({
    comment: newCommentContent,
  }) => {
    try {
      const newComment: ReturnType<typeof parseComment> = {
        id: getRandomId(),
        author: `${firstName} ${lastName}`,
        authorId: userId,
        content: newCommentContent,
        date: new Date().toISOString(),
      }

      // @ts-ignore
      await mutate(postComment(offerId, newCommentContent), {
        optimisticData: (cachedComments = []) => {
          return [...cachedComments, newComment]
        },
        populateCache: false,
      })

      resetField('comment')
    } catch (error) {
      toast({
        title: 'Wystąpił błąd podczas dodawania komentarza',
        description: 'Zaloguj się ponownie lub spróbuj ponownie później',
        status: 'error',
      })
    }
  }

  const handleDeleteComment = async (commentId: number) => {
    try {
      // @ts-ignore
      await mutate(deleteComment(commentId), {
        optimisticData: (cachedComments = []) => {
          return cachedComments.filter((comment) => comment.id !== commentId)
        },
        populateCache: false,
      })
      toast({
        title: 'Komentarz został usunięty',
        status: 'success',
      })
    } catch (error) {
      signOut()
      replace('/sign-in')
    }
  }

  return (
    <section
      className={clsx(className, styles.container)}
      {...restProps}
    >
      <div className={styles.avatarsList}>
        {latestAuthorsInitials.length > 0 ? (
          latestAuthorsInitials.map((initials) => (
            <Avatar
              key={initials}
              fullName={initials.split('') as [string, string]}
            />
          ))
        ) : (
          <Skeleton className={styles.avatarsListSkeleton} />
        )}
      </div>
      <p className={styles.heading}>Masz pytanie do właściciela?</p>
      <p className={styles.text}>Dołącz do dyskusji i zobacz pytania innych.</p>
      <Button
        className={styles.button}
        onClick={() => setIsOpen(true)}
      >
        Przejdź do dyskusji <ChevronIcon />
      </Button>
      <Modal
        label="Dyskusja"
        isOpen={isOpen}
        setIsOpen={setIsOpen}
      >
        <ul className={styles.commentsWrapper}>
          {data?.map((comment) => {
            const date = new Date(comment.date).toLocaleString('pl-PL', {
              dateStyle: 'medium',
              timeStyle: 'short',
            })
            const [firstName, lastName] = comment.author.split(' ')

            return (
              <li
                className={styles.comment}
                key={comment.date}
              >
                <Avatar
                  className={styles.commentAvatar}
                  fullName={[firstName, lastName]}
                />
                <div className={styles.commentContent}>
                  <span className={styles.commentAuthor}>{comment.author}</span>
                  <p className={styles.commentText}>{comment.content}</p>
                  <span className={styles.commentDate}>{date}</span>
                </div>
                {userId === comment.authorId && (
                  <button
                    className={styles.commentDeleteButton}
                    type="button"
                    aria-label="Usuń komentarz"
                    onClick={() => handleDeleteComment(comment.id)}
                  >
                    <TrashIcon />
                  </button>
                )}
              </li>
            )
          })}
        </ul>

        {userId ? (
          <form
            className={styles.commentForm}
            onSubmit={handleSubmit(handleAddComment)}
          >
            <textarea
              {...register('comment')}
              className={styles.commentInput}
              placeholder="Zadaj pytanie..."
            />
            <Button
              type="submit"
              className={styles.commentButton}
              size="small"
            >
              Wyślij
            </Button>
          </form>
        ) : (
          <p className={styles.signInNotice}>
            <UserIcon className={styles.userIcon} />
            Zaloguj się aby zadać pytanie
          </p>
        )}
      </Modal>
    </section>
  )
}
