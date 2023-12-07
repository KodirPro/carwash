"use client";

export function Button({
  children,
  className,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      {...props}
      className={
        "px-5 py-2 font-medium text-lg text-white rounded whitespace-nowrap text-ellipsis overflow-hidden shadow-md transition duration-200 hover:brightness-125 " +
        className
      }
    >
      {children}
    </button>
  );
}
