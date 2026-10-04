export const KEYWORDS = [
  "FROM",
  "WORKDIR",
  "COPY",
  "RUN",
  "EXPOSE",
  "CMD",
  "ENV",
  "ARG",
  "ENTRYPOINT",
  "ADD",
  "LABEL",
];

export const formatDockerfile = (content: string) => {
  return content.split("\n").map((line, idx) => {
    const trimmedLine = line.trim();

    if (trimmedLine.startsWith("#")) {
      return (
        <span key={idx} className="dockerfile-line dockerfile-comment">
          {line}
        </span>
      );
    }

    for (const keyword of KEYWORDS) {
      if (trimmedLine.startsWith(keyword)) {
        const parts = line.split(keyword);
        return (
          <span key={idx} className="dockerfile-line">
            {parts[0]}
            <span className="dockerfile-keyword">{keyword}</span>
            {parts[1]}
          </span>
        );
      }
    }

    return (
      <span key={idx} className="dockerfile-line">
        {line}
      </span>
    );
  });
};
