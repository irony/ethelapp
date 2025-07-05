export interface FullNameResponse {
  available: boolean;
  fullname?: string;
}

export async function fetchFullname(): Promise<FullNameResponse> {
  const res = await fetch('/app/user/fullname');
  if (!res.ok) {
    console.error('fetchFullname failed', res.statusText);
    return { available: false };
  }
  return res.json();
}

