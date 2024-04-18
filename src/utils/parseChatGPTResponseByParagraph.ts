export const parseChatGPTResponseByParagraph = (
  response: string,
): { text: string }[] => {
  const paragraphs = response.split("\n\n");
  return paragraphs.map((paragraph) => {
    return {
      text: paragraph.trim(),
    };
  });
};
