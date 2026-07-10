const fs = require('fs');
try {
    const xml = fs.readFileSync('__docx_temp/word/document.xml', 'utf8');
    // Extract text inside <w:t> tags
    const regex = /<w:t[^>]*>(.*?)<\/w:t>/g;
    let match;
    let text = '';
    while ((match = regex.exec(xml)) !== null) {
        text += match[1] + '\n';
    }
    // Also handle simple text stripping for safety
    fs.writeFileSync('extracted_text.txt', text);
    console.log("Successfully extracted text!");
} catch (e) {
    console.error(e);
}
