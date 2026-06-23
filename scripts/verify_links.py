#!/usr/bin/env python3
"""
链接验证脚本 - 检查所有 HTML 和 TSX 文件中的返回链接是否正确

使用方法:
  python3 scripts/verify_links.py
"""

import os
import re
from pathlib import Path

# 项目根目录
ROOT_DIR = Path(__file__).parent.parent

# 链接规则（从 FILE_STRUCTURE.md 中提取）
LINK_RULES = {
    # 一级页面（直接在主目录下）→ 返回到 preview.html
    "notes/index.html": "../preview.html",
    "work/index.html": "../preview.html",
    
    # 二级页面（在子目录下）→ 返回到 ../../preview.html
    "notes/agent/index.html": "../../preview.html",
    "work/agent/index.html": "../../preview.html",
    
    # 三级页面（在子子目录下）→ 返回到 ../index.html
    "notes/agent/langgraph/index.html": "../index.html",
    "notes/agent/state/index.html": "../index.html",
    "notes/agent/router-tool-calling/index.html": "../index.html",
    "notes/agent/react-loop/index.html": "../index.html",
    "notes/agent/memory-system/index.html": "../index.html",
    "notes/agent/human-in-the-loop/index.html": "../index.html",
    "notes/agent/multi-agent/index.html": "../index.html",
    "notes/agent/rag/index.html": "../index.html",
}

def extract_back_link(file_path):
    """从 HTML/TSX 文件中提取返回链接"""
    try:
        with open(file_path, 'r', encoding='utf-8') as f:
            content = f.read()
        
        # 匹配 HTML 中的返回链接
        # 示例: <a href="../../preview.html" class="back">← 返回首页</a>
        match = re.search(r'<a[^>]+href="([^"]*)"[^>]*class="back"', content)
        if match:
            return match.group(1)
        
        return None
    except Exception as e:
        print(f"[ERROR] 读取文件失败: {file_path} - {e}")
        return None

def verify_html_links():
    """验证所有 HTML 文件的返回链接"""
    print("[INFO] 验证 HTML 文件返回链接...\n")
    
    errors = []
    warnings = []
    
    for rel_path, expected_link in LINK_RULES.items():
        full_path = ROOT_DIR / rel_path
        
        if not full_path.exists():
            warnings.append(f"[WARN] 文件不存在: {rel_path}")
            continue
        
        actual_link = extract_back_link(full_path)
        
        if actual_link is None:
            errors.append(f"[ERROR] {rel_path} - 未找到返回链接")
        elif actual_link != expected_link:
            errors.append(f"[ERROR] {rel_path}\n    期望: {expected_link}\n    实际: {actual_link}")
        else:
            print(f"[PASS] {rel_path}")
    
    return errors, warnings

def verify_tsx_links():
    """验证所有 TSX 文件的返回链接（使用 router.back()）"""
    print("\n[INFO] 验证 TSX 文件返回链接...\n")
    
    errors = []
    warnings = []
    
    # TSX 文件使用 router.back()，不需要检查具体路径
    # 但我们可以检查是否使用了 SubPageLayout 组件
    tsx_dir = ROOT_DIR / "src/app"
    
    for tsx_file in tsx_dir.rglob("page.tsx"):
        rel_path = tsx_file.relative_to(ROOT_DIR)
        
        try:
            with open(tsx_file, 'r', encoding='utf-8') as f:
                content = f.read()
            
            # 检查是否使用了 SubPageLayout
            if 'SubPageLayout' in content:
                print(f"[PASS] {rel_path} (使用 SubPageLayout)")
            else:
                warnings.append(f"[WARN] {rel_path} - 未使用 SubPageLayout")
                
        except Exception as e:
            errors.append(f"[ERROR] 读取失败: {rel_path} - {e}")
    
    return errors, warnings

def main():
    print("=" * 60)
    print("[INFO] 链接验证工具")
    print("=" * 60)
    
    all_errors = []
    all_warnings = []
    
    # 验证 HTML 文件
    html_errors, html_warnings = verify_html_links()
    all_errors.extend(html_errors)
    all_warnings.extend(html_warnings)
    
    # 验证 TSX 文件
    tsx_errors, tsx_warnings = verify_tsx_links()
    all_errors.extend(tsx_errors)
    all_warnings.extend(tsx_warnings)
    
    # 输出结果
    print("\n" + "=" * 60)
    print("[RESULT] 验证结果")
    print("=" * 60)
    
    if all_warnings:
        print(f"\n[WARN] 警告（{len(all_warnings)} 个）:")
        for w in all_warnings:
            print(f"  {w}")
    
    if all_errors:
        print(f"\n[ERROR] 错误（{len(all_errors)} 个）:")
        for e in all_errors:
            print(f"  {e}")
        print("\n[TIP] 建议运行: python3 scripts/fix_links.py")
        return 1
    else:
        print("\n[PASS] 所有链接验证通过！")
        return 0

if __name__ == "__main__":
    exit(main())
