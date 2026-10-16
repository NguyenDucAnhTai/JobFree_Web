import type { ProblemDetails } from '../types/common';

export class ApiError extends Error {
  public problem: ProblemDetails;

  constructor(problem: ProblemDetails) {
    super(problem.title || 'API Error');
    this.problem = problem;
  }
}

interface FetchOptions extends RequestInit {
  mockFallback?: boolean;
}

export const apiClient = {
  async fetch<T>(endpoint: string, options: FetchOptions = {}): Promise<T> {
    const url = `/v1/internal${endpoint}`;
    const headers = new Headers(options.headers || {});
    
    // Add required headers
    headers.set('X-JobFree-App', 'admin-web');
    if (!headers.has('Authorization')) {
      const token = localStorage.getItem('admin_token');
      if (token) headers.set('Authorization', `Bearer ${token}`);
    }

    if (options.method && ['POST', 'PUT', 'PATCH', 'DELETE'].includes(options.method.toUpperCase())) {
      if (!headers.has('Idempotency-Key')) {
        headers.set('Idempotency-Key', crypto.randomUUID());
      }
    }

    try {
      const response = await fetch(url, { ...options, headers });
      
      if (!response.ok) {
        if (response.headers.get('content-type')?.includes('application/problem+json')) {
          const problem: ProblemDetails = await response.json();
          throw new ApiError(problem);
        } else {
          throw new ApiError({
            type: 'about:blank',
            title: 'An unexpected error occurred',
            status: response.status,
          });
        }
      }

      if (response.status === 204) {
        return {} as T;
      }

      return await response.json();
    } catch (error) {
      if (options.mockFallback) {
        console.warn(`Mock fallback used for ${options.method || 'GET'} ${url}`);
        // Can be intercepted by a mock service layer
      }
      throw error;
    }
  }
};
