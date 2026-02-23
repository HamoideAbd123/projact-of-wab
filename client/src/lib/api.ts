const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api';

export async function getPhones(params?: URLSearchParams) {
    const res = await fetch(`${API_URL}/phones/?${params?.toString() || ''}`);
    if (!res.ok) throw new Error('Failed to fetch phones');
    return res.json();
}

export async function getPhone(id: number) {
    const res = await fetch(`${API_URL}/phones/${id}/`);
    if (!res.ok) throw new Error('Failed to fetch phone details');
    return res.json();
}

export async function comparePhones(ids: number[]) {
    const res = await fetch(`${API_URL}/phones/compare/?ids=${ids.join(',')}`);
    if (!res.ok) throw new Error('Failed to fetch comparison data');
    return res.json();
}
