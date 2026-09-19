import React, { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { FiTerminal, FiCopy, FiPlus, FiTrash2, FiBook } from "react-icons/fi";

const DEFAULT_COMMANDS = [
  // =========================
  // GIT COMMANDS
  // =========================
  { id: 'def-1', title: "Git Status", cmd: "git status", category: "Git" },
  { id: 'def-2', title: "Git Branches", cmd: "git branch", category: "Git" },
  { id: 'def-3', title: "Git Remote Branches", cmd: "git branch -r", category: "Git" },
  { id: 'def-4', title: "Git All Branches", cmd: "git branch -a", category: "Git" },
  { id: 'def-5', title: "Git Fetch All", cmd: "git fetch --all", category: "Git" },
  { id: 'def-6', title: "Git Fetch & Prune", cmd: "git fetch --prune", category: "Git" },
  { id: 'def-7', title: "Git Pull", cmd: "git pull", category: "Git" },
  { id: 'def-8', title: "Git Pull Rebase", cmd: "git pull --rebase", category: "Git" },
  { id: 'def-9', title: "Git Push", cmd: "git push", category: "Git" },
  { id: 'def-10', title: "Git Push New Branch", cmd: "git push -u origin branch-name", category: "Git" },
  { id: 'def-11', title: "Git Checkout Branch", cmd: "git checkout branch-name", category: "Git" },
  { id: 'def-12', title: "Git Create & Checkout", cmd: "git checkout -b new-branch", category: "Git" },
  { id: 'def-13', title: "Git Switch Branch", cmd: "git switch branch-name", category: "Git" },
  { id: 'def-14', title: "Git Create Branch", cmd: "git branch new-branch", category: "Git" },
  { id: 'def-15', title: "Git Merge Branch", cmd: "git merge branch-name", category: "Git" },
  { id: 'def-16', title: "Git Merge Abort", cmd: "git merge --abort", category: "Git" },
  { id: 'def-17', title: "Git Rebase", cmd: "git rebase branch-name", category: "Git" },
  { id: 'def-18', title: "Git Rebase Abort", cmd: "git rebase --abort", category: "Git" },
  { id: 'def-19', title: "Git Add All", cmd: "git add .", category: "Git" },
  { id: 'def-20', title: "Git Commit", cmd: "git commit -m 'commit message'", category: "Git" },
  { id: 'def-21', title: "Git Commit & Push", cmd: "git add . && git commit -m 'commit message' && git push", category: "Git" },
  { id: 'def-22', title: "Git Log", cmd: "git log --oneline --graph --decorate", category: "Git" },
  { id: 'def-23', title: "Git Diff", cmd: "git diff", category: "Git" },
  { id: 'def-24', title: "Git Stash", cmd: "git stash", category: "Git" },
  { id: 'def-25', title: "Git Stash Pop", cmd: "git stash pop", category: "Git" },
  { id: 'def-26', title: "Git Stash List", cmd: "git stash list", category: "Git" },
  { id: 'def-27', title: "Git Delete Branch (Local)", cmd: "git branch -d branch-name", category: "Git" },
  { id: 'def-28', title: "Git Force Delete Branch", cmd: "git branch -D branch-name", category: "Git" },
  { id: 'def-29', title: "Git Delete Remote Branch", cmd: "git push origin --delete branch-name", category: "Git" },
  { id: 'def-30', title: "Git Hard Reset", cmd: "git reset --hard HEAD", category: "Git" },
  { id: 'def-31', title: "Git Reset Last Commit", cmd: "git reset --soft HEAD~1", category: "Git" },
  { id: 'def-32', title: "Git Config User", cmd: "git config --global user.name 'Your Name'", category: "Git" },
  { id: 'def-33', title: "Git Config Email", cmd: "git config --global user.email 'you@example.com'", category: "Git" },
  { id: 'def-34', title: "Git Remotes", cmd: "git remote -v", category: "Git" },
  { id: 'def-35', title: "Git Add Remote", cmd: "git remote add origin url", category: "Git" },

  // =========================
  // NPM / NODE COMMANDS
  // =========================
  { id: 'def-36', title: "NPM Install", cmd: "npm install", category: "NPM" },
  { id: 'def-37', title: "NPM Install Package", cmd: "npm install package-name", category: "NPM" },
  { id: 'def-38', title: "NPM Dev Dependency", cmd: "npm install -D package-name", category: "NPM" },
  { id: 'def-39', title: "NPM Uninstall", cmd: "npm uninstall package-name", category: "NPM" },
  { id: 'def-40', title: "NPM Update", cmd: "npm update", category: "NPM" },
  { id: 'def-41', title: "NPM Outdated", cmd: "npm outdated", category: "NPM" },
  { id: 'def-42', title: "NPM List", cmd: "npm list --depth=0", category: "NPM" },
  { id: 'def-43', title: "NPM Clean Cache", cmd: "npm cache clean --force", category: "NPM" },
  { id: 'def-44', title: "NPM Audit", cmd: "npm audit", category: "NPM" },
  { id: 'def-45', title: "NPM Audit Fix", cmd: "npm audit fix", category: "NPM" },
  { id: 'def-46', title: "NPM Run Build", cmd: "npm run build", category: "NPM" },
  { id: 'def-47', title: "NPM Run Dev", cmd: "npm run dev", category: "NPM" },
  { id: 'def-48', title: "NPM Start", cmd: "npm start", category: "NPM" },
  { id: 'def-49', title: "Check Node Version", cmd: "node -v", category: "NPM" },
  { id: 'def-50', title: "Check NPM Version", cmd: "npm -v", category: "NPM" },

  // =========================
  // PM2 COMMANDS
  // =========================
  { id: 'def-51', title: "PM2 List", cmd: "pm2 list", category: "PM2" },
  { id: 'def-52', title: "PM2 Start App", cmd: "pm2 start app.js --name my-app", category: "PM2" },
  { id: 'def-53', title: "PM2 Start NPM", cmd: "pm2 start npm --name 'my-app' -- start", category: "PM2" },
  { id: 'def-54', title: "PM2 Restart App", cmd: "pm2 restart my-app", category: "PM2" },
  { id: 'def-55', title: "PM2 Restart All", cmd: "pm2 restart all", category: "PM2" },
  { id: 'def-56', title: "PM2 Stop App", cmd: "pm2 stop my-app", category: "PM2" },
  { id: 'def-57', title: "PM2 Stop All", cmd: "pm2 stop all", category: "PM2" },
  { id: 'def-58', title: "PM2 Delete App", cmd: "pm2 delete my-app", category: "PM2" },
  { id: 'def-59', title: "PM2 Logs", cmd: "pm2 logs", category: "PM2" },
  { id: 'def-60', title: "PM2 App Logs", cmd: "pm2 logs my-app", category: "PM2" },
  { id: 'def-61', title: "PM2 Monitor", cmd: "pm2 monit", category: "PM2" },
  { id: 'def-62', title: "PM2 Save", cmd: "pm2 save", category: "PM2" },
  { id: 'def-63', title: "PM2 Startup", cmd: "pm2 startup", category: "PM2" },
  { id: 'def-64', title: "PM2 Update", cmd: "pm2 update", category: "PM2" },

  // =========================
  // LINUX / SERVER COMMANDS
  // =========================
  { id: 'def-65', title: "System Monitor", cmd: "htop", category: "Linux" },
  { id: 'def-66', title: "Disk Space", cmd: "df -h", category: "Linux" },
  { id: 'def-67', title: "Folder Size", cmd: "du -sh *", category: "Linux" },
  { id: 'def-68', title: "Memory Usage", cmd: "free -h", category: "Linux" },
  { id: 'def-69', title: "CPU Info", cmd: "lscpu", category: "Linux" },
  { id: 'def-70', title: "Running Processes", cmd: "ps aux", category: "Linux" },
  { id: 'def-71', title: "Current Directory", cmd: "pwd", category: "Linux" },
  { id: 'def-72', title: "List Files", cmd: "ls -la", category: "Linux" },
  { id: 'def-73', title: "Find File", cmd: "find . -name 'filename'", category: "Linux" },
  { id: 'def-74', title: "Kill Process", cmd: "kill -9 PID", category: "Linux" },
  { id: 'def-75', title: "Check Ports", cmd: "ss -tulpn", category: "Linux" },
  { id: 'def-76', title: "Check Service", cmd: "systemctl status service-name", category: "Linux" },
  { id: 'def-77', title: "Restart Service", cmd: "sudo systemctl restart service-name", category: "Linux" },
  { id: 'def-78', title: "System Logs", cmd: "journalctl -xe", category: "Linux" },

  // =========================
  // NGINX COMMANDS
  // =========================
  { id: 'def-79', title: "Nginx Status", cmd: "sudo systemctl status nginx", category: "Nginx" },
  { id: 'def-80', title: "Nginx Restart", cmd: "sudo systemctl restart nginx", category: "Nginx" },
  { id: 'def-81', title: "Nginx Reload", cmd: "sudo systemctl reload nginx", category: "Nginx" },
  { id: 'def-82', title: "Nginx Test Config", cmd: "sudo nginx -t", category: "Nginx" },
  { id: 'def-83', title: "Nginx Access Logs", cmd: "sudo tail -f /var/log/nginx/access.log", category: "Nginx" },
  { id: 'def-84', title: "Nginx Error Logs", cmd: "sudo tail -f /var/log/nginx/error.log", category: "Nginx" },

  // =========================
  // DOCKER COMMANDS
  // =========================
  { id: 'def-85', title: "Docker Containers", cmd: "docker ps", category: "Docker" },
  { id: 'def-86', title: "All Docker Containers", cmd: "docker ps -a", category: "Docker" },
  { id: 'def-87', title: "Docker Images", cmd: "docker images", category: "Docker" },
  { id: 'def-88', title: "Docker Build", cmd: "docker build -t my-app .", category: "Docker" },
  { id: 'def-89', title: "Docker Run", cmd: "docker run -d -p 3000:3000 my-app", category: "Docker" },
  { id: 'def-90', title: "Docker Stop", cmd: "docker stop container-name", category: "Docker" },
  { id: 'def-91', title: "Docker Restart", cmd: "docker restart container-name", category: "Docker" },
  { id: 'def-92', title: "Docker Logs", cmd: "docker logs -f container-name", category: "Docker" },
  { id: 'def-93', title: "Docker Cleanup", cmd: "docker system prune", category: "Docker" },

  // =========================
  // AWS COMMANDS
  // =========================
  { id: 'def-94', title: "AWS S3 List", cmd: "aws s3 ls", category: "AWS" },
  { id: 'def-95', title: "AWS S3 Sync Upload", cmd: "aws s3 sync ./local s3://bucket-name", category: "AWS" },
  { id: 'def-96', title: "AWS S3 Sync Download", cmd: "aws s3 sync s3://bucket-name ./local", category: "AWS" },
  { id: 'def-97', title: "AWS S3 Copy", cmd: "aws s3 cp file.txt s3://bucket-name/", category: "AWS" },
  { id: 'def-98', title: "AWS EC2 Instances", cmd: "aws ec2 describe-instances", category: "AWS" },
  { id: 'def-99', title: "AWS Identity", cmd: "aws sts get-caller-identity", category: "AWS" },

  // =========================
  // SSL / CERTBOT
  // =========================
  { id: 'def-100', title: "Certbot Certificates", cmd: "sudo certbot certificates", category: "SSL" },
  { id: 'def-101', title: "Certbot Renew", cmd: "sudo certbot renew", category: "SSL" },
  { id: 'def-102', title: "Certbot Test Renew", cmd: "sudo certbot renew --dry-run", category: "SSL" },

  // =========================
  // NETWORK / DEBUG
  // =========================
  { id: 'def-103', title: "Check IP", cmd: "curl ifconfig.me", category: "Network" },
  { id: 'def-104', title: "Ping Server", cmd: "ping google.com", category: "Network" },
  { id: 'def-105', title: "Curl URL", cmd: "curl -I https://example.com", category: "Network" },
  { id: 'def-106', title: "Check DNS", cmd: "nslookup example.com", category: "Network" },
  { id: 'def-107', title: "Check Port", cmd: "nc -zv localhost 3000", category: "Network" },

    // =========================
  // NODE.JS / AWS DEPLOYMENT
  // =========================

  {
    id: 'def-108',
    title: "Update Ubuntu",
    cmd: "sudo apt update && sudo apt upgrade -y",
    category: "Deployment Guide"
  },

  {
    id: 'def-109',
    title: "Install Git",
    cmd: "sudo apt install git -y",
    category: "Deployment Guide"
  },

  {
    id: 'def-110',
    title: "Install Node.js LTS",
    cmd: "curl -fsSL https://deb.nodesource.com/setup_lts.x | sudo -E bash - && sudo apt install -y nodejs",
    category: "Deployment Guide"
  },

  {
    id: 'def-111',
    title: "Check Node & NPM",
    cmd: "node -v && npm -v",
    category: "Deployment Guide"
  },

  {
    id: 'def-112',
    title: "Install PM2",
    cmd: "sudo npm install -g pm2",
    category: "Deployment Guide"
  },

  {
    id: 'def-113',
    title: "Clone GitHub Project",
    cmd: "git clone https://github.com/USERNAME/REPOSITORY.git",
    category: "Deployment Guide"
  },

  {
    id: 'def-114',
    title: "Enter Project",
    cmd: "cd REPOSITORY",
    category: "Deployment Guide"
  },

  {
    id: 'def-115',
    title: "Install Project Dependencies",
    cmd: "npm ci",
    category: "Deployment Guide"
  },

  {
    id: 'def-116',
    title: "Create Production ENV",
    cmd: "nano .env",
    category: "Deployment Guide"
  },

  {
    id: 'def-117',
    title: "Build Node Project",
    cmd: "npm run build",
    category: "Deployment Guide"
  },

  {
    id: 'def-118',
    title: "Start Node App with PM2",
    cmd: "pm2 start npm --name my-app -- start",
    category: "Deployment Guide"
  },

  {
    id: 'def-119',
    title: "Check PM2 App",
    cmd: "pm2 status",
    category: "Deployment Guide"
  },

  {
    id: 'def-120',
    title: "Check PM2 Logs",
    cmd: "pm2 logs my-app",
    category: "Deployment Guide"
  },

  {
    id: 'def-121',
    title: "Save PM2 Process",
    cmd: "pm2 save",
    category: "Deployment Guide"
  },

  {
    id: 'def-122',
    title: "Enable PM2 Startup",
    cmd: "pm2 startup",
    category: "Deployment Guide"
  },

  {
    id: 'def-123',
    title: "Create Swap 2GB",
    cmd: "sudo fallocate -l 2G /swapfile && sudo chmod 600 /swapfile && sudo mkswap /swapfile && sudo swapon /swapfile",
    category: "Deployment Guide"
  },

  {
    id: 'def-124',
    title: "Check Swap",
    cmd: "free -h",
    category: "Deployment Guide"
  },

  {
    id: 'def-125',
    title: "Make Swap Permanent",
    cmd: "echo '/swapfile none swap sw 0 0' | sudo tee -a /etc/fstab",
    category: "Deployment Guide"
  },

  {
    id: 'def-126',
    title: "Install Nginx",
    cmd: "sudo apt install nginx -y",
    category: "Deployment Guide"
  },

  {
    id: 'def-127',
    title: "Create Nginx Config",
    cmd: "sudo nano /etc/nginx/sites-available/my-app",
    category: "Deployment Guide"
  },

  {
    id: 'def-128',
    title: "Enable Nginx Site",
    cmd: "sudo ln -s /etc/nginx/sites-available/my-app /etc/nginx/sites-enabled/",
    category: "Deployment Guide"
  },

  {
    id: 'def-129',
    title: "Test Nginx",
    cmd: "sudo nginx -t",
    category: "Deployment Guide"
  },

  {
    id: 'def-130',
    title: "Reload Nginx",
    cmd: "sudo systemctl reload nginx",
    category: "Deployment Guide"
  },

  {
    id: 'def-131',
    title: "Install Certbot",
    cmd: "sudo apt install certbot python3-certbot-nginx -y",
    category: "Deployment Guide"
  },

  {
    id: 'def-132',
    title: "Enable HTTPS",
    cmd: "sudo certbot --nginx -d example.com -d www.example.com",
    category: "Deployment Guide"
  },

  {
    id: 'def-133',
    title: "Test SSL Renewal",
    cmd: "sudo certbot renew --dry-run",
    category: "Deployment Guide"
  },

  {
    id: 'def-134',
    title: "Deploy Latest GitHub Changes",
    cmd: "git pull origin main && npm ci && npm run build && pm2 restart my-app",
    category: "Deployment Guide"
  },

  {
    id: 'def-135',
    title: "Full Deployment Restart",
    cmd: "git pull origin main && npm ci && npm run build && pm2 restart my-app && pm2 save",
    category: "Deployment Guide"
  },
];

export default function DevCommands({ mode }) {
  const [customCommands, setCustomCommands] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [newTitle, setNewTitle] = useState("");
  const [newCmd, setNewCmd] = useState("");
  const [newCategory, setNewCategory] = useState("Custom");

  useEffect(() => {
    const saved = localStorage.getItem("customDevCommands");
    if (saved) {
      setCustomCommands(JSON.parse(saved));
    }
  }, []);

  const saveCommands = (cmds) => {
    setCustomCommands(cmds);
    localStorage.setItem("customDevCommands", JSON.stringify(cmds));
  };

  const handleCopy = (cmd) => {
    navigator.clipboard.writeText(cmd);
    toast.success("Command copied!");
  };

  const handleAdd = () => {
    if (!newTitle || !newCmd) {
      toast.error("Title and Command are required!");
      return;
    }
    const newEntry = {
      id: Date.now(),
      title: newTitle,
      cmd: newCmd,
      category: newCategory
    };
    saveCommands([...customCommands, newEntry]);
    setNewTitle("");
    setNewCmd("");
    toast.success("Command added!");
  };

  const handleDelete = (id) => {
    if (window.confirm("Delete this custom command?")) {
      saveCommands(customCommands.filter(c => c.id !== id));
      toast.success("Command deleted!");
    }
  };

  const isDark = mode === "dark";
  const allCommands = [...DEFAULT_COMMANDS, ...customCommands];
  
  const categories = ["All", ...new Set(allCommands.map(c => c.category))];
  const filteredCommands = selectedCategory === "All" 
    ? allCommands 
    : allCommands.filter(c => c.category === selectedCategory);

  return (
    <div className="premium-card">
      <div className="d-flex align-items-center gap-2 mb-4">
        <FiTerminal size={28} style={{ color: isDark ? "#fff" : "#111" }} />
        <h2 className="mb-0" style={{ color: isDark ? "#fff" : "#111", fontWeight: "700" }}>
          Developer Commands
        </h2>
      </div>

      <div 
        className="d-flex gap-2 mb-4 pb-2" 
        style={{ overflowX: "auto", whiteSpace: "nowrap", scrollbarWidth: "thin" }}
      >
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`modern-btn btn-sm ${selectedCategory === cat ? 'modern-btn-primary' : 'modern-btn-secondary'}`}
            style={{ borderRadius: "20px", padding: "0.4rem 1rem" }}
          >
            {cat}
          </button>
        ))}
      </div>

      <div 
        className="row g-4 mb-4" 
        style={{ 
          maxHeight: "500px", 
          overflowY: "auto", 
          overflowX: "hidden",
          paddingRight: "5px"
        }}
      >
        {filteredCommands.map((c) => (
          <div key={c.id} className="col-md-6 col-lg-4">
            <div 
              className="p-3 rounded h-100 d-flex flex-column" 
              style={{ 
                background: isDark ? "rgba(255,255,255,0.03)" : "rgba(0,0,0,0.02)",
                border: isDark ? "1px solid rgba(255,255,255,0.1)" : "1px solid rgba(0,0,0,0.1)"
              }}
            >
              <div className="d-flex justify-content-between mb-2">
                <span className="badge" style={{ background: isDark ? "#333" : "#e2e8f0", color: isDark ? "#fff" : "#000" }}>{c.category}</span>
                {c.category === "Custom" && typeof c.id === "number" && (
                  <FiTrash2 style={{ cursor: "pointer", color: "#ef4444" }} onClick={() => handleDelete(c.id)} />
                )}
              </div>
              <h6 className="fw-bold mb-2">{c.title}</h6>
              <div 
                className="mt-auto d-flex justify-content-between align-items-center p-2 rounded"
                style={{ background: isDark ? "#000" : "#fff", border: isDark ? "1px solid #333" : "1px solid #ddd" }}
              >
                <code style={{ color: isDark ? "#10b981" : "#059669", fontSize: "0.85rem", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{c.cmd}</code>
                <FiCopy style={{ cursor: "pointer", marginLeft: "10px", flexShrink: 0 }} onClick={() => handleCopy(c.cmd)} />
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-4 pt-4" style={{ borderTop: isDark ? "1px solid #333" : "1px solid #ddd" }}>
        <h5 className="mb-3 d-flex align-items-center gap-2"><FiBook /> Add Custom Command</h5>
        <div className="d-flex flex-wrap gap-2">
          <input 
            type="text" 
            className="modern-input flex-grow-1" 
            placeholder="Title (e.g. Docker Build)" 
            value={newTitle} 
            onChange={e => setNewTitle(e.target.value)} 
          />
          <input 
            type="text" 
            className="modern-input flex-grow-1" 
            placeholder="Command (e.g. docker build -t img .)" 
            value={newCmd} 
            onChange={e => setNewCmd(e.target.value)} 
          />
          <button className="modern-btn modern-btn-primary" onClick={handleAdd}>
            <FiPlus /> Add
          </button>
        </div>
      </div>
    </div>
  );
}
