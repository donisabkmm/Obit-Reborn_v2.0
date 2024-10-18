import React from "react";
import { hyphenateSync } from "hyphen/ml";

export const Title = ({ children = null, className = null }) => {
  return (
    <h2 className={`truncate text-primary text-2xl ${className}`}>
      {children}
    </h2>
  );
};

export const SubTitle = () => {};

export const LabelText = ({
  children = null,
  size = "sm",
  className = null,
  link = false,
  ...rest
}) => (
  <label
    className={`truncate text-${size} text-primary ${className} ${
      link ? "cursor-pointer" : ""
    }`}
    {...rest}
  >
    {children}
  </label>
);

export const Hyphenated = ({ children = "", style = {}, className = "" }) => {
  const hyphenaizedText = hyphenateSync(children, {
    hyphenChar: `&#8203;`,
  });
  return (
    <span
      lang="ml"
      className={className}
      style={style}
      dangerouslySetInnerHTML={{ __html: hyphenaizedText }}
    />
  );
};
