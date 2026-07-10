import React from 'react';

interface RichTextChild {
  type: string;
  text?: string;
  bold?: boolean;
  italic?: boolean;
  underline?: boolean;
  code?: boolean;
  children?: RichTextChild[];
}

interface RichTextBlock {
  type: string;
  children?: RichTextChild[];
}

interface RichTextRendererProps {
  content: RichTextBlock[] | string;
}

export function RichTextRenderer({ content }: RichTextRendererProps) {
  if (!content) return null;
  
  if (typeof content === 'string') {
    return <div className="whitespace-pre-wrap">{content}</div>;
  }

  if (Array.isArray(content)) {
    return (
      <div className="space-y-2">
        {content.map((block, blockIndex) => {
          if (block.type === 'paragraph') {
            if (!block.children || block.children.length === 0) {
              return <br key={`br-${blockIndex}`} />;
            }
            
            // Check if paragraph is entirely empty text nodes
            const isEmpty = block.children.every(child => child.text === '');
            if (isEmpty) {
              return <br key={`br-${blockIndex}`} />;
            }

            return (
              <p key={blockIndex}>
                {block.children.map((child, childIndex) => {
                  let TextNode: React.ReactNode = child.text;
                  
                  if (child.bold) TextNode = <strong key={`strong-${childIndex}`}>{TextNode}</strong>;
                  if (child.italic) TextNode = <em key={`em-${childIndex}`}>{TextNode}</em>;
                  if (child.underline) TextNode = <u key={`u-${childIndex}`}>{TextNode}</u>;
                  if (child.code) TextNode = <code key={`code-${childIndex}`} className="bg-gray-100 px-1 rounded">{TextNode}</code>;

                  return <React.Fragment key={childIndex}>{TextNode}</React.Fragment>;
                })}
              </p>
            );
          }
          
          // Fallback for other block types (can add lists, headings, etc. later if needed)
          return null;
        })}
      </div>
    );
  }

  return null;
}
