// Auto-generated code data for linux/page.tsx
// Contains all shell code snippets as exported string constants
// Uses double-quoted strings with \n to avoid SWC/TS template literal bugs

export const CODE_001 = "wsl --install"

export const CODE_002 = "# 备份原文件\nsudo cp /etc/apt/sources.list /etc/apt/sources.list.bak\n\n# 替换为清华源（Ubuntu 22.04 / jammy）\nsudo sed -i \"s@http://.*archive.ubuntu.com@https://mirrors.tuna.tsinghua.edu.cn@g\" /etc/apt/sources.list\nsudo sed -i \"s@http://.*security.ubuntu.com@https://mirrors.tuna.tsinghua.edu.cn@g\" /etc/apt/sources.list\n\n# 更新索引\nsudo apt update && sudo apt upgrade -y"

export const CODE_003 = "sudo apt install -y \\\\\n  build-essential \\\\\n  curl wget git \\\\\n  vim tmux \\\\\n  htop tree \\\\\n  net-tools iproute2 \\\\\n  software-properties-common \\\\\n  ca-certificates gnupg lsb-release"

export const CODE_004 = "git config --global user.name \"你的名字\"\ngit config --global user.email \"你的邮箱\"\ngit config --global core.editor \"vim\"\ngit config --global pull.rebase false"

export const CODE_005 = "cd /mnt/c/Users/你的用户名/\ncode /mnt/c/Users/你/Desktop/test.py"

export const CODE_006 = "# 安装 pyenv 编译依赖\nsudo apt install -y make build-essential libssl-dev zlib1g-dev \\\\\n  libbz2-dev libreadline-dev libsqlite3-dev \\\\\n  libncursesw5-dev xz-utils tk-dev libffi-dev liblzma-dev\n\n# 安装 pyenv\ncurl https://pyenv.run | bash\n\n# 添加到 ~/.bashrc（按提示加这三行）\nexport PYENV_ROOT=\"$HOME/.pyenv\"\nexport PATH=\"$PYENV_ROOT/bin:$PATH\"\neval \"$(pyenv init -)\"\n\nsource ~/.bashrc\n\n# 安装 Python\npyenv install 3.11.8\npyenv global 3.11.8"

export const CODE_007 = "# 清理旧版本（避免冲突）\nsudo apt remove docker docker.io containerd runc 2>/dev/null\n\n# 安装\ncurl -fsSL https://get.docker.com -o get-docker.sh\nsudo sh get-docker.sh\n\n# 免 sudo\nsudo usermod -aG docker $USER\n# 重新登录后生效\n\n# 验证\ndocker run hello-world"

export const CODE_008 = "[wsl2]\nmemory=8GB\nswap=4GB\nlocalhostForwarding=true"

export const CODE_009 = "curl -fsSL https://example.com/KEY.gpg | sudo gpg --dearmor -o /etc/apt/keyrings/example.gpg\necho \"deb [signed-by=/etc/apt/keyrings/example.gpg] https://example.com/ stable main\" \\\\\n  | sudo tee /etc/apt/sources.list.d/example.list"

export const CODE_010 = "pwd                  # 当前目录路径\nls -lah              # 详细列出（含隐藏文件、人类可读大小）\ncd ~                 # 回 home 目录\ncd -                 # 回到上一个目录\npushd /some/path     # 入栈并跳转\npopd                 # 出栈并跳转"

export const CODE_011 = "mkdir -p a/b/c       # 递归创建目录\nrm -rf dir           # 递归强制删除（⚠️ 慎用）\ncp -r src dst        # 递归复制\nmv old new           # 移动/重命名\nln -s target link    # 创建软链接\ntouch file.txt       # 新建空文件 / 更新时间戳\nfind . -name \"*.py\"  # 按名搜索文件\nfind . -mtime -1     # 近24小时修改过的文件\nfd pattern           # 更快的 find 替代（需安装 fd-find）"

export const CODE_012 = "cat file.txt         # 全量输出\nless file.log        # 分页浏览（q 退出、/搜索、n 下一处）\nhead -n 20 file      # 前 20 行\ntail -f app.log      # 实时追踪末尾\nwc -l file           # 统计行数\ndiff a.txt b.txt     # 对比差异\nvim file             # 编辑器"

export const CODE_013 = "chmod 755 script.sh   # rwxr-xr-x\nchmod +x script.sh    # 添加执行权限\nchown user:group file # 修改所有者\nls -l                 # 查看权限\numask 022             # 设置默认权限掩码"

export const CODE_014 = "ps aux | grep python  # 查找 Python 进程\nkill -9 PID           # 强制杀进程（先试 kill PID）\npkill -f \"python train.py\"  # 按命令行匹配杀\nhtop                  # 交互式进程浏览器\nbg / fg               # 后台/前台任务切换\njobs                  # 列出当前 shell 的后台任务\nnohup python train.py > log.txt 2>&1 &   # 后台跑，关终端不中断"

export const CODE_015 = "python train.py &   # 后台启动\nCtrl+Z               # 暂停当前前台任务\nbg %1                # 让 job 1 在后台继续\nfg %1                # 让 job 1 回到前台\ndisown -h %1         # 从 shell 的 job table 移除，关终端不被杀"

export const CODE_016 = "ping -c 4 google.com  # 连通性测试（发 4 个包）\ncurl -I https://api.example.com   # 只返回 HTTP 头\ncurl -X POST -H \"Content-Type: application/json\" -d '{\"k\":\"v\"}' url\nwget -c url           # 断点续传下载\nss -tlnp              # 查看监听端口\nip addr / ifconfig    # 查看 IP 地址\nip route              # 查看路由表\nnc -zv host port      # 测试端口是否通\ndig example.com       # DNS 查询\nlsof -i :8080         # 查看谁占用了 8080 端口"

export const CODE_017 = "grep \"error\" app.log           # 基础搜索\ngrep -r \"TODO\" src/              # 递归搜索目录\ngrep -i \"warning\" log            # 忽略大小写\ngrep -v \"DEBUG\" log              # 排除匹配行\ngrep -A 3 \"error\" log            # 显示匹配行及后 3 行\ngrep -c \"200\" access.log         # 只输出匹配行数\ngrep -E \"err(or|ing)\" log        # 扩展正则"

export const CODE_018 = "sed 's/foo/bar/' file           # 替换每行第一个 foo\nsed 's/foo/bar/g' file          # 全局替换\nsed -i 's/old/new/g' file       # 原地修改（⚠️ 先备份）\nsed '/pattern/d' file           # 删除匹配行\nsed -n '5,10p' file             # 只打印第 5-10 行\nsed 's/^/PREFIX: /' file        # 每行前面加前缀"

export const CODE_019 = "awk '{print $1, $3}' file       # 打印第 1、3 列\nawk -F ':' '{print $1}' /etc/passwd  # 指定分隔符\nawk '$3 > 100 {print $1}' file  # 条件过滤\nawk '{sum+=$2} END {print sum}'  # 求和\nawk '{count[$1]++} END {for(k in count) print k, count[k]}'  # 分组统计"

export const CODE_020 = "# 查找占用最高的 5 个目录\ndu -sh * | sort -rh | head -5\n\n# 统计 IP 访问次数排名\nawk '{print $1}' access.log | sort | uniq -c | sort -rn | head -10\n\n# 批量杀掉所有 python 进程\nps aux | grep python | awk '{print $2}' | xargs kill"

export const CODE_021 = "#!/bin/bash\n# 上面这行告诉系统用哪个解释器\n\n# 变量（等号两边不能有空格！）\nNAME=\"world\"\necho \"Hello, $NAME\"            # Hello, world\necho \"Hello, ${NAME}_suffix\"   # 用花括号避免歧义\n\n# 命令替换\nNOW=$(date +%Y-%m-%d)\nFILES=$(ls *.txt | wc -l)\necho \"Today: $NOW, .txt files: $FILES\"\n\n# 特殊变量\necho \"Script: $0\"\necho \"Arg1: $1, Arg2: $2\"\necho \"All args: $@\"\necho \"Arg count: $#\"\necho \"Exit code: $?\"            # 上一条命令的返回值"

export const CODE_022 = "STR=\"hello-world.py\"\necho ${STR%.py}       # hello-world  (去最短后缀)\necho ${STR##*.}       # py           (去最长前缀)\necho ${STR/-/_}       # hello_world.py (替换第一个)\necho ${STR//-/ }      # hello world.py (替换全部)\necho ${#STR}          # 15           (字符串长度)"

export const CODE_023 = "# 文件测试\nif [ -f \"config.yaml\" ]; then\n  echo \"config found\"\nelif [ -d \"data/\" ]; then\n  echo \"data dir exists\"\nelse\n  echo \"nothing found\"\nfi\n\n# 数值比较（中括号内两侧必须有空格！）\nif [ \"$COUNT\" -gt 10 ]; then\n  echo \"count > 10\"\nfi\n\n# 字符串比较\nif [ \"$MODE\" = \"train\" ]; then\n  echo \"training mode\"\nfi\n\n# 命令成败判断\nif command -v python3 &> /dev/null; then\n  echo \"python3 available\"\nfi"

export const CODE_024 = "# 遍历列表\nfor seed in 42 123 456; do\n  echo \"Running with seed $seed\"\n  python train.py --seed \"$seed\"\ndone\n\n# 遍历文件\nfor config in configs/*.yaml; do\n  echo \"Processing $config\"\n  python run.py --config \"$config\"\ndone\n\n# while 循环（逐行读文件）\nwhile IFS= read -r line; do\n  echo \"-> $line\"\ndone < input.txt\n\n# 无限循环 + 检测条件\nwhile true; do\n  sleep 3600\n  python check_gpu.py || break\ndone"

export const CODE_025 = "# 定义\nlog() {\n  local level=$1       # local 限制作用域\n  local msg=$2\n  echo \"[$(date '+%H:%M:%S')] [$level] $msg\"\n}\n\nlog \"INFO\" \"training started\"\n\n# 返回值（只能 0-255，0=成功）\ncheck_gpu() {\n  nvidia-smi &> /dev/null\n  return $?            # 返回 nvidia-smi 的退出码\n}\n\nif check_gpu; then\n  echo \"GPU available\"\nfi\n\n# 函数输出捕获\nget_gpu_count() {\n  nvidia-smi -L | wc -l\n}\n\nGPU_COUNT=$(get_gpu_count)\necho \"Found $GPU_COUNT GPU(s)\""

export const CODE_026 = "#!/bin/bash\n# run_experiments.sh — 遍历学习率跑实验\n\nLR_LIST=(1e-3 5e-4 1e-4 5e-5)\nSEEDS=(42 123 456)\n\nfor lr in \"${LR_LIST[@]}\"; do\n  for seed in \"${SEEDS[@]}\"; do\n    echo \"=== lr=$lr seed=$seed ===\"\n    python train.py \\\n      --lr \"$lr\" \\\n      --seed \"$seed\" \\\n      --output_dir \"outputs/lr${lr}_s${seed}\"\n  done\ndone"

export const CODE_027 = "#!/bin/bash\n# clean_logs.sh — 删除 N 天前的日志并报告大小\n\nDAYS=${1:-30}                # 默认 30 天\nDIR=${2:-logs}\n\necho \"Cleaning files older than $DAYS days in $DIR...\"\n\nSIZE_BEFORE=$(du -sh \"$DIR\" 2>/dev/null | cut -f1)\n\nfind \"$DIR\" -name \"*.log\" -mtime +\"$DAYS\" -delete\n\nSIZE_AFTER=$(du -sh \"$DIR\" 2>/dev/null | cut -f1)\necho \"Done. $DIR: $SIZE_BEFORE → $SIZE_AFTER\""

export const CODE_028 = "#!/bin/bash\n# wait_and_train.sh — 等待 GPU 显存低于阈值后启动训练\n\nTHRESHOLD_MB=${1:-2000}               # 默认 2GB\n\nwhile true; do\n  FREE=$(nvidia-smi --query-gpu=memory.free --format=csv,noheader,nounits | head -1)\n  if [ \"$FREE\" -gt \"$THRESHOLD_MB\" ]; then\n    echo \"[$(date)] GPU free: ${FREE}MB, starting training\"\n    python train.py --epochs 100\n    break\n  fi\n  echo \"[$(date)] GPU free: ${FREE}MB < ${THRESHOLD_MB}MB, waiting...\"\n  sleep 60\ndone"

export const CODE_029 = "# 编辑 crontab\ncrontab -e\n\n# 格式: 分 时 日 月 周 命令\n# ┌────── 分钟 (0-59)\n# │ ┌──── 小时 (0-23)\n# │ │ ┌── 日 (1-31)\n# │ │ │ ┌ 月 (1-12)\n# │ │ │ │ ┌ 星期 (0-7, 0=周日)\n# │ │ │ │ │\n# * * * * * command\n\n# 每天凌晨 2 点清理日志\n0 2 * * * /home/user/scripts/clean_logs.sh 7\n\n# 每小时检查一次 GPU 状态并记录\n0 * * * * nvidia-smi >> /home/user/logs/gpu_$(date +%Y%m%d).log\n\n# 每周一早上备份\n0 9 * * 1 tar -czf /backup/weekly_$(date +%Y%m%d).tar.gz /data/\n\n# 查看 cron 日志\ngrep CRON /var/log/syslog"

export const CODE_030 = "# 安装 Zsh\nsudo apt install -y zsh\n\n# 设为默认 shell\nchsh -s $(which zsh)\n\n# 重新登录后生效。验证：\necho $SHELL  # 应输出 /usr/bin/zsh"

export const CODE_031 = "sh -c \"$(curl -fsSL https://raw.githubusercontent.com/ohmyzsh/ohmyzsh/master/tools/install.sh)\""

export const CODE_032 = "# ~/.zshrc\nZSH_THEME=\"robbyrussell\"     # 内置主题，够用\n# ZSH_THEME=\"agnoster\"       # 需要 Powerline 字体\n\nplugins=(git docker python z history)  # 内置插件\n\n# 手动加载 Powerlevel10k（更美观的主题，可选）\n# git clone --depth=1 https://github.com/romkatv/powerlevel10k.git \\\\\n#   ${ZSH_CUSTOM:-$HOME/.oh-my-zsh/custom}/themes/powerlevel10k\n# ZSH_THEME=\"powerlevel10k/powerlevel10k\""

export const CODE_033 = "# 加到 ~/.zshrc\nalias l=\"ls -lah\"\nalias ..=\"cd ..\"\nalias ...=\"cd ../..\"\nalias gs=\"git status\"\nalias gp=\"git pull\"\nalias py=\"python\"\nalias venv=\"python -m venv venv && source venv/bin/activate\"\nalias gpu=\"watch -n 1 nvidia-smi\"\nalias dcs=\"docker compose ps\"\nalias dc=\"docker compose\""

export const CODE_034 = "# 会话管理\ntmux new -s dev          # 新建名为 dev 的会话\ntmux ls                  # 列出所有会话\ntmux attach -t dev       # 连接到 dev 会话\ntmux kill-session -t dev # 销毁会话\n\n# 快捷键（按完 Ctrl+b 松开，再按下一个键）\n# 面板\nCtrl+b %                 # 竖直分屏\nCtrl+b \"                 # 水平分屏\nCtrl+b 方向键            # 切换到相邻面板\nCtrl+b 按住方向键不放     # 调整面板大小\nCtrl+b x                 # 关闭当前面板\n\n# 窗口\nCtrl+b c                 # 新建窗口\nCtrl+b n / p             # 下一个/上一个窗口\nCtrl+b 数字              # 跳到指定窗口\nCtrl+b &                 # 关闭窗口\n\n# 滚动模式\nCtrl+b [                 # 进入滚动模式（用箭头/PgUp/PgDn 翻，q 退出）"

export const CODE_035 = "# ~/.tmux.conf\n# 允许鼠标操作（滚轮翻日志、点击切换面板）\nset -g mouse on\n\n# 从 1 开始编号（不用 0）\nset -g base-index 1\nsetw -g pane-base-index 1\n\n# 加快按键响应\nset -sg escape-time 0\n\n# 用 Alt+方向键 快速切换面板\nbind -n M-Left select-pane -L\nbind -n M-Right select-pane -R\n\n# 终端内 256 色支持\nset -g default-terminal \"screen-256color\""

export const CODE_036 = "git clone https://github.com/zsh-users/zsh-autosuggestions \\\\\n  ${ZSH_CUSTOM:-~/.oh-my-zsh/custom}/plugins/zsh-autosuggestions\n# 在 ~/.zshrc 的 plugins 里加入 zsh-autosuggestions"

export const CODE_037 = "git clone https://github.com/zsh-users/zsh-syntax-highlighting.git \\\\\n  ${ZSH_CUSTOM:-~/.oh-my-zsh/custom}/plugins/zsh-syntax-highlighting\n# 在 ~/.zshrc 的 plugins 里加入 zsh-syntax-highlighting"

export const CODE_038 = "sudo apt install fzf\n# Ctrl+T: 模糊搜索文件名并粘贴路径\n# Ctrl+R: 模糊搜索命令历史（比默认的 Ctrl+R 好用得多）\n# ** + Tab: 模糊补全路径"

export const CODE_039 = "# 本机生成 ED25519 密钥（比 RSA 更快更安全）\nssh-keygen -t ed25519 -C \"your_email@example.com\"\n# 一路回车即可，私钥: ~/.ssh/id_ed25519，公钥: ~/.ssh/id_ed25519.pub\n\n# 把公钥复制到服务器（两种方式）\n# 方式一：自动复制\nssh-copy-id user@server_ip\n\n# 方式二：手动追加\ncat ~/.ssh/id_ed25519.pub | ssh user@server_ip \"mkdir -p ~/.ssh && cat >> ~/.ssh/authorized_keys\"\n\n# 登入服务器，修改权限（必须！）\nchmod 700 ~/.ssh\nchmod 600 ~/.ssh/authorized_keys"

export const CODE_040 = "# 编辑 /etc/ssh/sshd_config\nPermitRootLogin no             # 禁止 root 直接登录\nPasswordAuthentication no      # 禁用密码登录（仅用密钥）\nPubkeyAuthentication yes       # 启用密钥认证\nPort 2222                      # 换成非标准端口（减少扫描）\n\n# 重启 SSH 服务\nsudo systemctl restart sshd"

export const CODE_041 = "# ~/.ssh/config\n\nHost myserver\n    HostName 192.168.1.100\n    User ubuntu\n    Port 2222\n    IdentityFile ~/.ssh/id_ed25519\n\nHost myserver-prod\n    HostName prod.example.com\n    User deploy\n    Port 22\n\nHost lab-gpu-*\n    User student\n    IdentityFile ~/.ssh/lab_key\n    StrictHostKeyChecking no     # 实验环境忽略指纹变化\n\n# 使用：ssh myserver 代替 ssh ubuntu@192.168.1.100 -p 2222"

export const CODE_042 = "# 把 remote 的 8888 端口映射到本机 8888\n# 本机浏览器访问 localhost:8888 即访问远程 Jupyter\nssh -L 8888:localhost:8888 user@remote"

export const CODE_043 = "# 在本地执行，把本机 3000 端口暴露到 remote 的 9000\nssh -R 9000:localhost:3000 user@remote\n# 在 remote 上访问 localhost:9000 即访问本机的 3000"

export const CODE_044 = "ssh -D 1080 user@remote\n# 浏览器设置 SOCKS 代理: localhost:1080\n# 本机所有流量通过 remote 出去"

export const CODE_045 = "# 通过 jump 跳转访问 target\nssh -J user@jump_host user@target_host\n\n# 或写在 config 里\nHost target\n    HostName 10.0.0.5\n    User ubuntu\n    ProxyJump jump_host"

export const CODE_046 = "# SCP：简单文件传输\nscp local_file user@server:/remote/path/        # 上传\nscp user@server:/remote/file ./local_dir/        # 下载\nscp -r local_dir user@server:/remote/            # 递归传目录\n\n# rsync：增量同步（推荐，比 SCP 快且支持断点续传）\nrsync -avzP ./data/ user@server:/data/            # 同步本地到远程\nrsync -avzP user@server:/data/ ./data/            # 同步远程到本地\n# -a: 归档模式 -v: 详细 -z: 压缩 -P: 进度+断点续传\n# --exclude='*.pyc' --exclude='__pycache__'        # 排除文件\n# --delete                                          # 删除目标端多余文件（慎用）"

export const CODE_047 = "sudo apt install htop -y\nhtop\n# F6 选择排序依据（CPU%、MEM%、TIME）\n# F9 杀进程\n# F5 切换成树状视图（看父子进程关系）"

export const CODE_048 = "free -h              # 内存总量、使用量、可用量\nvmstat 1 5           # 每秒刷新一次，共 5 次\n# si/so 列：如果不是 0，说明在用 swap（内存不够了）"

export const CODE_049 = "nvidia-smi                    # 一次性查看全部 GPU 状态\nnvidia-smi -l 1               # 每秒刷新（Ctrl+C 停止）\nwatch -n 1 nvidia-smi         # 同上，watch 也可以\nnvidia-smi -q -d MEMORY       # 只查显存详情\nnvidia-smi --query-gpu=timestamp,name,temperature.gpu,utilization.gpu,memory.used,memory.total \\\\\n  --format=csv -l 1           # 输出为 CSV 方便记录"

export const CODE_050 = "# 列出所有 GPU 上的进程\nnvidia-smi pmon -c 1          # 每 1 秒快照\n\n# 或直接用 fuser\nfuser -v /dev/nvidia*         # 列出所有访问 GPU 的进程\nls -la /dev/nvidia*"

export const CODE_051 = "pip install gpustat\ngpustat -i 1                  # 每秒刷新，彩色显示显存使用条\ngpustat -cp                   # 显示每个 GPU 上的进程（-c 彩色 -p 进程）\nwatch --color -n 1 gpustat --color"

export const CODE_052 = "df -h                # 各分区使用量\ndu -sh *             # 当前目录下各子目录大小\ndu -sh --max-depth=1 ~  # 家目录下一级子目录大小\nncdu                 # 交互式磁盘分析（需 apt install ncdu），比 du 直观\n\niostat -x 1          # 磁盘 IO 统计（需 apt install sysstat）\n# %util 接近 100% = IO 瓶颈\niotop                # 类似 htop，看谁在读写磁盘（需 sudo）"

export const CODE_053 = "ulimit -a              # 查看所有限制\nulimit -n 65536       # 设置最大文件描述符数（很多服务器程序需要）\nulimit -u 4096        # 最大用户进程数"

export const CODE_054 = "# 在代码里限制显存\nimport torch\ntorch.cuda.set_per_process_memory_fraction(0.5)  # 只用 50% 显存\ntorch.cuda.empty_cache()                          # 手动释放缓存\n\n# 设置环境变量（只对当前进程生效）\nexport CUDA_VISIBLE_DEVICES=0,1  # 只用 0 号和 1 号 GPU\nexport PYTORCH_CUDA_ALLOC_CONF=max_split_size_mb:128  # 减少显存碎片"

export const CODE_055 = "# 镜像\ndocker pull python:3.11-slim    # 拉取镜像\ndocker images                   # 列出本地镜像\ndocker rmi image_id             # 删除镜像\n\n# 容器\ndocker run -it --rm python:3.11 bash        # 启动交互式容器，退出自动删除\ndocker run -d --name myapp -p 8080:80 nginx  # 后台运行，端口映射\ndocker ps                        # 运行中的容器\ndocker ps -a                     # 所有容器（含已停止）\ndocker stop / start / restart myapp\ndocker rm myapp                  # 删除容器\ndocker logs -f myapp             # 实时查看日志\ndocker exec -it myapp bash       # 进入运行中的容器\n\n# 清理\ndocker system prune -a           # 清理所有未用的镜像/容器/网络\n# ⚠️ 会删除所有停止的容器和未引用的镜像"

export const CODE_056 = "docker run \\\\\n  -d --name myapp \\\\            # 后台运行 + 命名\n  --gpus all \\\\                 # 挂载所有 GPU\n  -p 8080:80 \\\\                 # 端口映射 宿主机:容器\n  -v /host/data:/app/data \\\\    # 挂载数据卷\n  -e ENV_VAR=value \\\\           # 环境变量\n  --shm-size=8g \\\\              # 共享内存大小（PyTorch 需要）\n  --restart=unless-stopped \\\\   # 崩溃自动重启\n  image:tag"

export const CODE_057 = "FROM python:3.11-slim\n\n# 设置工作目录\nWORKDIR /app\n\n# 先复制依赖文件（利用 Docker 层缓存）\nCOPY requirements.txt .\nRUN pip install --no-cache-dir -r requirements.txt\n\n# 再复制代码\nCOPY . .\n\n# 暴露端口\nEXPOSE 8000\n\n# 启动命令\nCMD [\"uvicorn\", \"main:app\", \"--host\", \"0.0.0.0\", \"--port\", \"8000\"]"

export const CODE_058 = "FROM pytorch/pytorch:2.5.1-cuda12.4-cudnn9-runtime  # 按需替换版本\n\nWORKDIR /workspace\n\n# 安装依赖\nCOPY requirements.txt .\nRUN pip install --no-cache-dir -r requirements.txt\n\nCOPY . .\n\n# 训练入口\nENTRYPOINT [\"python\", \"train.py\"]"

export const CODE_059 = "# docker-compose.yml\nservices:\n  api:\n    build: .\n    ports:\n      - \"8000:8000\"\n    volumes:\n      - ./data:/app/data\n    environment:\n      - REDIS_URL=redis://redis:6379\n      - DATABASE_URL=postgresql://postgres:postgres@db:5432/mydb\n    depends_on:\n      - redis\n      - db\n\n  redis:\n    image: redis:7-alpine\n    volumes:\n      - redis_data:/data\n\n  db:\n    image: postgres:16-alpine\n    environment:\n      POSTGRES_PASSWORD: postgres\n      POSTGRES_DB: mydb\n    volumes:\n      - pg_data:/var/lib/postgresql/data\n\nvolumes:\n  redis_data:\n  pg_data:"

export const CODE_060 = "docker compose up -d        # 后台启动所有服务\ndocker compose down          # 停止并删除容器\ndocker compose logs -f api   # 查看 api 服务的日志\ndocker compose ps            # 查看容器状态\ndocker compose build         # 重新构建镜像"

export const CODE_061 = "# 官方 PyTorch 镜像（推荐，按需替换版本）\npytorch/pytorch:2.5.1-cuda12.4-cudnn9-runtime  # 只跑推理/训练\npytorch/pytorch:2.5.1-cuda12.4-cudnn9-devel    # 需要编译 CUDA 扩展时用\n\n# NVIDIA 官方 CUDA 镜像（需要自己装 PyTorch）\nnvidia/cuda:12.1.0-cudnn8-runtime-ubuntu22.04"

export const CODE_062 = "# docker-compose.train.yml\nservices:\n  train:\n    image: pytorch/pytorch:2.5.1-cuda12.4-cudnn9-runtime  # 按需替换版本\n    working_dir: /workspace\n    volumes:\n      - ./:/workspace          # 挂载当前目录\n      - /data/datasets:/datasets:ro  # 数据集只读挂载\n    command: python train.py --epochs 100 --batch-size 64\n    deploy:\n      resources:\n        reservations:\n          devices:\n            - driver: nvidia\n              count: 1\n              capabilities: [gpu]\n    shm_size: \"8gb\"\n    environment:\n      - CUDA_VISIBLE_DEVICES=0"
