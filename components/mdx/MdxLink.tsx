import Link from "next/link";
import { type AnchorHTMLAttributes } from "react";

/**
 * Anchor override for MDX bodies: internal links use next/link (client-side
 * navigation), external links open safely in a new tab.
 */
export default function MdxLink({
  href = "",
  children,
  ...rest
}: AnchorHTMLAttributes<HTMLAnchorElement>) {
  const isInternal = href.startsWith("/");
  if (isInternal) {
    return (
      <Link href={href} {...rest}>
        {children}
      </Link>
    );
  }
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" {...rest}>
      {children}
    </a>
  );
}
