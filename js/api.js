/**
 * api.js — Shared API configuration for the portfolio frontend.
 * All fetch calls to the Django REST Framework backend go through here.
 */

const API_BASE_URL = 'https://portfolio-backend-1-iky5.onrender.com/';

async function getPortfolioData() {
    const response = await fetch(`${API_BASE_URL}/portfolio/`);
    if (!response.ok) throw new Error('Failed to fetch portfolio data');
    return response.json();
}

async function getProjectById(id) {
    const response = await fetch(`${API_BASE_URL}/projects/${id}/`);
    if (!response.ok) throw new Error('Project not found');
    return response.json();
}

async function submitContact(formData) {
    const response = await fetch(`${API_BASE_URL}/contact/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
    });
    const data = await response.json();
    return { ok: response.ok, data };
}
