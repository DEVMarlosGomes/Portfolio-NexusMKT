from fastapi import FastAPI, APIRouter, HTTPException
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
from pathlib import Path
from pydantic import BaseModel, Field, ConfigDict
from typing import List, Optional
from enum import Enum
import uuid
from datetime import datetime, timezone


ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# MongoDB connection
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

# Create the main app without a prefix
app = FastAPI()

# Create a router with the /api prefix
api_router = APIRouter(prefix="/api")


# Enums
class UserRole(str, Enum):
    ADMIN = "admin"
    GERENTE = "gerente"
    USUARIO = "usuario"

class TaskStatus(str, Enum):
    PENDENTE = "pendente"
    EM_PROGRESSO = "em_progresso"
    CONCLUIDA = "concluida"
    CANCELADA = "cancelada"


# Define Models
class StatusCheck(BaseModel):
    model_config = ConfigDict(extra="ignore")  # Ignore MongoDB's _id field
    
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    client_name: str
    timestamp: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))


# User Models
class User(BaseModel):
    model_config = ConfigDict(extra="ignore")
    
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
    email: str
    role: UserRole
    sector_id: Optional[str] = None
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))


class UserCreate(BaseModel):
    name: str
    email: str
    role: UserRole
    sector_id: Optional[str] = None


# Sector Models
class Sector(BaseModel):
    model_config = ConfigDict(extra="ignore")
    
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
    description: Optional[str] = None
    manager_id: str
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))


class SectorCreate(BaseModel):
    name: str
    description: Optional[str] = None
    manager_id: str


# Task Models
class Task(BaseModel):
    model_config = ConfigDict(extra="ignore")
    
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    title: str
    description: Optional[str] = None
    sector_id: str
    assigned_to: Optional[str] = None
    assigned_by: str
    status: TaskStatus = TaskStatus.PENDENTE
    priority: str = "media"  # baixa, media, alta
    due_date: Optional[datetime] = None
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))
    updated_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))


class TaskCreate(BaseModel):
    title: str
    description: Optional[str] = None
    sector_id: str
    assigned_to: Optional[str] = None
    priority: str = "media"
    due_date: Optional[datetime] = None


class TaskUpdate(BaseModel):
    title: Optional[str] = None
    description: Optional[str] = None
    assigned_to: Optional[str] = None
    status: Optional[TaskStatus] = None
    priority: Optional[str] = None
    due_date: Optional[datetime] = None

class StatusCheckCreate(BaseModel):
    client_name: str


# ==================== SECTORS ENDPOINTS ====================

@api_router.post("/sectors", response_model=Sector)
async def create_sector(sector: SectorCreate):
    """Criar um novo setor (apenas admin)"""
    sector_dict = sector.model_dump()
    sector_obj = Sector(**sector_dict)
    
    doc = sector_obj.model_dump()
    doc['created_at'] = doc['created_at'].isoformat()
    
    result = await db.sectors.insert_one(doc)
    sector_obj.id = str(result.inserted_id)
    return sector_obj


@api_router.get("/sectors", response_model=List[Sector])
async def get_sectors():
    """Obter todos os setores"""
    sectors = await db.sectors.find({}, {"_id": 0}).to_list(1000)
    
    for sector in sectors:
        if isinstance(sector['created_at'], str):
            sector['created_at'] = datetime.fromisoformat(sector['created_at'])
    
    return sectors


@api_router.get("/sectors/{sector_id}", response_model=Sector)
async def get_sector(sector_id: str):
    """Obter um setor específico"""
    sector = await db.sectors.find_one({"id": sector_id}, {"_id": 0})
    
    if not sector:
        raise HTTPException(status_code=404, detail="Setor não encontrado")
    
    if isinstance(sector['created_at'], str):
        sector['created_at'] = datetime.fromisoformat(sector['created_at'])
    
    return sector


# ==================== USERS ENDPOINTS ====================

@api_router.post("/users", response_model=User)
async def create_user(user: UserCreate):
    """Criar um novo usuário"""
    user_dict = user.model_dump()
    user_obj = User(**user_dict)
    
    doc = user_obj.model_dump()
    doc['created_at'] = doc['created_at'].isoformat()
    
    result = await db.users.insert_one(doc)
    user_obj.id = str(result.inserted_id)
    return user_obj


@api_router.get("/users", response_model=List[User])
async def get_users():
    """Obter todos os usuários"""
    users = await db.users.find({}, {"_id": 0}).to_list(1000)
    
    for user in users:
        if isinstance(user['created_at'], str):
            user['created_at'] = datetime.fromisoformat(user['created_at'])
    
    return users


@api_router.get("/users/sector/{sector_id}", response_model=List[User])
async def get_users_by_sector(sector_id: str):
    """Obter usuários de um setor específico"""
    users = await db.users.find({"sector_id": sector_id}, {"_id": 0}).to_list(1000)
    
    for user in users:
        if isinstance(user['created_at'], str):
            user['created_at'] = datetime.fromisoformat(user['created_at'])
    
    return users


@api_router.get("/users/{user_id}", response_model=User)
async def get_user(user_id: str):
    """Obter um usuário específico"""
    user = await db.users.find_one({"id": user_id}, {"_id": 0})
    
    if not user:
        raise HTTPException(status_code=404, detail="Usuário não encontrado")
    
    if isinstance(user['created_at'], str):
        user['created_at'] = datetime.fromisoformat(user['created_at'])
    
    return user


# ==================== TASKS ENDPOINTS ====================

@api_router.post("/tasks", response_model=Task)
async def create_task(task: TaskCreate, assigned_by: str):
    """Criar uma nova tarefa (apenas gerente ou admin do setor)"""
    task_dict = task.model_dump()
    task_dict['assigned_by'] = assigned_by
    
    task_obj = Task(**task_dict)
    
    doc = task_obj.model_dump()
    doc['created_at'] = doc['created_at'].isoformat()
    doc['updated_at'] = doc['updated_at'].isoformat()
    if doc['due_date']:
        doc['due_date'] = doc['due_date'].isoformat()
    
    result = await db.tasks.insert_one(doc)
    task_obj.id = str(result.inserted_id)
    return task_obj


@api_router.get("/tasks/sector/{sector_id}", response_model=List[Task])
async def get_tasks_by_sector(sector_id: str):
    """Obter todas as tarefas de um setor"""
    tasks = await db.tasks.find({"sector_id": sector_id}, {"_id": 0}).to_list(1000)
    
    for task in tasks:
        if isinstance(task['created_at'], str):
            task['created_at'] = datetime.fromisoformat(task['created_at'])
        if isinstance(task['updated_at'], str):
            task['updated_at'] = datetime.fromisoformat(task['updated_at'])
        if task.get('due_date') and isinstance(task['due_date'], str):
            task['due_date'] = datetime.fromisoformat(task['due_date'])
    
    return tasks


@api_router.get("/tasks/user/{user_id}", response_model=List[Task])
async def get_tasks_by_user(user_id: str):
    """Obter todas as tarefas atribuídas a um usuário"""
    tasks = await db.tasks.find({"assigned_to": user_id}, {"_id": 0}).to_list(1000)
    
    for task in tasks:
        if isinstance(task['created_at'], str):
            task['created_at'] = datetime.fromisoformat(task['created_at'])
        if isinstance(task['updated_at'], str):
            task['updated_at'] = datetime.fromisoformat(task['updated_at'])
        if task.get('due_date') and isinstance(task['due_date'], str):
            task['due_date'] = datetime.fromisoformat(task['due_date'])
    
    return tasks


@api_router.get("/tasks/{task_id}", response_model=Task)
async def get_task(task_id: str):
    """Obter uma tarefa específica"""
    task = await db.tasks.find_one({"id": task_id}, {"_id": 0})
    
    if not task:
        raise HTTPException(status_code=404, detail="Tarefa não encontrada")
    
    if isinstance(task['created_at'], str):
        task['created_at'] = datetime.fromisoformat(task['created_at'])
    if isinstance(task['updated_at'], str):
        task['updated_at'] = datetime.fromisoformat(task['updated_at'])
    if task.get('due_date') and isinstance(task['due_date'], str):
        task['due_date'] = datetime.fromisoformat(task['due_date'])
    
    return task


@api_router.put("/tasks/{task_id}", response_model=Task)
async def update_task(task_id: str, task_update: TaskUpdate):
    """Atualizar uma tarefa"""
    task = await db.tasks.find_one({"id": task_id})
    
    if not task:
        raise HTTPException(status_code=404, detail="Tarefa não encontrada")
    
    update_dict = task_update.model_dump(exclude_unset=True)
    update_dict['updated_at'] = datetime.now(timezone.utc).isoformat()
    
    if 'due_date' in update_dict and update_dict['due_date']:
        update_dict['due_date'] = update_dict['due_date'].isoformat()
    
    await db.tasks.update_one({"id": task_id}, {"$set": update_dict})
    
    updated_task = await db.tasks.find_one({"id": task_id}, {"_id": 0})
    
    if isinstance(updated_task['created_at'], str):
        updated_task['created_at'] = datetime.fromisoformat(updated_task['created_at'])
    if isinstance(updated_task['updated_at'], str):
        updated_task['updated_at'] = datetime.fromisoformat(updated_task['updated_at'])
    if updated_task.get('due_date') and isinstance(updated_task['due_date'], str):
        updated_task['due_date'] = datetime.fromisoformat(updated_task['due_date'])
    
    return updated_task


@api_router.delete("/tasks/{task_id}")
async def delete_task(task_id: str):
    """Deletar uma tarefa"""
    result = await db.tasks.delete_one({"id": task_id})
    
    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Tarefa não encontrada")
    
    return {"message": "Tarefa deletada com sucesso"}
@api_router.get("/")
async def root():
    return {"message": "Hello World"}

@api_router.post("/status", response_model=StatusCheck)
async def create_status_check(input: StatusCheckCreate):
    status_dict = input.model_dump()
    status_obj = StatusCheck(**status_dict)
    
    # Convert to dict and serialize datetime to ISO string for MongoDB
    doc = status_obj.model_dump()
    doc['timestamp'] = doc['timestamp'].isoformat()
    
    _ = await db.status_checks.insert_one(doc)
    return status_obj

@api_router.get("/status", response_model=List[StatusCheck])
async def get_status_checks():
    # Exclude MongoDB's _id field from the query results
    status_checks = await db.status_checks.find({}, {"_id": 0}).to_list(1000)
    
    # Convert ISO string timestamps back to datetime objects
    for check in status_checks:
        if isinstance(check['timestamp'], str):
            check['timestamp'] = datetime.fromisoformat(check['timestamp'])
    
    return status_checks

# Include the router in the main app
app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()