# Marco agéntico CRITERIUM

Este es el criterio con el que se decide qué es un sistema agéntico, cómo se describe y cómo se construye. Se usa en el discovery (para filtrar), al diseñar los cinco agentes (para llenar `estrategia.json`) y al revisar el deck. El texto fijo de la lámina 9 sale de aquí.

## 1. Qué cuenta como agéntico: las cinco pruebas

Un caso entra a la lista solo si el agente cumple las cinco:

1. **Recibe una meta**, no una tarea suelta: "cobrar cada factura en su plazo", "responder cada cotización el mismo día".
2. **Ejecuta varios pasos en dos o más sistemas**: ERP, correo, WhatsApp, banco, portal del cliente o del proveedor.
3. **Trabaja con información desordenada**: correos, PDFs, fotos, listas en Excel, conversaciones.
4. **Actúa dentro de límites escritos** sin pedir permiso para cada movimiento.
5. **Escala a una persona solo la excepción**, con el caso ya armado.

**Prueba funcional** (para descartar lo que solo parece agente): ¿qué estado cambia, en qué sistema, con qué permiso y cómo se sabe que terminó bien? Si lo único que cambia es texto en una pantalla, es asistencia, no un agente.

## 2. Modelo clásico frente a agente

El pronóstico de demanda, la elasticidad de precio, el modelo de riesgo de crédito, el optimizador de rutas o de turnos y los reportes son **modelos clásicos**: se compran o se mantienen, y **recomiendan**. El valor se pierde después, en el trabajo de la gente entre la recomendación y la acción: aplicar el pago, perseguir al proveedor, armar el expediente, avisar al cliente. **Ese es el espacio del agente.** El agente se monta encima de los modelos clásicos y hace el trabajo que hoy queda entre la recomendación y la acción.

Hay procesos sin modelo clásico que comprar (seguimiento a proveedores, garantías): ahí el agente trabaja directo sobre el correo, los documentos y el sistema administrativo.

## 3. Seis señales de "forma de agente" (se deducen de la conversación, no se preguntan)

1. Resultado verificable (se sabe si quedó bien).
2. Pasos que cambian de un caso a otro.
3. Dos o más sistemas involucrados.
4. Información no estructurada: correos, PDFs, WhatsApp, llamadas.
5. Juicio con excepciones o reglas difíciles de mantener a mano.
6. Revisar el resultado cuesta menos que hacerlo, y el error es tolerable con un punto de control humano.

**Con cuatro o más señales, el dolor tiene forma de agente.** Si no, se reclasifica y va a "otras palancas" en la lámina 8:

| Lo que se escucha | Va a | Por qué |
|---|---|---|
| Pasos fijos y reglas estables | Automatización (`automatizacion`) | Un flujo o un robot de reglas lo resuelve sin agente |
| "No vemos el número", reportes | Analítica (`analitica`) | Hace falta un tablero conectado, no un agente |
| "Nadie es dueño", "la regla no está definida" | Cambio de proceso (`proceso`) | Primero se define dueño y regla |
| Volumen esporádico | Se descarta | El esfuerzo no se paga |

Un dolor de "otras palancas" no se tira: se nombra con su razón. Eso le da credibilidad al deck: no se vende como agente lo que no lo es.

## 4. Niveles de autonomía por acción

Cada acción del agente lleva un nivel. Un agente no tiene un solo nivel: tiene uno por acción.

- **N1 · lo hace solo y queda en bitácora.** Acciones reversibles y de bajo riesgo: consultar, conciliar lo que cuadra, enviar un mensaje con plantilla aprobada, actualizar una fecha.
- **N2 · lo propone y una persona aprueba.** Acciones con dinero, con compromiso hacia un cliente o proveedor, o difíciles de revertir: bloquear crédito, reponer producto, enviar una cotización fuera de lo estándar, cambiar de proveedor.
- **N3 · nunca lo hace.** Pagos a proveedores fuera de flujo, quitas, cambios de precio masivos, cambios de permisos, uso de datos sensibles sin consentimiento, cualquier cosa con firma legal.

**Regla de arranque CRITERIUM:** en la primera fase los agentes preparan, concilian, avisan, redactan y recomiendan. Lo que mueve dinero necesita validación de una persona; lo que obliga legalmente necesita firma. Ninguna acción irreversible ocurre sin una persona. "La autonomía máxima no es un KPI."

Todo agente debe tener al menos una acción N1 (si no, no hace nada solo) y al menos una N2 o N3 (si no, nadie lo controla). `validar.js` lo revisa.

## 5. Contrato de cada agente

Cada agente se describe con este contrato. Cada campo de `estrategia.json` sale de aquí:

| Campo del contrato | Dónde vive en el deck |
|---|---|
| **Meta** (resultado que se le encarga) | `meta` · lámina "¿Cómo trabaja?" y tabla de los cinco |
| **Disparador** (qué lo activa: una solicitud, una corrida diaria, un evento) | `funciona.escena` |
| **Datos que lee y sistemas donde escribe** | `construye.sistemas`, `construye.cerebro` |
| **Herramientas** (conectores, lectores de documentos, modelos clásicos) | `construye.herramientas`, `trabaja.ia_clasica` |
| **Acciones permitidas** (con su nivel N1/N2/N3) | `construye.autonomia`, `trabaja.verbos.actua` |
| **Límites escritos** | `trabaja.limites` |
| **Escalamiento** (a quién y con qué evidencia) | `trabaja.escala_a`, `funciona.firma` |
| **Criterio de cierre** (cómo se sabe que terminó bien) | `funciona.pasos` (el paso de verificar) y el riel de estados |
| **Qué NO hace** | la acción N3 en `construye.autonomia` y los límites |

Estados de cada caso, los mismos en todos los agentes: recibido → diagnosticado → ejecutado → verificado → cerrado.

## 6. Los cuatro verbos del agente

La lámina "¿Cómo trabaja?" describe al agente con una meta y cuatro verbos, siempre en este orden:

1. **Revisa**: qué mira y con qué frecuencia ("cada depósito y cada factura abierta, cada mañana").
2. **Diagnostica**: qué decide entender ("a qué factura corresponde el pago y qué cuenta se atrasa").
3. **Actúa**: qué hace dentro de sus límites ("aplica el pago, envía estado de cuenta y registra promesas").
4. **Reporta**: qué entrega y qué deja para firma ("lo aplicado, lo vencido y lo que requiere firma").

Arriba del agente va **la gente** (roles y qué firman). Abajo, **la IA clásica** que sigue igual. Al pie, **los límites escritos** y a quién escala.

## 7. Capacidades en "¿Cómo funciona?"

Cada paso del día del agente lleva una etiqueta de qué lo hace:

- `agente`: el agente decide y ejecuta el paso (orquesta, actualiza sistemas, persigue).
- `generativa`: IA generativa lee o redacta (lee un PDF o un correo, redacta un mensaje, arma un expediente).
- `modelo`: un modelo clásico calcula (conciliación por reglas, pronóstico, precio, ruta, riesgo).
- `humana`: una persona decide. **Siempre hay al menos un paso humano.**

## 8. Arquitectura en capas ("¿Cómo se construye?")

De arriba hacia abajo:

1. **Personas y canales**: dónde se pide y se entrega (WhatsApp, correo, portal) y quién participa.
2. **Sistema agéntico**: un agente por proceso, no un "súper agente".
3. **Controles**: permisos, límites escritos, bitácora de cada acción, evaluaciones y salida a una persona.
4. **Herramientas**: conectores a los sistemas (APIs o MCP), lectores de documentos y los modelos clásicos.
5. **Cerebro contextual**: el contexto común de la operación en un solo lugar: entidades del negocio (clientes, facturas, pedidos, catálogo), políticas y reglas, historial. Lo comparten todos los agentes; por eso el segundo agente cuesta menos que el primero. "Cerebro contextual" es término de CRITERIUM; las firmas hablan de capa semántica o de contexto.
6. **Sistemas de registro**: ERP, banco, WMS, CRM. **No se reemplazan**; el agente lee y, donde tiene permiso, escribe.

## 9. Ruta de implementación

Siempre tres fases, con semanas concretas:

1. **Diagnóstico (3 a 4 semanas):** línea base del KPI con datos reales, inventario de datos y permisos, límites escritos.
2. **Piloto con grupo de control (8 a 12 semanas):** una región, sucursal, marca o equipo con agente frente a otro comparable sin agente. El efecto es la distancia entre los dos.
3. **Escala:** solo si el piloto movió el KPI frente al grupo de control y Finanzas firma el resultado.

**Regla para escalar:** ningún sistema escala sin piloto contra grupo de control y sin el resultado firmado por Finanzas.

## 10. Errores que el deck evita

- **Súper agente** que lo hace todo: agentes estrechos, uno por proceso.
- **Poner un agente sobre el proceso viejo**: primero se quita lo que sobra ("si lo armara desde cero, ¿qué pasos sobran?").
- **Permisos amplios**: mínimo privilegio y aprobación para lo irreversible.
- **Medir uso en lugar de efecto**: grupo de control y KPI del resultado del negocio.
- **Agent washing**: llamar agente a un chatbot, un robot de reglas o un tablero. Gartner estima que más de 40% de los proyectos agénticos se cancelará antes de terminar 2027 y que solo unos 130 proveedores son agénticos de verdad (jun-2025).
- **Datos sucios**: el agente vale lo que valen los datos que lee; por eso cada agente declara sus prerrequisitos.

## Fuentes del marco

- Criterios CRITERIUM de sistemas agénticos (casos agénticos de retail, oct-2026; tesis de agentes en empresa).
- Anthropic, *Building effective agents* (dic-2024): cuándo usar agentes frente a flujos fijos.
- OpenAI, *A practical guide to building agents* (abr-2025): criterios de uso y control humano.
- McKinsey, *One year of agentic AI: six lessons* (sep-2025): "los agentes no siempre son la respuesta".
- BCG, *How agents are accelerating the next wave of AI value creation* (dic-2025): rediseño de punta a punta.
- IMDA (Singapur): niveles de autonomía por acción.
- Gartner, agent washing (jun-2025).
