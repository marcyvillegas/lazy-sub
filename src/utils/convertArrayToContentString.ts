export const convertArrayToContentString = (
  content: string | string[],
  separator: string
) => {
  let returnedContent = content;

  if (typeof content === 'string') {
    returnedContent = [content];
    return returnedContent.join(`\n${separator}\n`);
  }

  return content.join(`\n${separator}\n`);
};
