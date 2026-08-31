import { beforeEach, describe, expect, it } from "vitest";
import { changePassword, deleteAccount, getCurrentSession, signIn, signOut, signUp, updateUsername } from "./auth";

describe("auth session coordination", () => {
  beforeEach(async () => {
    await signOut();
    localStorage.clear();
  });

  it("compartilha a sessão entre leituras simultâneas após login", async () => {
    await signUp("sessao_teste", "sessao.teste@example.com", "senha123");
    await signOut();
    await signIn("sessao.teste@example.com", "senha123");

    const [first, second] = await Promise.all([getCurrentSession(), getCurrentSession()]);
    expect(first?.user.email).toBe("sessao.teste@example.com");
    expect(second).toEqual(first);
  });

  it("limpa a sessão compartilhada no logoff", async () => {
    await signUp("logout_teste", "logout.teste@example.com", "senha123");
    expect(await getCurrentSession()).not.toBeNull();
    await signOut();
    expect(await getCurrentSession()).toBeNull();
  });

  it("atualiza usuário e senha no modo local", async () => {
    const created = await signUp("perfil_teste", "perfil.teste@example.com", "senha123");
    const renamed = await updateUsername("perfil_novo", created);
    expect(renamed.user.username).toBe("perfil_novo");
    await changePassword("senha456", "senha123", renamed);
    await signOut();
    await expect(signIn("perfil_novo", "senha123")).rejects.toThrow("Senha incorreta");
    expect((await signIn("perfil_novo", "senha456")).user.email).toBe("perfil.teste@example.com");
  });

  it("exclui conta local, personagens locais e sessão", async () => {
    const created = await signUp("apagar_teste", "apagar.teste@example.com", "senha123");
    localStorage.setItem(`pf2e_user_${created.user.id}_characters_v1`, "[{}]");
    await deleteAccount(created);
    expect(await getCurrentSession()).toBeNull();
    expect(localStorage.getItem(`pf2e_user_${created.user.id}_characters_v1`)).toBeNull();
    await expect(signIn("apagar.teste@example.com", "senha123")).rejects.toThrow("não cadastrado");
  });
});
