import clsx from 'clsx';
import { ComponentProps, forwardRef, ReactNode } from 'react';
import { useFormContext } from 'react-hook-form';

export interface Props extends ComponentProps<'input'> {
  label?: string;
  icon?: ReactNode;
}

export const Input = forwardRef<HTMLInputElement, Props>(function Input(
  { label, icon, type = 'text', ...props },
  ref,
) {
  const {
    formState: { errors },
  } = useFormContext();
  const error = errors[props.name || ''];

  if (type === 'radio' || type === 'checkbox') {
    return (
      <>
        <input
          className="bg-white text-primary focus:border-primary focus:ring-transparent self-center"
          type={type}
          ref={ref}
          {...props}
        />

        <div className="text-sm text-red-500 font-bold">
          <>&nbsp;{error?.message}</>
        </div>
      </>
    );
  }

  return (
    <div>
      {label && (
        <label htmlFor={`input-${props.name}`} className="pb-1 px-2 text-md font-semibold">
          {label}
        </label>
      )}

      <div className="relative">
        {icon && (
          <div className="absolute inset-y-0 pl-2 left-0 flex items-center pointer-events-none">
            {icon}

            <div className="ml-1.5 w-[1px] h-full bg-opacity-50 bg-gray-800"></div>
          </div>
        )}

        <input
          id={`input-${props.name}`}
          className={clsx(
            'bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-200 w-full rounded-md py-2 border focus:border-primary focus:ring-primary',
            icon && 'pl-12 pr-4 ',
            !icon && 'px-4',
          )}
          type={type}
          ref={ref}
          {...props}
        />
      </div>

      <div className="text-sm text-red-500 font-bold">
        <>&nbsp;{error?.message}</>
      </div>
    </div>
  );
});
