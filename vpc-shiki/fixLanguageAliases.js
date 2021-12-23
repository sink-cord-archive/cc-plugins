const EXTRA_ALIASES = {
    "actionscript-3": ["as", "actionscript"],
    "asp-net-razor": ["razor"],
    julia: ["jl"],
    kotlin: ["kt", "kts"],
    latex: ["tex"],
    pascal: ["pas"],
    raku: ["rk", "p6"],
    purescript: ["purs"],
    razor: ["cshtml"],
    rust: ["rs"],
    wasm: ["wat"],
    yaml: ["yml"],
};

export default (languages) => {
    let aliasedLanguages = [...languages];

    for (const [id, newAliases] of Object.entries(EXTRA_ALIASES)) {
        let index = aliasedLanguages.findIndex((l) => l.id === id);
        if (index === -1) continue;

        if (aliasedLanguages[index].aliases)
            aliasedLanguages[index].aliases.push(...newAliases);
        else aliasedLanguages[index].aliases = newAliases;
    }

    return aliasedLanguages;
};
