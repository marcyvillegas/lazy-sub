export const convertContent = (content: string | string[]) => {
  let returnedContent = content;

  if (typeof content === 'string') {
    returnedContent = [content];
    return returnedContent.join('\n=\n');
  }

  return content.join('\n=\n');
};
