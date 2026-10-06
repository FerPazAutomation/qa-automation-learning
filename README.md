# QA Automation Learning Path

[![Portfolio Playwright Tests](https://github.com/FerPazAutomation/qa-automation-learning/actions/workflows/playwright-portfolio.yml/badge.svg)](https://github.com/FerPazAutomation/qa-automation-learning/actions/workflows/playwright-portfolio.yml)

My structured path from Manual QA to QA Automation with **Playwright + TypeScript** and **GitHub Actions**.
Each module has theory, a hands-on exercise and a short "Explain in English" summary.

**Start here:** [`practicos/07-portfolio`](practicos/07-portfolio) — the final portfolio suite (API contract checks, UI tests with Page Object Model, data-driven login, CI on every PR).

| Folder | What's inside |
|--------|---------------|
| [`practicos/02-api`](practicos/02-api) | API tests against JSONPlaceholder and Restful Booker |
| [`practicos/03-ui`](practicos/03-ui) | First UI tests: The Internet, TodoMVC, Sauce Demo |
| [`practicos/04-diseno`](practicos/04-diseno) | Page Object Model and data-driven tests |
| [`practicos/05-estabilidad`](practicos/05-estabilidad) | Flaky test analysis and a [post-mortem](practicos/05-estabilidad/FLAKY_POSTMORTEM.md) |
| [`practicos/07-portfolio`](practicos/07-portfolio) | Portfolio suite, test strategy and interview pitch |
| [`practicos/08-entrevistas`](practicos/08-entrevistas) | Interview answers in English |

Applied on a real system: [**ecommerce-bike**](https://github.com/FerPazAutomation/ecommerce-bike) (React + FastAPI + Stripe, tested with pytest, Vitest and Playwright).
Author: **Fernando Paz** · [LinkedIn](https://www.linkedin.com/in/fernandollanespaz/) · [Portfolio](https://fernando-qa-portfolio.vercel.app)

---

## Ruta QA Automation — Curso práctico (ES)

Ruta de aprendizaje diseñada para alguien con experiencia en **QA Manual** que quiere migrar a **QA Automation + CI/CD**.

## Cómo usar este curso

1. Seguí el orden de los módulos (`00` → `08`). No saltees teoría.
2. Cada módulo tiene: **objetivo**, **teoría**, **clase (explicación)**, **vocabulario EN**, **práctico** y **criterio de aprobación**.
3. Cuando termines un módulo, volvé al chat y pedí: *"Revisá mi práctico del Módulo X"* o *"Empecemos la clase del Módulo Y"*.
4. La IA es tu tutor: pedile que te explique el *por qué*, no solo el código. Si no entendés una línea, preguntá.

## Stack del curso

| Área | Tecnología |
|------|------------|
| Lenguaje | TypeScript (vía Node.js) |
| UI Automation | Playwright |
| API Testing | Playwright `request` + conceptos REST |
| Control de versiones | Git + GitHub |
| CI/CD | GitHub Actions |
| App de práctica | Sites públicos + tu propio mini-proyecto |

## Mapa del curso (12–16 semanas, ~10–15 h/semana)

| # | Módulo | Semanas | Entregable |
|---|--------|---------|------------|
| 00 | Fundamentos de código | 1–2 | Ejercicios JS/TS resueltos a mano |
| 01 | Git y flujo profesional | 1 | Repo con commits limpios |
| 02 | HTTP, APIs y testing de contrato | 1–2 | Suite API contra JSONPlaceholder |
| 03 | Playwright UI — bases | 2 | Tests de login/navegación |
| 04 | Diseño de automatización | 1–2 | Page Object + data-driven |
| 05 | Reporting, flakiness y buenas prácticas | 1 | Suite estable + reporte |
| 06 | CI/CD con GitHub Actions | 1–2 | Pipeline verde en PRs |
| 07 | Proyecto portfolio | 2–3 | Repo listo para entrevistas |
| 08 | Entrevistas y storytelling EN | 1 | Pitch + respuestas técnicas EN |

## Reglas del aula

- **Escribí vos el código primero.** Usá IA para revisar o desbloquear, no para copiar soluciones enteras.
- **Explicá en voz alta** (o por escrito) qué hace cada bloque antes de pedir ayuda.
- Cada práctico termina con una sección **Explain in English** (2–4 oraciones).
- No pases de módulo sin cumplir el **criterio de aprobación**.

## Empezar ahora

Abrí: [`modulos/00-fundamentos-codigo.md`](modulos/00-fundamentos-codigo.md)
