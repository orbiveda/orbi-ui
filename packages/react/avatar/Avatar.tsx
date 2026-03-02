import React, { forwardRef, useState } from "react";
import "./avatar.css";

export type AvatarSize = "sm" | "md" | "lg";

export interface AvatarProps extends React.HTMLAttributes<HTMLSpanElement> {
  src?: string;
  alt?: string;
  fallback?: string;
  size?: AvatarSize;
}

export const Avatar = forwardRef<HTMLSpanElement, AvatarProps>(
  ({ size = "md", src, alt = "", fallback, className, ...rest }, ref) => {
    const [imgError, setImgError] = useState(false);
    const showImage = src && !imgError;

    const classes = [
      "orbi-avatar",
      `orbi-avatar--${size}`,
      className,
    ]
      .filter(Boolean)
      .join(" ");

    return (
      <span ref={ref} className={classes} role="img" aria-label={alt || undefined} {...rest}>
        {showImage ? (
          <img
            src={src}
            alt={alt}
            className="orbi-avatar__image"
            onError={() => setImgError(true)}
          />
        ) : (
          <span className="orbi-avatar__fallback" aria-hidden="true">
            {fallback}
          </span>
        )}
      </span>
    );
  }
);

Avatar.displayName = "Avatar";
