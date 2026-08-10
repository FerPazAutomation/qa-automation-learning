# Módulo 01 — Git y flujo profesional

**Duración sugerida:** 1 semana  
**Prerrequisito:** Módulo 00 aprobado  
**Objetivo:** Versionar tu trabajo como en un equipo real (branches, commits, PRs).

---

## 1.1 Clase del profesor

En automation, el código de tests **vive en Git** junto al producto (o en un repo de QA). Si no sabés Git, no podés:
- contribuir a un pipeline
- revisar PRs de tests
- mostrar portfolio creíble

Git no es “guardar archivos”: es **historial + colaboración**.

---

## 1.2 Teoría

### Conceptos

| Concepto | Qué es |
|----------|--------|
| Repository (repo) | Carpeta versionada con historial |
| Commit | Snapshot con mensaje (“por qué” del cambio) |
| Branch | Línea de trabajo paralela |
| Main/Master | Rama principal estable |
| Pull Request (PR) | Pedido de revisión para mergear tu branch |
| Merge | Integrar cambios de una branch a otra |
| Clone / Push / Pull | Copiar remoto / subir / bajar cambios |

### Flujo profesional típico

```
main ─── clone
          └── feature/add-login-tests  (tu branch)
                └── commits
                      └── Pull Request → review → merge a main
```

### Mensajes de commit (estilo)

Mal: `fix`, `asdf`, `updates`  
Bien: `Add smoke test for login form`  
Bien: `Fix flaky selector on checkout button`

Regla: el mensaje explica el **por qué / qué efecto**, no “cambié archivo X”.

---

## 1.3 Vocabulario EN

| ES | EN | Frase |
|----|-----|-------|
| rama | branch | "I created a feature branch for the API tests." |
| confirmar cambios | commit | "I'll commit this with a clear message." |
| solicitud de cambio | pull request | "Please review my pull request." |
| fusionar | merge | "After approval, we merge into main." |
| conflicto | merge conflict | "I resolved a merge conflict in the locator file." |
| remoto | remote | "I pushed the branch to the remote." |

**Frase de la semana:**  
*"I opened a pull request so the team can review the new regression tests."*

---

## 1.4 Setup

1. Creá cuenta en GitHub (si no tenés).
2. Instalá Git: https://git-scm.com  
3. Configurá nombre/email (una sola vez en tu máquina — vos lo hacés, no yo):
   ```bash
   git config --global user.name "Tu Nombre"
   git config --global user.email "tu@email.com"
   ```

---

## 1.5 Cómo crear un Pull Request (leé esto ANTES del práctico)

### Qué es un PR (otra vez, en simple)

Ya pusheaste tu branch al remoto. Eso **todavía no** integra los cambios a `main`/`master`.

Un **Pull Request** es el pedido formal:

> “Quiero que estos commits de mi branch entren a la rama principal. Revisalos.”

En un equipo, otro dev/QA comenta. En este curso, vos sos autor y reviewer.

**EN:** *"A pull request asks to merge your branch into the base branch after review."*

### Diferencia rápida

| Acción | Qué hace |
|--------|----------|
| `commit` | Guarda snapshot **local** |
| `push` | Sube commits al **remoto** |
| **Pull Request** | Pide **revisión + merge** a `main`/`master` |
| `merge` | Integra de verdad los cambios |

### Paso a paso en GitHub (UI)

1. Entrá a tu repo: `https://github.com/TU_USER/qa-automation-learning`
2. Si GitHub muestra un banner **“Compare & pull request”** después del push → hacé clic ahí.
3. Si no hay banner:
   - Andá a la pestaña **Pull requests**
   - Clic en **New pull request**
4. Configurá las ramas:
   - **base:** `main` (o `master`, la rama principal del repo)
   - **compare:** tu branch (ej: `practice/modulo-01-git`)
5. Título sugerido: `Add Git practice notes for module 01`
6. Descripción breve (EN o ES), por ejemplo:
   ```text
   ## Summary
   - Practice branch + commits for Module 01
   - Notes about common Git commands

   ## Test plan
   - [ ] Files render on GitHub
   - [ ] Ready to merge into main/master
   ```
7. Clic en **Create pull request**
8. (Opcional) Clic en **Merge pull request** → **Confirm merge**

### Si no existe `main` (solo `master`)

Algunos repos usan `master` como rama principal. En el PR:
- base = `master`
- compare = tu branch

No pasa nada: lo importante es mergear a la rama principal del repo.

### Si GitHub dice que no hay diferencias

Significa que tu branch y la base tienen el mismo contenido (o la base aún no existe con historial distinto). En ese caso:
1. Confirmá con `git branch` el nombre exacto
2. Confirmá que hiciste `git push -u origin NOMBRE-EXACTO`
3. Creá/ commiteá un archivo nuevo en la branch y volvé a pushear

### Alternativa por terminal (`gh`)

Si más adelante instalás [GitHub CLI](https://cli.github.com/):

```bash
gh pr create --base master --head practice/modulo-01-git --title "Add Git practice notes for module 01" --body "Module 01 practice: branch, commits, and PR workflow."
```

En este módulo preferimos la **UI de GitHub** para ver el flujo visual.

### Recursos para esta sección

- Crear un PR (docs oficiales): https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/proposing-changes-to-your-work-with-pull-requests/creating-a-pull-request
- Sobre Pull Requests: https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/proposing-changes-to-your-work-with-pull-requests/about-pull-requests
- Video corto (buscar): “GitHub pull request for beginners”

---

## 1.6 Práctico

### Parte A — Repo local

Dentro de `qa-automation-ruta`:

```bash
git init
git add README.md PROGRESO.md modulos
git commit -m "Add course roadmap and module 00-01 materials"
```

### Parte B — Branch de práctica

```bash
git checkout -b practice/modulo-01-git
```

> Usá **siempre el mismo nombre** de branch en `checkout`, `push` y el PR.  
> Si tu branch ya se llama `practice/modulo-01-git`, no intentes pushear `practice/module-01-git`.

Creá `practicos/01-git/NOTES.md` con:
- 5 comandos Git que uses y para qué sirven
- Un ejemplo de buen vs mal commit message

```bash
git add practicos/01-git/NOTES.md
git commit -m "Add Git practice notes for module 01"
```

### Parte C — GitHub

1. Creá un repo vacío en GitHub: `qa-automation-learning`
2. Conectá remoto y pusheá (nombre **exacto** de tu branch):
   ```bash
   git remote add origin https://github.com/TU_USER/qa-automation-learning.git
   git push -u origin practice/modulo-01-git
   ```
3. Abrí un **Pull Request** hacia `main` o `master` siguiendo la **sección 1.5** (aunque seas vos el reviewer).

### Parte D — Explain in English

En `practicos/01-git/EXPLAIN.md`:

> "In this module I practiced branching and pull requests. A branch lets me work safely without breaking main. A pull request is how I ask for review before merging."

Ampliá con 2 oraciones propias.

---

## 1.7 Criterio de aprobación

- [ ] Repo en GitHub con al menos 2 commits claros
- [ ] Branch + PR creados
- [ ] Podés explicar: commit vs push vs PR
- [ ] `EXPLAIN.md` entregado

Pedí: **“Profe, revisá el Módulo 01”** + link al PR.

---

## 1.8 Recursos

- GitHub Git Basics: https://docs.github.com/en/get-started/git-basics/set-up-git
- Creating a pull request: https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/proposing-changes-to-your-work-with-pull-requests/creating-a-pull-request
- About pull requests: https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/proposing-changes-to-your-work-with-pull-requests/about-pull-requests
- Oh My Git! (juego visual, opcional): https://ohmygit.org
- Conventional Commits (referencia, no obligatorio aún): https://www.conventionalcommits.org
