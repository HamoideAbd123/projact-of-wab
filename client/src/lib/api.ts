import { PaginatedResponse, Phone } from "@/types";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api";
type FetchOptions = RequestInit & { next?: { revalidate?: number } };

async function fetchJson<T>(path: string, options: FetchOptions = {}): Promise<T> {
    const res = await fetch(`${API_URL}${path}`, {
        headers: { "Content-Type": "application/json" },
        ...options,
    });

    if (!res.ok) {
        let details = `Request failed with status ${res.status}`;
        try {
            const body = await res.json();
            if (body?.detail) {
                details = body.detail;
            } else if (body?.ids) {
                details = Array.isArray(body.ids) ? body.ids.join(", ") : String(body.ids);
            }
        } catch {
            // Non-JSON error body
        }
        throw new Error(details);
    }

    return res.json() as Promise<T>;
}

function normalizeListResponse(payload: Phone[] | PaginatedResponse<Phone>): Phone[] {
    if (Array.isArray(payload)) {
        return payload;
    }
    return payload.results ?? [];
}

export async function getPhones(params?: URLSearchParams): Promise<Phone[]> {
    const query = params?.toString() ? `?${params.toString()}` : "";
    const payload = await fetchJson<Phone[] | PaginatedResponse<Phone>>(`/phones/${query}`, { cache: "no-store" });
    return normalizeListResponse(payload);
}

export async function getSamsungPhones(): Promise<Phone[]> {
    const payload = await fetchJson<Phone[] | PaginatedResponse<Phone>>("/phones/samsung/", { cache: "no-store" });
    return normalizeListResponse(payload);
}

export async function getPhone(id: number): Promise<Phone> {
    return fetchJson<Phone>(`/phones/${id}/`, { next: { revalidate: 300 } });
}

export async function comparePhones(ids: number[]): Promise<Phone[]> {
    return fetchJson<Phone[]>(`/phones/compare/?ids=${ids.join(",")}`, { next: { revalidate: 300 } });
}
