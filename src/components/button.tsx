"use client";

export function Button({
  children,
  className,
  ...props
}: React.AnchorHTMLAttributes<HTMLAnchorElement>) {
  return (
    <a
      {...props}
      className={
        "px-5 py-2 font-medium text-lg text-white rounded whitespace-nowrap text-ellipsis overflow-hidden shadow-md transition duration-200 hover:brightness-125 cursor-pointer " +
        className
      }
    >
      {children}
    </a>
  );
}
