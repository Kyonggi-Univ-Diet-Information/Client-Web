import { redirect } from 'next/navigation';

import { PUBLIC_API_URL } from '@/shared/api/api-endpoints';

export interface RequestBase {
  request: string;
  headers?: Record<string, string>;
  authorize?: boolean;
}

export interface GetRequestParams<TParams> extends RequestBase {
  params?: TParams;
  cache?: RequestCache;
  next?: NextFetchRequestConfig;
  skipCookies?: boolean;
}

export interface PostRequestParams<TData> extends RequestBase {
  data?: TData;
}

export interface DelRequestParams<TData> extends RequestBase {
  data?: TData;
}

interface HttpOptions {
  errorMessage?: string;
}

export class Http {
  private static getBaseUrl(): string {
    if (typeof window !== 'undefined') {
      return '';
    }

    if (process.env.NEXT_PUBLIC_SITE_URL) {
      return process.env.NEXT_PUBLIC_SITE_URL;
    }

    if (process.env.VERCEL_URL) {
      return `https://${process.env.VERCEL_URL}`;
    }

    return 'http://localhost:3000';
  }

  private static buildBffUrl(
    request: string,
    params?: Record<string, unknown>,
  ): string {
    const bffPath = request.startsWith('/') ? request.slice(1) : request;
    const baseUrl = this.getBaseUrl();
    let urlString = `${baseUrl}/api/bff/${bffPath}`;

    if (params) {
      const searchParams = new URLSearchParams();
      Object.entries(params).forEach(([k, v]) => {
        if (v != null) searchParams.append(k, String(v));
      });
      const queryString = searchParams.toString();
      if (queryString) urlString += `?${queryString}`;
    }

    return urlString;
  }

  private static buildDirectUrl(
    request: string,
    params?: Record<string, unknown>,
  ): string {
    const path = request.startsWith('/') ? request : `/${request}`;
    let urlString = `${PUBLIC_API_URL}${path}`;

    if (params) {
      const searchParams = new URLSearchParams();
      Object.entries(params).forEach(([k, v]) => {
        if (v != null) searchParams.append(k, String(v));
      });
      const queryString = searchParams.toString();
      if (queryString) urlString += `?${queryString}`;
    }

    return urlString;
  }

  private static async buildHeaders(
    headers?: Record<string, string>,
    authorize?: boolean,
    skipCookies?: boolean,
  ): Promise<HeadersInit> {
    const finalHeaders: Record<string, string> = {
      'Content-Type': 'application/json',
      ...headers,
    };

    if (authorize) {
      finalHeaders['x-require-auth'] = 'true';
    }

    if (typeof window === 'undefined' && !skipCookies && authorize) {
      try {
        const { cookies } = await import('next/headers');
        const cookieStore = await cookies();
        const cookieHeader = cookieStore
          .getAll()
          .map(cookie => `${cookie.name}=${cookie.value}`)
          .join('; ');

        if (cookieHeader) {
          finalHeaders['Cookie'] = cookieHeader;
        }
      } catch (error) {
        console.warn('Failed to get cookies:', error);
      }
    }

    return finalHeaders;
  }

  private static async request<T>(
    url: string | URL,
    init: RequestInit,
    options: HttpOptions,
    authorize?: boolean,
  ): Promise<T> {
    const res = await fetch(url, {
      ...init,
      credentials: 'include',
      redirect: 'follow',
    });

    const data = await res.json().catch(() => ({}));

    if (res.status === 401 && authorize) {
      const logoutUrl =
        typeof window !== 'undefined'
          ? '/api/auth/logout'
          : `${this.getBaseUrl()}/api/auth/logout`;
      await fetch(logoutUrl, {
        method: 'POST',
        redirect: 'follow',
      }).catch(() => {});

      if (typeof window !== 'undefined') {
        alert('로그인이 필요해요!');
        window.location.href = '/auth/login';
      } else {
        redirect('/auth/login');
      }
    }

    if (!res.ok) {
      throw new Error(
        data.error ||
          data.message ||
          options.errorMessage ||
          `요청에 실패했습니다 (status: ${res.status})`,
      );
    }

    return data as T;
  }

  static async get<TResponse, TParams = unknown>(
    config: GetRequestParams<TParams>,
    options: HttpOptions = {},
  ): Promise<TResponse> {
    const {
      request,
      headers,
      params,
      cache = 'default',
      next,
      authorize = false,
      skipCookies = false,
    } = config;

    const urlString = this.buildBffUrl(
      request,
      params as Record<string, unknown>,
    );
    const finalHeaders = await this.buildHeaders(
      headers,
      authorize,
      skipCookies,
    );

    return this.request<TResponse>(
      urlString,
      { method: 'GET', headers: finalHeaders, cache, next },
      options,
      authorize,
    );
  }

  /**
   * BFF를 거치지 않고 외부 API를 직접 호출합니다.
   * 주로 generateStaticParams 등 빌드 타임에 사용합니다.
   */
  static async getDirect<TResponse, TParams = unknown>(
    config: Omit<GetRequestParams<TParams>, 'authorize' | 'skipCookies'>,
    options: HttpOptions = {},
  ): Promise<TResponse> {
    const { request, headers, params, cache = 'default', next } = config;

    const urlString = this.buildDirectUrl(
      request,
      params as Record<string, unknown>,
    );
    const finalHeaders: HeadersInit = {
      'Content-Type': 'application/json',
      ...headers,
    };

    return this.request<TResponse>(
      urlString,
      { method: 'GET', headers: finalHeaders, cache, next },
      options,
    );
  }

  static async post<TData, TResponse = unknown>(
    config: PostRequestParams<TData>,
    options: HttpOptions = {},
  ): Promise<TResponse> {
    const { request, data, headers, authorize = false } = config;

    const urlString = this.buildBffUrl(request);
    const finalHeaders = await this.buildHeaders(headers, authorize);

    return this.request<TResponse>(
      urlString,
      {
        method: 'POST',
        headers: finalHeaders,
        body: data ? JSON.stringify(data) : undefined,
      },
      options,
      authorize,
    );
  }

  static async postDirect<TData, TResponse = unknown>(
    config: Omit<PostRequestParams<TData>, 'authorize'>,
    options: HttpOptions = {},
  ): Promise<TResponse> {
    const { request, data, headers } = config;

    const urlString = this.buildDirectUrl(request);
    const finalHeaders: HeadersInit = {
      'Content-Type': 'application/json',
      ...headers,
    };

    return this.request<TResponse>(
      urlString,
      {
        method: 'POST',
        headers: finalHeaders,
        body: data ? JSON.stringify(data) : undefined,
      },
      options,
    );
  }

  static async del<TResponse, TData = unknown>(
    config: DelRequestParams<TData>,
    options: HttpOptions = {},
  ): Promise<TResponse> {
    const { request, data, headers, authorize = false } = config;

    const urlString = this.buildBffUrl(request);
    const finalHeaders = await this.buildHeaders(headers, authorize);

    return this.request<TResponse>(
      urlString,
      {
        method: 'DELETE',
        headers: finalHeaders,
        body: data ? JSON.stringify(data) : undefined,
      },
      options,
      authorize,
    );
  }
}
