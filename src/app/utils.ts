export const extractTextFromRichText = (desc: any): string => {
  if (!desc) return '';
  if (typeof desc === 'string') return desc;
  
  if (Array.isArray(desc)) {
    return desc
      .map(block => {
        if (block.children && Array.isArray(block.children)) {
          return block.children.map((c: any) => c.text || '').join('');
        }
        return '';
      })
      .join('\n');
  }
  
  return '';
};
