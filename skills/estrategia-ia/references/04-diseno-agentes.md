# Del discovery a los cinco agentes y al `estrategia.json`

`estrategia.json` es la única fuente de verdad del deck: todo lo que aparece en las 28 láminas sale de ese archivo. El modelo de tono, densidad y profundidad es `ejemplo/estrategia.EJEMPLO.json` (empresa ficticia). **Léelo completo antes de escribir el tuyo.** Tu archivo debe tener la misma estructura y la misma profundidad, con los datos reales de esta empresa.

## Paso 1 · De las prioridades a los agentes

1. Toma las cinco prioridades de `discovery.json`. Aplica a cada una las cinco pruebas y la prueba funcional de `03-marco-agentico.md`. La que no pasa se reclasifica a `diagnostico.otras_palancas` y se reemplaza por la siguiente fuga de la biblioteca con forma de agente alta, marcada `estado: "hipotesis"`.
2. Ordena los agentes A1 a A5: primero los de magnitud grande y estado confirmado. El orden se repite en todo el deck.
3. **Arranque** (`arranque`): el que eligió el directivo en P10. Si ese agente depende de un prerrequisito pesado (por ejemplo, limpiar el catálogo), respeta la elección: ponlo en la ola 1 con el prerrequisito como primer paso y dilo en `olas.olas[0].por_que`.
4. Un agente por proceso. Nunca un "súper agente" que haga dos procesos.

## Paso 2 · Cada agente, campo por campo

| Campo | Qué escribir | Ejemplo (cobranza) |
|---|---|---|
| `nombre` | "Agente de [proceso]" | Agente de cobranza |
| `nombre_corto` | Una o dos palabras | Cobranza |
| `meta` | El resultado que se le encarga, verificable | Cobrar cada factura en su plazo y aplicar cada depósito el mismo día |
| `dolor` | La fuga, en palabras del directivo | Depósitos sin referencia que se aplican a mano |
| `palanca` | `ventas`, `margen` o `capital`: la principal | capital |
| `palancas_secundarias` | Opcional, otras que mueve | — |
| `kpis` | 3 a 4; el primero es el principal | Días de cartera; depósitos sin aplicar al cierre del día… |
| `magnitud` | grande, mediano o chico (umbrales en `02-discovery.md`) | grande |
| `magnitud_razon` | De dónde sale la magnitud, con la unidad | Dos personas de tiempo completo concilian depósitos… |
| `estado` | `confirmada` o `hipotesis` | confirmada |
| `por_que` | Por qué este agente y no otro, con **negritas** en lo esencial | Libera caja en semanas y sus datos **ya existen en el banco y el ERP** |
| `impacto.origen` | `empresa`, `calculado` o `industria` | calculado |
| `impacto.formula` | Cómo calcula la empresa el valor con SUS datos. **Sin cifras de dinero** | (Días de cartera hoy − días con el agente) × venta diaria a crédito = caja liberada |

### `trabaja` · lámina "¿Cómo trabaja?"
- `titulo`: el síntoma como historia real con sus números, y la causa. Fórmula: "[lo que pasó, concreto] porque [causa]". Ejemplo: "La cotización de 1,800 luminarias tardó tres días porque alguien capturó a mano una lista en PDF de 140 renglones".
- `sintoma`: lo que se ve (el caso de P3, P5 o P7).
- `causa`: por qué pasa (los sistemas, los formatos, el trabajo manual).
- `hoy` / `con_agente`: el antes y el después del mismo trabajo, en una oración cada uno. `con_agente` dice qué hace la persona ahora (revisa, decide, negocia), nunca "se elimina el puesto".
- `gente`: 2 a 3 roles con qué hacen o firman.
- `verbos`: revisa, diagnostica, actúa, reporta (ver `03-marco-agentico.md` §6).
- `ia_clasica`: los modelos clásicos que siguen igual (0 a 4). Si no hay, lista vacía: la lámina lo explica sola.
- `recomienda`: qué le recomienda el modelo clásico al agente (solo si hay `ia_clasica`).
- `limites`: 2 a 4 límites escritos, cortos ("Bloqueo de crédito: solo lo propone"). Salen de P9.
- `escala_a`: rol y con qué evidencia.

### `funciona` · lámina "¿Cómo funciona?" (demostración conceptual)
- `titulo`: el resultado de un día del agente, con horas. Fórmula: "[evento] a las [hora] y a las [hora] [persona] ya tiene [resultado]".
- `escena`: el disparador ("corrida diaria · 07:00", "solicitud por WhatsApp · martes 09:10").
- `pasos`: 5 a 6, cada uno con `accion` (verbo + objeto), `detalle` (con números ilustrativos coherentes con la empresa) y `capacidad` (`agente`, `generativa`, `modelo`, `humana`). **Siempre un paso `humana`.**
- `recibe_quien` y `resultado`: lo que encuentra la persona al final, con la hora en **negritas**.
- `firma`: quién decide y qué decide, con la evidencia que tiene a la vista.

### `construye` · lámina "¿Cómo se construye?"
- `titulo`: qué lee, qué escribe y qué deja a una persona. Fórmula: "El agente de [X] lee [datos], escribe solo [acciones] y deja [decisión] a una persona".
- `canales` y `personas`: dónde se pide y quién participa.
- `herramientas`: conectores (al ERP, al banco, WhatsApp Business), lectores (PDF, fotos, correo) y modelos clásicos.
- `cerebro`: 3 a 6 entidades del contexto común (clientes, facturas, pedidos, catálogo, políticas, historial).
- `sistemas`: 2 a 5 sistemas de registro con acceso `lee`, `escribe` o `lee y escribe`. **Al menos uno con escritura.** Usa los nombres que dio el directivo; si no los dio, los típicos de su industria y un prerrequisito "validar con TI".
- `autonomia`: 3 a 4 acciones con N1, N2 o N3. Al menos una N1 y al menos una N2 o N3. Lo que salió en P9 es N2 o N3.
- `prerrequisitos`: 2 a 3 condiciones de datos o permisos, concretas.
- `ruta`: siempre tres fases (diagnóstico, piloto con grupo de control, escala) con semanas y un entregable medible en cada una. El piloto define qué se compara contra qué.

## Paso 3 · El resto del deck

| Sección | Cómo se llena |
|---|---|
| `portada` | Título por omisión: "Cinco sistemas agénticos para [Empresa]". Subtítulo: "Dónde mueven ventas, margen y capital de trabajo". |
| `resumen` | Situación, complicación y resolución, 2 a 3 oraciones cada una. Las **negritas** leídas en orden deben contar la conclusión completa. `porque_arranque`: una oración. |
| `empresa`, `fuerzas`, `mapa_valor`, `casos_industria`, `matriz_casos` | De `investigacion.md` (ver la tabla al final de `01-investigacion.md`). En `mapa_valor` marca con `agentes` qué subfunción atiende cada agente. En `matriz_casos` marca `es_prioridad: true` en los que se volvieron agentes. Un elemento `destacado` por lámina, el más relevante. |
| `diagnostico` | Cinco dolores (uno por agente, mismo orden), con la cita textual del directivo y `estado`. Si el dolor se confirmó eligiendo una opción y no hay frase del directivo, `cita` es la descripción que confirmó (una oración) y `cita_textual: false`: la lámina la muestra como "Confirmó: …" y no como cita. Nunca uses como cita la letra de la opción ("Los dos pasan así"). Hasta tres `otras_palancas`. |
| `que_es.ejemplo` | Cómo se ve el agente de arranque con las cinco pruebas, en dos oraciones, con la meta en **negritas**. |
| `cinco_agentes` | Solo `titulo` y `fuente`; la tabla sale de `agentes`. |
| `impacto` | `titulo` sobre qué resultados mueven y cuál mueve primero. `lectura`: aclara que no hay cifras de dinero y que cada fórmula se calcula con sus datos en el diagnóstico. |
| `olas` | 2 a 3 olas en meses. La ola 1 empieza en el mes 0 e incluye el agente de arranque. El criterio: primero lo que tiene datos listos y paga rápido; después lo que comparte datos con lo anterior; al final lo que necesita validar hipótesis. Hasta 2 hitos por ola. `regla`: piloto con grupo de control y resultado firmado por Finanzas. |
| `siguientes` | Plan de 90 días del agente de arranque, en 4 pasos (semanas 1–2, 3–4, 5–8, 9–12), cada uno con quién lo hace. `necesita`: lo mínimo que la empresa pone para empezar (un dueño de negocio, un acceso, unas horas a la semana), con **negritas**. Si hubo respuesta en `exito_90_dias`, el paso de semanas 9–12 la usa como criterio. Sin mencionar a CRITERIUM. |

## Fuentes al pie

Cada lámina con datos lleva su línea de fuente: los datos de la empresa y de la industria con fuente y año; lo que viene de la conversación como "Conversación con [rol] de [Empresa], [mes año]"; los días del agente como "Demostración conceptual". Nunca "diversos estudios" ni "expertos".

## Lo que nunca va en el deck

- Cifras de dinero en impacto, agentes, olas o siguientes pasos (el validador lo rechaza).
- Datos de la empresa sin fuente o inventados.
- Promesas de reducción de personal; se habla de horas devueltas y de capacidad.
- Venta de CRITERIUM, contacto, precios o "contáctenos".
- Nombres de personas reales de la empresa (se usan roles).
