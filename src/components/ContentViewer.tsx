import { Lightbulb, AlertTriangle, CheckCircle, ArrowRight } from 'lucide-react';
import { CodeBlock } from './CodeBlock';
import { Badge } from '@/components/ui/badge';
import type { TutorialContent, TutorialSection } from '@/data/rustTutorial';

interface ContentViewerProps {
  section: TutorialSection;
  content: TutorialContent;
}

export function ContentViewer({ section, content }: ContentViewerProps) {
  return (
    <article className="content-viewer">
      {/* 面包屑导航 */}
      <nav className="content-breadcrumb">
        <span className="breadcrumb-section">{section.title}</span>
        <ArrowRight className="breadcrumb-separator w-4 h-4" />
        <span className="breadcrumb-content">{content.title}</span>
      </nav>
      
      {/* 标题 */}
      <header className="content-header">
        <h1 className="content-title">{content.title}</h1>
        <p className="content-description">{section.description}</p>
      </header>
      
      {/* 主要内容 */}
      <div className="content-body">
        {/* 解释部分 */}
        <section className="explanation-section">
          <div className="explanation-content">
            {content.explanation.split('\n\n').map((paragraph, index) => {
              // 检测是否为列表
              if (paragraph.startsWith('•') || paragraph.startsWith('-') || paragraph.startsWith('1.')) {
                const items = paragraph.split('\n').filter(line => line.trim());
                const isOrdered = items[0]?.match(/^\d+\./);
                
                if (isOrdered) {
                  return (
                    <ol key={index} className="explanation-list ordered">
                      {items.map((item, i) => (
                        <li key={i}>
                          <span dangerouslySetInnerHTML={{ 
                            __html: formatText(item.replace(/^\d+\.\s*/, '')) 
                          }} />
                        </li>
                      ))}
                    </ol>
                  );
                }
                
                return (
                  <ul key={index} className="explanation-list">
                    {items.map((item, i) => (
                      <li key={i}>
                        <span dangerouslySetInnerHTML={{ 
                          __html: formatText(item.replace(/^[•-]\s*/, '')) 
                        }} />
                      </li>
                    ))}
                  </ul>
                );
              }
              
              // 检测是否为代码块标记
              if (paragraph.startsWith('```')) {
                return null; // 代码块由 CodeBlock 组件处理
              }
              
              // 检测是否为标题
              if (paragraph.startsWith('**') && paragraph.endsWith('**') && paragraph.split('\n').length === 1) {
                return (
                  <h3 key={index} className="explanation-subtitle">
                    {paragraph.replace(/\*\*/g, '')}
                  </h3>
                );
              }
              
              return (
                <p 
                  key={index} 
                  className="explanation-paragraph"
                  dangerouslySetInnerHTML={{ __html: formatText(paragraph) }}
                />
              );
            })}
          </div>
        </section>
        
        {/* 代码示例 */}
        {content.code && (
          <section className="code-section">
            <h2 className="section-title">
              <Badge variant="secondary">代码示例</Badge>
            </h2>
            <CodeBlock 
              code={content.code} 
              language={content.language}
              output={content.output}
              showOutput={!!content.output}
            />
          </section>
        )}
        
        {/* 提示 */}
        {content.tips && content.tips.length > 0 && (
          <section className="tips-section">
            <div className="tips-header">
              <Lightbulb className="tips-icon w-5 h-5" />
              <h3>提示</h3>
            </div>
            <ul className="tips-list">
              {content.tips.map((tip, index) => (
                <li key={index} className="tip-item">
                  <CheckCircle className="tip-check w-4 h-4" />
                  <span>{tip}</span>
                </li>
              ))}
            </ul>
          </section>
        )}
        
        {/* 警告 */}
        {content.warnings && content.warnings.length > 0 && (
          <section className="warnings-section">
            <div className="warnings-header">
              <AlertTriangle className="warnings-icon w-5 h-5" />
              <h3>注意</h3>
            </div>
            <ul className="warnings-list">
              {content.warnings.map((warning, index) => (
                <li key={index} className="warning-item">
                  <AlertTriangle className="warning-triangle w-4 h-4" />
                  <span>{warning}</span>
                </li>
              ))}
            </ul>
          </section>
        )}
      </div>
    </article>
  );
}

// 格式化文本（处理粗体、行内代码等）
function formatText(text: string): string {
  return text
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    .replace(/`([^`]+)`/g, '<code class="inline-code">$1</code>');
}
