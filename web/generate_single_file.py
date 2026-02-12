#!/usr/bin/env python3
"""生成单文件HTML版本"""

# 读取CSS
with open('css/style.css', 'r', encoding='utf-8') as f:
    css_content = f.read()

# 读取JS
with open('js/main.js', 'r', encoding='utf-8') as f:
    js_content = f.read()

# 读取HTML模板并替换
with open('index.html', 'r', encoding='utf-8') as f:
    html_content = f.read()

# 替换外部引用为内联
html_content = html_content.replace(
    '<link rel="stylesheet" href="css/style.css">',
    f'<style>\n{css_content}\n</style>'
)

html_content = html_content.replace(
    '<script src="js/main.js"></script>',
    f'<script>\n{js_content}\n</script>'
)

# 写入单文件版本
with open('白银价格分析.html', 'w', encoding='utf-8') as f:
    f.write(html_content)

print("✅ 单文件版本已生成: 白银价格分析.html")
