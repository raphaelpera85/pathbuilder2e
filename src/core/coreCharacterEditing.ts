/** Reconcile skills after changing class/background in an editable core sheet. */
export function reconcileCoreSkillProficiencies(
  currentSkills: string[] = [],
  backgroundSkills: string[] = [],
  fixedSkills: string[] = [],
  choiceSkills: string[] = [],
  racialSkills: string[] = [],
): string[] {
  const allowedSkills = new Set([...backgroundSkills, ...fixedSkills, ...choiceSkills, ...racialSkills]);
  return Array.from(new Set([
    ...currentSkills.filter((skill) => allowedSkills.has(skill)),
    ...backgroundSkills,
    ...fixedSkills,
    ...racialSkills,
  ]));
}

export function reconcileT20DeityDependentFeatIds<T extends { id: string; deityIds?: string[] }>(
  featIds: string[],
  deityId: string | undefined,
  feats: ReadonlyArray<T>,
): string[] {
  return featIds.filter((featId) => {
    const feat = feats.find((entry) => entry.id === featId);
    const requiredDeities = feat?.deityIds || [];
    return requiredDeities.length === 0 || Boolean(deityId && requiredDeities.includes(deityId));
  });
}
