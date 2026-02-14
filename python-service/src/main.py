from fastapi import FastAPI, Depends, Header, HTTPException, Request, Response, BackgroundTasks
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, ConfigDict
from .scanner import CodeScanner
import os
import uvicorn
import logging
from typing import Optional, List

# --- Configuration ---
API_KEY = os.getenv("AI_SERVICE_API_KEY", "secret-laravel-key-123")
ALLOWED_ORIGIN = os.getenv("ALLOWED_ORIGIN", "http://127.0.0.1:8000") # Laravel's IP
PORT = int(os.getenv("PORT", 8001))

# --- Logging Setup ---
logging.basicConfig(level=logging.INFO, format="%(asctime)s - %(levelname)s - %(message)s")
logger = logging.getLogger(__name__)

# --- FastAPI App ---
app = FastAPI(title="Escrowy AI Auditor", version="1.0.0")

# --- CORS ---
app.add_middleware(
    CORSMiddleware,
    allow_origins=[ALLOWED_ORIGIN],
    allow_credentials=True,
    allow_methods=["POST"],
    allow_headers=["*"],
)

# --- Dependency: API Key Validation ---
async def verify_api_key(x_api_key: str = Header(...)):
    if x_api_key != API_KEY:
        logger.warning(f"Unauthorized access attempt with key: {x_api_key}")
        raise HTTPException(status_code=403, detail="Invalid API Key")
    return x_api_key

# --- Pydantic Models ---
class Vulnerability(BaseModel):
    type: str # 'security' | 'quality ' | 'best_practice'
    severity: str # 'critical' | 'high' | 'medium' | 'low'
    file: str
    line: int
    description: str

class AuditResult(BaseModel):
    model_config = ConfigDict(protected_namespaces=())
    
    project_name: str
    language_detected: str
    quality_score: int # 0-100
    vulnerabilities: List[Vulnerability]
    summary: str
    status: str # 'approved' | 'rejected' | 'flagged'

# --- Endpoints ---

@app.get("/health")
def health_check():
    return {"status": "ok", "service": "Escrowy AI Auditor"}

@app.post("/v1/analyze", response_model=AuditResult, dependencies=[Depends(verify_api_key)])
async def analyze_project(
    background_tasks: BackgroundTasks,
    request: Request,
):
    """
    Analyzes a submitted project (mocked as path or raw content for now, 
    but designed to handle zip uploads in production).
    """
    
    # In a real scenario, we'd process the UploadFile here.
    # For this simulation (integrated with Laravel which sends a path or JSON):
    try:
        body = await request.json()
        project_path = body.get("path")
        
        if not project_path:
             raise HTTPException(status_code=400, detail="Path is required")

        logger.info(f"Received analysis request for: {project_path}")
        
        # Initialize Scanner
        scanner = CodeScanner(project_path)
        
        # Run Scan (Sync or Async)
        # Using background tasks for heavy lifting if we were just returning a Job ID.
        # But since Laravel awaits the response, we process it here.
        result = scanner.perform_audit()
        
        # Log completion
        logger.info(f"Analysis complete for {project_path}. Score: {result['quality_score']}")
        
        return result

    except Exception as e:
        logger.error(f"Error analyzing project: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))

if __name__ == "__main__":
    uvicorn.run("src.main:app", host="0.0.0.0", port=PORT, reload=True)
