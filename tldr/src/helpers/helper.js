const defaultPageTitle = 'Home';

export const getPageTitle = (pageContext) => {
  const node = pageContext.node;

  if (!!node && pageContext.title && (node[pageContext.title] || node.data[pageContext.title])) {
    return node[pageContext.title] || node.data[pageContext.title];
  }

  return pageContext.title || defaultPageTitle;
};
