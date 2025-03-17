import { useEffect, useState } from 'react';
import '../styles/components/code.scss';

const Code = () => {
  const codeLines = [
    'const Developer = () => {',
    '  const [skills, setSkills] = useState([',
    "    'React',",
    "    'TypeScript',",
    "    'Node.js',",
    "    'GSAP',",
    "    'Firebase'",
    '  ]);',
    '',
    '  return (',
    '    <Code>',
    '      <Note quality="high"/>',
    '    </Code>',
    '  );',
    '};'
  ];

  const [visibleLines, setVisibleLines] = useState<string[]>([]);
  const [currentLineIndex, setCurrentLineIndex] = useState(0);
  const [currentCharIndex, setCurrentCharIndex] = useState(0);

  useEffect(() => {
    if (currentLineIndex >= codeLines.length) return;

    const currentLine = codeLines[currentLineIndex];
    
    if (currentCharIndex >= currentLine.length) {
      const timer = setTimeout(() => {
        setCurrentLineIndex(prev => prev + 1);
        setCurrentCharIndex(0);
        setVisibleLines(prev => [...prev, currentLine]);
      }, 100);
      return () => clearTimeout(timer);
    }

    const timer = setTimeout(() => {
      setVisibleLines(prev => {
        const newLines = [...prev];
        if (newLines[currentLineIndex]) {
          newLines[currentLineIndex] = currentLine.slice(0, currentCharIndex + 1);
        } else {
          newLines[currentLineIndex] = currentLine.slice(0, currentCharIndex + 1);
        }
        return newLines;
      });
      setCurrentCharIndex(prev => prev + 1);
    }, 30);

    return () => clearTimeout(timer);
  }, [currentLineIndex, currentCharIndex]);

  const highlightSyntax = (text: string) => {
    return text
      .replace(/(const|useState|return)/g, '<span class="keyword">$1</span>')
      .replace(/(\[|\]|\{|\}|\(|\))/g, '<span class="bracket">$1</span>')
      .replace(/(Developer|skills|setSkills)/g, '<span class="function">$1</span>')
      .replace(/('[^']*')/g, '<span class="string">$1</span>')
      .replace(/(=>|=)/g, '<span class="operator">$1</span>');
  };

  return (
    <div className="code-content">
      {visibleLines.map((line, index) => (
        <div key={index} className="code-line">
          <span 
            className="line-content"
            dangerouslySetInnerHTML={{ __html: highlightSyntax(line) }}
          />
          {index === currentLineIndex && <span className="cursor">|</span>}
        </div>
      ))}
    </div>
  );
};

export default Code; 