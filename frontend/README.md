# Portfolio Frontend

The frontend interface for the AI Portfolio, built with React, TypeScript, and Tailwind CSS. It features a chat interface that communicates with the backend RAG API.

## 🛠️ Technologies

- **Vite**: Fast build tool and dev server.
- **React**: UI library.
- **TypeScript**: Static typing for safety.
- **Tailwind CSS**: Utility-first styling.
- **Shadcn/UI**: Reusable UI components.
- **Lucide React**: Icons.

## 🚀 Setup & Installation

1. **Navigate to the frontend directory:**
   ```bash
   cd frontend
   ```

2. **Install dependencies:**
   ```bash
   pnpm install
   # or npm install / yarn install
   ```

3. **Environment Configuration:**
   Create a `.env` file in the `frontend/` directory (use `.env.example` as a template):
   ```env
   VITE_API_BASE_URL=http://localhost:8000/api/v1
   ```

## 🏃 Development

Start the development server:

```bash
pnpm run dev
```

The app will be available at `http://localhost:8080`.

## 📐 Architecture

- **`src/components/chat/`**: Core chat components (Container, Message, Input).
- **`src/components/layout/`**: Layout components (Sidebar, wrappers).
- **`src/services/`**: API client for backend communication.
- **`src/types/`**: TypeScript type definitions.
- **`src/hooks/`**: Custom React hooks (e.g., `use-toast`).

## 🎨 Customization

- **Theme**: Colors and styles are defined in `src/index.css` and `tailwind.config.ts`.
- **Bio/Data**: To update the AI's knowledge, update `backend/data/bio.md` and re-run the ingestion script.
