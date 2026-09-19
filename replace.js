const fs = require('fs');
const path = require('path');

function walkDir(dir, callback) {
  fs.readdirSync(dir).forEach(f => {
    let dirPath = path.join(dir, f);
    let isDirectory = fs.statSync(dirPath).isDirectory();
    isDirectory ? walkDir(dirPath, callback) : callback(path.join(dir, f));
  });
}

walkDir('src/components', function(filePath) {
  if (filePath.endsWith('.js')) {
    let content = fs.readFileSync(filePath, 'utf8');
    
    // Replace the specific gradient block
    const gradientRegex = /background:\s*["']linear-gradient\(135deg,\s*#3b82f6,\s*#8b5cf6\)["'],\s*WebkitBackgroundClip:\s*["']text["'],\s*WebkitTextFillColor:\s*["']transparent["'],/g;
    content = content.replace(gradientRegex, 'color: isDark ? "#fff" : "#111",');
    
    // Replace remaining #3b82f6 references with #333 or var
    content = content.replace(/#3b82f6/g, 'var(--accent-light)');
    
    fs.writeFileSync(filePath, content, 'utf8');
  }
});
console.log('Replaced all blue colors.');
