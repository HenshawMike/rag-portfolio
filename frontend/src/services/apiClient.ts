import { QueryRequest, QueryResponse } from '../types/chat';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export class ApiClient {
    static async askQuestion(question: string, signal?: AbortSignal): Promise<QueryResponse> {
        const request: QueryRequest = { question };

        const response = await fetch(`${API_BASE_URL}/ask`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(request),
            signal,
        });

        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            throw new Error(errorData.detail || 'Failed to get response from the AI assistant');
        }

        return response.json();
    }
}
