# Evidencia CI — Módulo 06

## CI verde (primera vez)
- PR: https://github.com/FerPazAutomation/qa-automation-learning/pull/6
- Workflow run: https://github.com/FerPazAutomation/qa-automation-learning/actions/runs/33526302004
- Fecha: 01/09/2026

## CI rojo (test roto a propósito)
- Commit: Break login locator to test CI failure
- Workflow run: https://github.com/FerPazAutomation/qa-automation-learning/actions/runs/33528388405
- Qué falló: locator incorrecto en LoginPage (`Username1` en lugar de `Username`) — test defect, no product bug

## CI verde (después del fix)
- Commit: Fix the login locator to CI passed
- Workflow run: https://github.com/FerPazAutomation/qa-automation-learning/actions/runs/33530609968
- Fecha: 01/09/2026
