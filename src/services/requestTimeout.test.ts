import { describe, expect, it, vi } from "vitest";
import { RequestTimeoutError, withRequestTimeout } from "./requestTimeout";

describe("withRequestTimeout", () => {
  it("devolve uma resposta que chegou antes do limite", async () => {
    await expect(withRequestTimeout(Promise.resolve("ok"), 20)).resolves.toBe("ok");
  });

  it("encerra uma consulta remota que não responde", async () => {
    vi.useFakeTimers();
    const result = withRequestTimeout(new Promise<never>(() => {}), 100);
    const rejection = expect(result).rejects.toBeInstanceOf(RequestTimeoutError);
    await vi.advanceTimersByTimeAsync(100);
    await rejection;
    vi.useRealTimers();
  });
});
