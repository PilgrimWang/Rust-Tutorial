import { useMemo, useState } from 'react';
import { Copy, Check, ExternalLink, Terminal, Play } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { buildRustPlaygroundUrl } from '@/lib/rustPlayground';

interface CodeBlockProps {
  code: string;
  language?: string;
  showOutput?: boolean;
  output?: string;
}

export function CodeBlock({ code, language = 'rust', showOutput = true, output }: CodeBlockProps) {
  const [copied, setCopied] = useState(false);
  const [playgroundOpen, setPlaygroundOpen] = useState(false);
  const isRust = language.toLowerCase() === 'rust';

  const playgroundUrl = useMemo(() => {
    if (!isRust) return null;
    return buildRustPlaygroundUrl(code);
  }, [code, isRust]);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // 简单的语法高亮
  const highlightCode = (code: string) => {
    const escapeHtml = (text: string) =>
      text
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;');

    const keywords = isRust
      ? [
          'fn', 'let', 'mut', 'const', 'static', 'if', 'else', 'match', 'loop', 'while', 'for', 'in',
          'return', 'break', 'continue', 'struct', 'enum', 'impl', 'trait', 'use', 'mod', 'pub',
          'self', 'Self', 'super', 'crate', 'where', 'move', 'async', 'await', 'unsafe', 'type',
          'ref', 'Box', 'Vec', 'Option', 'Result', 'Some', 'None', 'Ok', 'Err', 'String', 'str',
          'i8', 'i16', 'i32', 'i64', 'i128', 'isize', 'u8', 'u16', 'u32', 'u64', 'u128', 'usize',
          'f32', 'f64', 'bool', 'char', 'println', 'print', 'format', 'vec', 'assert', 'panic',
          'true', 'false', 'as',
        ]
      : [];

    const lines = code.split('\n');
    return lines.map((line, lineIndex) => {
      let processedLine = escapeHtml(line)
        // 处理字符串
        .replace(/"([^"\\]|\\.)*"/g, '<span class="code-string">$&</span>')
        // 处理字符
        .replace(/'([^'\\]|\\.)*'/g, '<span class="code-char">$&</span>')
        // 处理注释
        .replace(/(\/\/.*$)/g, '<span class="code-comment">$1</span>')
        // 处理数字
        .replace(/\b\d+(_?\d)*\b/g, '<span class="code-number">$&</span>');
      
      // 处理关键字
      if (keywords.length > 0) {
        keywords.forEach(keyword => {
          const regex = new RegExp(`\\b${keyword}\\b`, 'g');
          processedLine = processedLine.replace(regex, `<span class="code-keyword">${keyword}</span>`);
        });
      }
      
      return (
        <div key={lineIndex} className="code-line">
          <span className="code-line-number">{lineIndex + 1}</span>
          <span 
            className="code-content" 
            dangerouslySetInnerHTML={{ __html: processedLine || ' ' }}
          />
        </div>
      );
    });
  };

  return (
    <div className="code-block-wrapper">
      <div className="code-block-header">
        <div className="code-block-title">
          <Terminal className="w-4 h-4" />
          <span>{language.toUpperCase()}</span>
        </div>
        <div className="flex items-center gap-1">
          <Dialog open={playgroundOpen} onOpenChange={setPlaygroundOpen}>
            <DialogTrigger asChild>
              <Button
                variant="ghost"
                size="sm"
                disabled={!playgroundUrl}
                className="copy-button"
                title={playgroundUrl ? '在 Rust Playground 中运行并编辑' : '代码过长或非 Rust，无法自动打开 Playground'}
              >
                <ExternalLink className="w-4 h-4" />
                <span>在线运行</span>
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-5xl">
              <DialogHeader>
                <DialogTitle>Rust Playground</DialogTitle>
                <DialogDescription>
                  在线编辑并运行当前示例代码（由 play.rust-lang.org 提供）。
                </DialogDescription>
              </DialogHeader>

              {playgroundUrl ? (
                <iframe
                  title="Rust Playground"
                  src={playgroundUrl}
                  className="h-[70vh] w-full rounded-md border bg-background"
                  loading="lazy"
                  referrerPolicy="no-referrer"
                />
              ) : (
                <div className="text-sm text-muted-foreground">
                  该代码块无法自动打开 Playground（可能是代码过长或语言不是 Rust）。
                </div>
              )}

              <DialogFooter>
                {playgroundUrl && (
                  <Button asChild variant="outline" size="sm">
                    <a href={playgroundUrl} target="_blank" rel="noreferrer noopener">
                      <Play className="w-4 h-4" />
                      <span>新标签页打开</span>
                    </a>
                  </Button>
                )}
              </DialogFooter>
            </DialogContent>
          </Dialog>

          <Button
            variant="ghost"
            size="sm"
            onClick={handleCopy}
            className="copy-button"
          >
            {copied ? (
              <>
                <Check className="w-4 h-4" />
                <span>已复制</span>
              </>
            ) : (
              <>
                <Copy className="w-4 h-4" />
                <span>复制</span>
              </>
            )}
          </Button>
        </div>
      </div>
      
      <div className="code-block-content">
        <pre className="code-pre">
          <code>{highlightCode(code)}</code>
        </pre>
      </div>
      
      {showOutput && output && (
        <div className="output-section">
          <div className="output-header">
            <Play className="w-4 h-4" />
            <span>输出</span>
          </div>
          <pre className="output-content">{output}</pre>
        </div>
      )}
    </div>
  );
}
