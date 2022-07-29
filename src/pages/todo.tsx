import { Button } from '@/components/ui/button';
import { trpc } from '@/utils/trpc';
import autoAnimate from '@formkit/auto-animate';
import type { NextPage } from 'next';
import Head from 'next/head';
import { useEffect, useRef } from 'react';

const Todo: NextPage = () => {
  const { data: todos, refetch: refetchTodos } = trpc.useQuery(['todo.getTodos']);
  const { mutate: addTodo } = trpc.useMutation(['todo.addTodo'], {
    onSuccess: () => refetchTodos(),
  });
  const { mutate: removeTodo } = trpc.useMutation(['todo.removeTodo'], {
    onSuccess: () => refetchTodos(),
  });

  const handleAdd = () => {
    addTodo({ title: `New todo ${new Date().getMinutes() + new Date().getMilliseconds()}` });
  };

  const handleRemove = (id: string) => {
    removeTodo({ id: id });
  };

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
          <Button onClick={() => handleAdd()}>Add</Button>
        </div>
        <div
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 select-none"
          ref={parent}
        >
          {todos?.map((item) => {
            return (
              <div key={item.id} className="mx-2">
                <div>{item.title}</div>
                <Button onClick={() => handleRemove(item.id)}>
                  <div className="select-none">Remove</div>
                </Button>
              </div>
            );
          })}
        </div>
      </main>
    </>
  );
};

export default Todo;
