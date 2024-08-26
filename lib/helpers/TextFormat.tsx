interface IFormatKeywordInString {
  text: string;
  keyword: string;
  keywordClassName: string;
  className: string
}

const TextFormat = ({
  keyword,
  text,
  keywordClassName,
  className
}: IFormatKeywordInString) => {
  const index = text.indexOf(keyword);

  if (index === -1) {
    return <span>{text}</span>;
  }

  const beforeKeyword = text.slice(0, index);
  const afterKeyword = text.slice(index + keyword.length);

  return (
    <span className={className}>
      <span>
        {beforeKeyword}
      </span>
      <span className={keywordClassName}>{keyword}</span>
      <span>
        {afterKeyword}
      </span>
    </span>
  );
};

export default TextFormat;
