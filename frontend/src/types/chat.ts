export interface QueryRequest {
    question: string;
}

export interface QueryResponse {
    answer: string;
}

export interface Message {
    id: string;
    content: string;
    isUser: boolean;
}
