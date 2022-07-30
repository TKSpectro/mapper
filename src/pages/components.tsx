import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { CurrencyEuroIcon } from '@heroicons/react/outline';
import { zodResolver } from '@hookform/resolvers/zod';
import { NextPage } from 'next';
import Head from 'next/head';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

const Components: NextPage = () => {
  const form = useForm({
    resolver: zodResolver(
      z.object({
        text: z.string(),
        text2: z
          .string()
          .min(3, { message: 'Must be 3 or more characters long' })
          .max(20, { message: 'Must be 20 or less characters long' }),
        number: z
          .number()
          .min(3, { message: 'Must be at least 3' })
          .max(20, { message: 'Must be at most 20' }),
        number2: z.number().min(0.01, { message: 'Must be at least 0.01' }),
      }),
    ),
  });

  return (
    <>
      <Head>
        <title>mapper | Components</title>
        <meta name="description" content="mapper | Components" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="container mx-auto flex flex-col items-center p-4">
        <h1 className="text-7xl leading-normal font-extrabold text-gray-700">Components</h1>

        <h3 className="text-5xl leading-normal font-extrabold text-gray-700">Button</h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-6 gap-4">
          <Button>No variant</Button>
          <Button variant="primary">Primary</Button>
          <Button variant="info">Info</Button>
          <Button variant="success">Success</Button>
          <Button variant="warning">Warning</Button>
          <Button variant="danger">Danger</Button>
        </div>
        <br />

        <div className="w-96">
          <Button fullWidth>Full width</Button>
        </div>
        <br />

        <div>
          <Button>
            <h3 className="text-2xl">With Children</h3>
          </Button>
        </div>
        <br />

        <h3 className="text-5xl leading-normal font-extrabold text-gray-700">Form/Input</h3>

        <Form
          form={form}
          onSubmit={(data) => {
            console.log('Form submitted', data);
          }}
        >
          <Input {...form.register('text')} />
          <Input label="Label" placeholder="Some text placeholder" {...form.register('text2')} />
          <Input type="number" {...form.register('number', { valueAsNumber: true })} />
          <Input
            icon={<CurrencyEuroIcon className="h-6 w-6 text-gray-800" />}
            type="number"
            step={0.01}
            {...form.register('number2', { valueAsNumber: true })}
          />
          <Input type="checkbox" label="Checkbox" />
          <Input type="color" label="Color" />
          <Input type="date" label="Datetime" />
          <Input type="datetime-local" label="DatetimeLocal" />
          <Input type="email" label="Email" />
          <Input type="radio" label="Radio" />
          <Input type="range" label="Range" />
          <Input type="time" label="Time" />

          <Button type="submit">Submit</Button>
        </Form>
        <br />
      </main>
    </>
  );
};
export default Components;
