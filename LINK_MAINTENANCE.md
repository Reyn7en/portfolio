# 链接管理方案使用指南

> 为防止链接错误，项目现已引入文件结构表和链接验证机制。

---

## 一、文件说明

### 1.1 FILE_STRUCTURE.md
**路径**: `/portfolio/FILE_STRUCTURE.md`

**内容**:
- 所有页面的文件位置（静态 HTML + React 页面）
- 每个页面的访问路径和返回链接
- 链接规则说明（一级/二级/三级页面）

**何时更新**:
- 添加新页面时
- 修改页面路径时
- 链接规则变更时

---

### 1.2 scripts/verify_links.py
**路径**: `/portfolio/scripts/verify_links.py`

**功能**:
- 验证所有 HTML 文件的返回链接是否符合 `FILE_STRUCTURE.md` 中的规则
- 验证所有 TSX 文件是否使用了 `SubPageLayout` 组件
- 输出详细的验证结果（通过/警告/错误）

**使用方法**:
```bash
cd C:\Users\14688\WorkBuddy\2026-06-22-18-16-23\portfolio
python3 scripts/verify_links.py
```

**输出示例**:
```
============================================================
[INFO] 链接验证工具
============================================================
[INFO] 验证 HTML 文件返回链接...

[PASS] notes/agent/index.html
[PASS] notes/agent/langgraph/index.html
...

[INFO] 验证 TSX 文件返回链接...

[PASS] src/app/notes/agent/page.tsx (使用 SubPageLayout)
...

============================================================
[RESULT] 验证结果
============================================================

[WARN] 警告（3 个）:
  [WARN] 文件不存在: notes/index.html
  [WARN] 文件不存在: work/index.html
  [WARN] src/app/page.tsx - 未使用 SubPageLayout

[ERROR] 错误（1 个）:
  [ERROR] work/agent/index.html - 未找到返回链接

[TIP] 建议运行: python3 scripts/fix_links.py
```

---

## 二、工作流程

### 2.1 添加新页面时
1. 在 `FILE_STRUCTURE.md` 中添加新页面的记录
2. 创建页面文件（HTML 或 TSX）
3. 运行 `python3 scripts/verify_links.py` 验证链接
4. 如有错误，手动修复或运行修复脚本

### 2.2 修改现有页面时
1. 如果修改了返回链接，更新 `FILE_STRUCTURE.md`
2. 运行验证脚本
3. 确保通过后再提交

### 2.3 定期维护
- 建议每次部署前运行验证脚本
- 定期同步 React 页面和静态 HTML 的内容

---

## 三、链接规则速查

### 3.1 静态 HTML 返回链接
| 页面层级 | 返回链接示例 | 说明 |
|---------|--------------|------|
| 一级页面（主目录下） | `../preview.html` | 如 `notes/index.html` |
| 二级页面（子目录下） | `../../preview.html` | 如 `notes/agent/index.html` |
| 三级页面（子子目录下） | `../index.html` | 如 `notes/agent/langgraph/index.html` |

### 3.2 React 页面返回链接
- 使用 `router.back()` 或 `<Link href="...">`
- 参考 `FILE_STRUCTURE.md` 中的"返回链接"列

---

## 四、常见问题

### Q1: 验证脚本输出乱码怎么办？
**A**: Windows 命令行默认使用 GBK 编码，不支持 Unicode 字符。解决方法：
1. 在脚本中使用纯 ASCII 字符（已修改）
2. 或者设置命令行编码：`chcp 65001`

### Q2: 如何自动修复错误的链接？
**A**: 可以扩展 `scripts/fix_links.py`（待创建），自动根据 `FILE_STRUCTURE.md` 中的规则修复错误的返回链接。

### Q3: React 页面和静态 HTML 如何保持同步？
**A**: 目前需要手动同步。未来可以创建自动生成脚本：
1. 从 React 页面（`.tsx`）提取内容和链接
2. 自动生成对应的静态 HTML 文件
3. 确保两者内容一致

---

## 五、待办事项

- [ ] 创建 `scripts/fix_links.py` - 自动修复错误的链接
- [ ] 创建 `scripts/sync_html.py` - 从 React 页面自动生成静态 HTML
- [ ] 完善 `FILE_STRUCTURE.md` - 添加更多页面（如 `work/` 下的页面）
- [ ] 添加 pre-commit hook - 在 git 提交前自动运行验证脚本

---

## 六、更新记录

| 日期 | 更新内容 | 更新人 |
|------|---------|--------|
| 2026-06-23 | 初始版本，创建文件结构表和验证脚本 | AI Assistant |
