export class RequestTimeoutError extends Error {
  constructor(message = "A consulta demorou mais que o esperado.") {
    super(message);
    this.name = "RequestTimeoutError";
  }
}

/** Evita que uma indisponibilidade remota mantenha a interface em carregamento. */
export function withRequestTimeout<T>(request: PromiseLike<T>, timeoutMs = 8_000, message?: string): Promise<T> {
  return new Promise<T>((resolve, reject) => {
    const timer = globalThis.setTimeout(() => reject(new RequestTimeoutError(message)), timeoutMs);
    Promise.resolve(request).then(
      (value) => { globalThis.clearTimeout(timer); resolve(value); },
      (error) => { globalThis.clearTimeout(timer); reject(error); },
    );
  });
}
