const fs = require('fs');

const path = "/Users/rogerrobinson/.gemini/antigravity/brain/193941b0-b286-4efd-b1c2-7a69f2e01717/.system_generated/steps/1703/content.md";

try {
  const content = fs.readFileSync(path, 'utf8');
  console.log("File length:", content.length);
  
  // Let's search for "HSB" or "Command"
  const regex = /[^<]{10,200}HSB[^<]{10,200}/gi;
  const matches = [];
  let match;
  while ((match = regex.exec(content)) !== null) {
    matches.push(match[0].trim());
    if (matches.length > 30) break;
  }
  console.log("Matches containing 'HSB':");
  console.log(matches);
  
  // Let's see if there is a big JSON blob of data block
  const jsonStarts = [...content.matchAll(/__notion_boot_data|__notion_html_async/g)];
  console.log("Found async blocks:", jsonStarts.map(m => m[0]));

} catch (err) {
  console.error("Error reading file:", err);
}
