import { AnchorHTMLAttributes } from "react";
import Link from "next/link";

interface Props extends AnchorHTMLAttributes<HTMLAnchorElement> {
  href: string;
  active: boolean;
  children: React.ReactNode;
}

export function EndpointButton({ href, active, children, ...props }: Props) {
  const activeStyles = active ? "text-blue-100" : "text-black";

  return (
    <Link
      href={href}
      className={`
        flex mx-4 py-2 px-4 rounded-md text-1 font-400 
        hover:bg-gray-100
        active:bg-gray-200
        ${activeStyles}
      `}
      {...props}
    >
      {children}
    </Link>
  );
}
