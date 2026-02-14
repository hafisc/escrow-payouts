import os
import magic # Requires libmagic installed on system or python-magic-bin
import logging
import random
import re

logger = logging.getLogger(__name__)

class CodeScanner:
    def __init__(self, project_path: str):
        self.project_path = project_path
        self.vulnerabilities = []
        self.score = 100 # Start with perfect score
        self.language = "unknown"
        self.files_count = 0

    def _determine_language(self):
        # Scan dir for common extensions
        try:
             # Basic heuristic: Check extensions
            for root, dirs, files in os.walk(self.project_path):
                for file in files:
                    if file.endswith('.php'):
                        return "PHP (Laravel)"
                    if file.endswith('.js') or file.endswith('.jsx') or file.endswith('.ts') or file.endswith('.tsx'):
                        return "JavaScript/TypeScript"
                    if file.endswith('.py'):
                        return "Python"
            return "Mixed/Other"
        except FileNotFoundError:
            logger.warning("Project path not found, defaulting to Other")
            return "Other"

    def _scan_for_secrets(self, file_path: str):
        # Regex for common secrets
        patterns = {
            'aws_key': r'AKIA[0-9A-Z]{16}',
            'db_password': r'(password|passwd)\s*=\s*[\'"][^\'"]+[\'"]', # Rudimentary
            'api_key': r'(api_key|apikey|token)\s*=\s*[\'"][^\'"]+[\'"]'
        }

        try:
             # Only scan small text files for demo
             with open(file_path, 'r', errors='ignore') as f:
                 content = f.read(10000) # Read first 10KB
                 
                 for name, pattern in patterns.items():
                     if re.search(pattern, content, re.IGNORECASE):
                         self.vulnerabilities.append({
                             "type": "security",
                             "severity": "critical",
                             "file": os.path.basename(file_path),
                             "line": 0, # Placeholder
                             "description": f"Potential hardcoded secret detected: {name}"
                         })
                         self.score -= 20
        except Exception as e:
            logger.debug(f"Could not scan file {file_path}: {e}")

    def _check_dangerous_functions(self, file_path: str):
        # Scan for eval(), exec(), system() etc.
        patterns = {
            'eval': r'\beval\s*\(',
            'exec': r'\bexec\s*\(',
            'system': r'\bsystem\s*\('
        }
        
        try:
             with open(file_path, 'r', errors='ignore') as f:
                 content = f.read()
                 for func, pattern in patterns.items():
                     if re.search(pattern, content):
                         self.vulnerabilities.append({
                             "type": "security",
                             "severity": "high",
                             "file": os.path.basename(file_path),
                             "line": 0,
                             "description": f"Dangerous function usage: {func}()"
                         })
                         self.score -= 10
        except:
            pass


    def perform_audit(self):
        """
        Main execution flow.
        """
        logger.info(f"Starting audit for {self.project_path}")
        
        self.language = self._determine_language()
        
        # Traverse Files
        if os.path.exists(self.project_path):
            for root, dirs, files in os.walk(self.project_path):
                # Ignore node_modules, vendor, .git
                dirs[:] = [d for d in dirs if d not in ['node_modules', 'vendor', '.git', '__pycache__']]
                
                for file in files:
                    self.files_count += 1
                    full_path = os.path.join(root, file)
                    
                    # Size Check
                    if os.path.getsize(full_path) > 1024 * 1024:
                        continue # Skip > 1MB files

                    # File Type Check (Magic)
                    # mime = magic.from_file(full_path, mime=True)
                    # if 'text' in mime: ...

                    # Vulnerability Scans
                    self._scan_for_secrets(full_path)
                    self._check_dangerous_functions(full_path)
        else:
             # Mock Result if path doesn't exist (e.g. simulation)
             self.files_count = 10
             self.vulnerabilities.append({
                 "type": "quality",
                 "severity": "medium",
                 "file": "config.php",
                 "line": 12,
                 "description": "Mock Issue: Hardcoded DB credentials in config (Simulation)"
             })
             self.score = 85
             self.language = "PHP (Simulated)"

        # Normalize score
        self.score = max(0, self.score)
        
        status = "approved"
        if self.score < 50: status = "rejected"
        elif self.score < 80: status = "flagged"

        return {
            "project_name": os.path.basename(self.project_path) or "Uploaded Project",
            "language_detected": self.language,
            "quality_score": self.score,
            "vulnerabilities": self.vulnerabilities,
            "summary": f"Scanned {self.files_count} files. Found {len(self.vulnerabilities)} issues.",
            "status": status
        }
