
export interface CorePage<P = {}> extends React.FC<P>{
  pageName?: string,
  pageRoutePath: string,
  pageLinkPath?: string,
  pageIcon?: any,
  pageIconSrc?: string
}

export default CorePage;
