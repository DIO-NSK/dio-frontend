export interface InnerPageWrapperClassNames {
  mobileWrapper?: string;
  desktopWrapper?: string;
}

export interface InnerPageWrapperProps {
  classNames?: InnerPageWrapperClassNames;
  children: React.ReactNode;
}
