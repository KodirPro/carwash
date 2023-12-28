"use client";

export function Button({
  href,
  square,
  children,
  className,
  ...props
}: React.AnchorHTMLAttributes<HTMLAnchorElement> & { square?: boolean }) {
  const typeClass = square ? "w-12 sm:w-14 h-11 sm:h-12 grid place-items-center" : "px-5 py-2";

  return (
    <a
      {...props}
      className={
        typeClass +
        " font-medium text-lg text-white rounded whitespace-nowrap text-ellipsis overflow-hidden shadow-md transition duration-200 hover:brightness-125 cursor-pointer select-none " +
        className
      }
    >
      {children}
    </a>
  );
}
