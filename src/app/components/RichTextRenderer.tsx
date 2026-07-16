import React from 'react';

interface RichTextChild {
  type?: string;
  text?: string;
  bold?: boolean;
  italic?: boolean;
  underline?: boolean;
  strikethrough?: boolean;
  code?: boolean;
  url?: string;
  children?: RichTextChild[];
}

interface RichTextBlock {
  type: string;
  level?: number;
  format?: 'ordered' | 'unordered';
  children?: RichTextChild[];
}

interface RichTextRendererProps {
  content: RichTextBlock[] | string | null | undefined;
}

function renderChildren(children: RichTextChild[] = []): React.ReactNode {
  return children.map((child, i) => {
    // Link node
    if (child.type === 'link') {
      return (
        <a
          key={i}
          href={child.url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-[var(--color-primary)] underline hover:opacity-80 transition-opacity"
        >
          {renderChildren(child.children)}
        </a>
      );
    }

    let node: React.ReactNode = child.text ?? '';

    if (child.bold) node = <strong key={`b-${i}`} className="font-semibold text-[var(--color-text-primary)]">{node}</strong>;
    if (child.italic) node = <em key={`em-${i}`}>{node}</em>;
    if (child.underline) node = <u key={`u-${i}`}>{node}</u>;
    if (child.strikethrough) node = <s key={`s-${i}`}>{node}</s>;
    if (child.code) node = (
      <code
        key={`code-${i}`}
        className="bg-[var(--color-bg-elevated)] border border-[var(--color-bg-border)] text-[var(--color-primary)] text-[0.85em] px-1.5 py-0.5 rounded font-mono"
      >
        {node}
      </code>
    );

    return <React.Fragment key={i}>{node}</React.Fragment>;
  });
}

export function RichTextRenderer({ content }: RichTextRendererProps) {
  if (!content) return null;

  if (typeof content === 'string') {
    return <div className="whitespace-pre-wrap">{content}</div>;
  }

  if (!Array.isArray(content)) return null;

  return (
    <div className="space-y-4">
      {content.map((block, i) => {
        switch (block.type) {
          case 'paragraph': {
            const isEmpty = !block.children || block.children.every(c => c.text === '');
            if (isEmpty) return <br key={i} />;
            return (
              <p key={i} className="text-[var(--color-text-secondary)] leading-relaxed">
                {renderChildren(block.children)}
              </p>
            );
          }

          case 'heading': {
            const level = block.level ?? 2;
            const sizeMap: Record<number, string> = {
              1: 'text-[28px] md:text-[32px]',
              2: 'text-[22px] md:text-[26px]',
              3: 'text-[18px] md:text-[20px]',
              4: 'text-[16px] md:text-[18px]',
              5: 'text-[15px]',
              6: 'text-[14px]',
            };
            return (
              <div
                key={i}
                className={`font-bold text-[var(--color-text-primary)] mt-6 mb-2 ${sizeMap[level] ?? sizeMap[2]}`}
                style={{ letterSpacing: 'var(--tracking-tight)' }}
              >
                {renderChildren(block.children)}
              </div>
            );
          }

          case 'list': {
            const isOrdered = block.format === 'ordered';
            const Tag = isOrdered ? 'ol' : 'ul';
            return (
              <Tag
                key={i}
                className={`pl-5 space-y-1.5 text-[var(--color-text-secondary)] ${isOrdered ? 'list-decimal' : 'list-disc'}`}
              >
                {(block.children ?? []).map((item, j) => (
                  <li key={j} className="leading-relaxed">
                    {renderChildren(item.children)}
                  </li>
                ))}
              </Tag>
            );
          }

          case 'quote':
            return (
              <blockquote
                key={i}
                className="border-l-4 border-[var(--color-primary)] pl-4 py-1 italic text-[var(--color-text-secondary)] bg-[var(--color-bg-elevated)] rounded-r-[var(--radius-md)]"
              >
                {renderChildren(block.children)}
              </blockquote>
            );

          case 'code':
            return (
              <pre
                key={i}
                className="bg-[var(--color-bg-elevated)] border border-[var(--color-bg-border)] rounded-[var(--radius-lg)] p-4 overflow-x-auto font-mono text-[13px] text-[var(--color-text-secondary)]"
              >
                <code>{renderChildren(block.children)}</code>
              </pre>
            );

          case 'image': {
            const src = (block as any).image?.url;
            if (!src) return null;
            return (
              <img
                key={i}
                src={src}
                alt={(block as any).image?.alternativeText ?? ''}
                className="w-full rounded-[var(--radius-lg)] object-cover border border-[var(--color-bg-border)]"
              />
            );
          }

          default:
            return null;
        }
      })}
    </div>
  );
}
