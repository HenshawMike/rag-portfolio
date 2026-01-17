from  fastapi  import  APIRouter, Depends, HTTPException
from models.schemas import QueryRequest, QueryResponse
from dependencies import get_rag_engine

router = APIRouter()

@router.post("/ask", response_model=QueryResponse)
async def ask_question(request:QueryRequest, engine= Depends(get_rag_engine)):
    try:
        response= await engine.aquery(request.question)
        return QueryResponse(answer=str(response))
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))