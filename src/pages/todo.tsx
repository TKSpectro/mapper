import { Button } from '@/components/ui/button';
import { Form, useZodForm } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { trpc } from '@/utils/trpc';
import autoAnimate from '@formkit/auto-animate';
import { CheckCircleIcon, MinusCircleIcon, TrashIcon } from '@heroicons/react/outline';
import clsx from 'clsx';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import type { NextPage } from 'next';
import Head from 'next/head';
import { useEffect, useRef } from 'react';
import { z } from 'zod';
dayjs.extend(relativeTime);

const Todo: NextPage = () => {
  const { data: todos, refetch: refetchTodos } = trpc.useQuery(['todo.getAll']);
  const { mutate: addTodo } = trpc.useMutation(['todo.add'], {
    onSuccess: () => refetchTodos(),
  });
  const { mutate: removeTodo } = trpc.useMutation(['todo.remove'], {
    onSuccess: () => refetchTodos(),
  });
  const { mutate: completeTodo } = trpc.useMutation(['todo.complete'], {
    onSuccess: () => refetchTodos(),
  });

  const form = useZodForm({
    schema: z.object({
      title: z.string().min(1, { message: 'Must be at least 1 character long' }),
      description: z
        .string()
        .max(300, { message: 'Must be 300 or less characters long' })
        .nullable(),
    }),
  });

  // Add autoanimate for the grid
  const parent = useRef(null);
  useEffect(() => {
    parent.current && autoAnimate(parent.current);
  }, [parent]);

  return (
    <>
      <Head>
        <title>mapper | Todo</title>
        <meta name="description" content="mapper | Todo" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="container mx-auto flex flex-col items-center p-4">
        <h1 className="text-5xl md:text-[5rem] leading-normal font-extrabold text-gray-700">
          Todo
        </h1>
        <div className="pb-4">
          <Form
            form={form}
            onSubmit={(data) => {
              addTodo({
                ...data,
              });
            }}
          >
            <Input label="Title" {...form.register('title')} placeholder="My Todo" />
            <Input label="Description" {...form.register('description')} />

            <Button type="submit">Submit</Button>
          </Form>
        </div>
        <div className="flex flex-wrap justify-center gap-4 p-8 select-none" ref={parent}>
          {todos?.map((item) => (
            <div
              key={item.id}
              className={clsx(
                'relative flex h-52 w-96 animate-fade-in-down flex-col rounded border border-gray-500 bg-gray-200 shadow-xl',
                { 'opacity-50': item.completed },
              )}
            >
              <div className="flex justify-between border-b border-gray-500 p-4">
                {item.title}
                <div className="flex gap-4">
                  <button onClick={() => completeTodo({ id: item.id })}>
                    {item.completed ? (
                      <CheckCircleIcon className="h-6 w-6 text-gray-800" />
                    ) : (
                      <MinusCircleIcon className="h-6 w-6 text-gray-800" />
                    )}
                  </button>
                  <button onClick={() => removeTodo({ id: item.id })}>
                    <TrashIcon className="h-6 w-6 text-gray-800" />
                  </button>
                </div>
              </div>

              <div className={clsx('px-4 py-2 text-ellipsis overflow-hidden')}>
                {item.description}
              </div>

              <div className="absolute bottom-0 w-full px-4 py-2 border-t border-gray-500 text-end">
                {dayjs(item.createdAt).fromNow()}
              </div>
            </div>
          ))}
        </div>
      </main>
    </>
  );
};

export default Todo;
