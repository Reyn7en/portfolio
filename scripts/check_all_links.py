#!/usr/bin/env python3
"""
检查所有 HTML 页面的链接（包括页脚导航）
"""
import re
from pathlib import Path

ROOT = Path(__file__).parent.parent

def check_all_links():
    html_files = list(ROOT.rglob("*.html"))
    
    print("=" * 60)
    print("[CHECK] 检查所有 HTML 页面的链接")
    print("=" * 60)
    
    errors = []
    
    for html_file in sorted(html_files):
        rel_path = html_file.relative_to(ROOT)
        
        with open(html_file, 'r', encoding='utf-8') as f:
            content = f.read()
        
        # 提取所有链接
        links = re.findall(r'href="([^"]*)"', content)
        
        print(f"\n[FILE] {rel_path}")
        
        for link in links:
            # 跳过外部链接和锚点链接
            if link.startswith('http') or link.startswith('#') or link == '':
                continue
            
            # 计算目标文件的绝对路径
            target = (html_file.parent / link).resolve()
            
            # 检查目标文件是否存在
            if not target.exists():
                errors.append(f"[ERROR] {rel_path}\n    链接: {link}\n    目标不存在: {target}")
                print(f"  [ERROR] 链接不存在: {link}")
            else:
                print(f"  [OK] {link}")
    
    # 输出总结
    print("\n" + "=" * 60)
    print("[RESULT] 检查结果")
    print("=" * 60)
    
    if errors:
        print(f"\n[ERROR] 发现 {len(errors)} 个链接错误:\n")
        for e in errors:
            print(e)
            print()
    else:
        print("\n[PASS] 所有链接检查通过！")
    
    return len(errors)

if __name__ == "__main__":
    exit(0 if check_all_links() == 0 else 1)
