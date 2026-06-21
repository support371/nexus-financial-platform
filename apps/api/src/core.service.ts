import { Injectable } from '@nestjs/common';

type JsonObject = Record<string, unknown>;

export type NexusCoreStatus = {
  configured: boolean;
  reachable: boolean;
  state: 'healthy' | 'degraded' | 'not_configured';
  safety: {
    paymentMode: 'sandbox';
    cardIssuanceMode: 'sandbox';
    liveMoneyMovementEnabled: false;
    writeProxyEnabled: false;
  };
  upstream?: {
    health: JsonObject;
    gateway: JsonObject;
  };
  error?: string;
};

@Injectable()
export class CoreService {
  private readonly baseUrl = (process.env.FINTECH_CORE_API_URL ?? '').replace(/\/$/, '');
  private readonly timeoutMs = this.parseTimeout(process.env.CORE_REQUEST_TIMEOUT_MS);

  private parseTimeout(value: string | undefined): number {
    const parsed = Number(value ?? 5000);
    if (!Number.isFinite(parsed) || parsed < 250 || parsed > 30000) {
      return 5000;
    }
    return parsed;
  }

  private isJsonObject(value: unknown): value is JsonObject {
    return typeof value === 'object' && value !== null && !Array.isArray(value);
  }

  private async getJson(path: string): Promise<JsonObject> {
    if (!this.baseUrl) {
      throw new Error('FINTECH_CORE_API_URL is not configured');
    }

    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), this.timeoutMs);

    try {
      const response = await fetch(`${this.baseUrl}${path}`, {
        method: 'GET',
        headers: { Accept: 'application/json' },
        signal: controller.signal,
      });

      if (!response.ok) {
        throw new Error(`Core request failed with HTTP ${response.status}`);
      }

      const payload: unknown = await response.json();
      if (!this.isJsonObject(payload)) {
        throw new Error('Core returned an invalid JSON response');
      }
      return payload;
    } finally {
      clearTimeout(timeout);
    }
  }

  async getStatus(): Promise<NexusCoreStatus> {
    const safety = {
      paymentMode: 'sandbox' as const,
      cardIssuanceMode: 'sandbox' as const,
      liveMoneyMovementEnabled: false as const,
      writeProxyEnabled: false as const,
    };

    if (!this.baseUrl) {
      return {
        configured: false,
        reachable: false,
        state: 'not_configured',
        safety,
        error: 'FINTECH_CORE_API_URL is not configured',
      };
    }

    try {
      const [health, gateway] = await Promise.all([
        this.getJson('/health'),
        this.getJson('/'),
      ]);

      return {
        configured: true,
        reachable: true,
        state: 'healthy',
        safety,
        upstream: { health, gateway },
      };
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : 'Unknown core connectivity error';
      return {
        configured: true,
        reachable: false,
        state: 'degraded',
        safety,
        error: message,
      };
    }
  }
}
