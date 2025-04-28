// api.js (Exemplo completo com todas as rotas do backend Next Talents usando JWT)

const API_URL = 'http://localhost:3000/nexttalents/student';

// Função para login e armazenamento do token
export async function login(email, pass) {
    const response = await fetch(`${API_URL}/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, pass })
    });

    const data = await response.json();

    if (response.ok) {
        localStorage.setItem('token', data.token);
        return { success: true, message: data.message };
    } else {
        return { success: false, message: data.message };
    }
}

// Função para registro de aluno
export async function register(userData) {
    const response = await fetch(`${API_URL}/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userData)
    });

    const data = await response.json();
    return { response, data };
}

// Helper para requisições autenticadas
export async function authFetch(endpoint, options = {}) {
    const token = localStorage.getItem('token');
    const headers = {
        'Content-Type': 'application/json',
        ...(token && { 'Authorization': `Bearer ${token}` })
    };

    const response = await fetch(endpoint, { ...options, headers });
    const data = await response.json();
    return { response, data };
}

// Atualizar perfil do aluno
export async function updateProfile(updates) {
    const { response, data } = await authFetch(`${API_URL}/update`, {
        method: 'PUT',
        body: JSON.stringify(updates)
    });

    if (response.ok) {
        return { success: true, message: data.message };
    } else {
        return { success: false, message: data.message };
    }
}

// Solicitar recuperação de senha (forgot-pass)
export async function forgotPassword(email) {
    const response = await fetch(`${API_URL}/forgot-pass`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email })
    });

    const data = await response.json();
    return { response, data };
}

// Redefinir senha (reset-pass)
export async function resetPassword(token, newPassword) {
    const response = await fetch(`${API_URL}/reset-pass`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token, newPassword })
    });

    const data = await response.json();
    return { response, data };
}

// Logout (limpa o token)
export function logout() {
    localStorage.removeItem('token');
    alert('Você saiu com sucesso!');
}

// Verificar se o usuário está logado
export function isLoggedIn() {
    return !!localStorage.getItem('token');
}
