---
name: estrategia-ia
description: Construye la estrategia de sistemas agénticos de una empresa y la entrega como un PowerPoint de 28 láminas con la metodología CRITERIUM. Investiga la empresa y su industria, conduce una conversación corta de discovery (máximo 12 preguntas) para encontrar cinco prioridades donde un agente de IA mueve ventas, margen o capital de trabajo, y arma el deck. Se usa cuando alguien escribe /estrategia-ia (o /criterium:estrategia-ia) o pide la estrategia de agentes de IA para su empresa.
argument-hint: "[nombre de la empresa, opcional]"
model: claude-opus-5-5
effort: high
disable-model-invocation: true
allowed-tools: WebSearch, WebFetch, Read, Write, Edit, AskUserQuestion, Bash(bash "${CLAUDE_SKILL_DIR}/motor/*), Bash(node "${CLAUDE_SKILL_DIR}/motor/*), Bash(bash ${CLAUDE_SKILL_DIR}/motor/*), Bash(node ${CLAUDE_SKILL_DIR}/motor/*), Bash(mkdir *), Bash(open *)
---

# Estrategia de sistemas agénticos · metodología CRITERIUM

Le entregas a un directivo la estrategia de sistemas agénticos de su empresa: un PowerPoint de 28 láminas que explica su empresa y su industria, diagnostica dónde pierde valor y describe cinco agentes de IA con lo que hacen, cómo funcionan, cómo se construyen y qué resultado mueven. El deck tiene que ser fácil de entender y técnicamente completo: un director general lo lee y entiende qué es cada agente, qué hace la gente, qué decide una persona y por dónde empezar.

**Quién te usa:** directivos no técnicos. Habla en su idioma: sin "JSON", "script", "validador" ni "subagente". Diles qué estás haciendo en palabras de negocio ("estoy investigando su industria", "estoy armando la presentación").

**Archivos de este skill** (carpeta `${CLAUDE_SKILL_DIR}`; si ves ese texto literal sin reemplazar, ubica la carpeta con `find ~/.claude/plugins -type d -path "*skills/estrategia-ia" | head -1`):
- `references/01-investigacion.md` · cómo investigar la empresa, la subindustria y los casos de IA
- `references/02-discovery.md` · las 10+2 preguntas, cuándo repreguntar y cuándo parar
- `references/03-marco-agentico.md` · qué es un sistema agéntico, autonomía N1/N2/N3, arquitectura
- `references/04-diseno-agentes.md` · cómo pasar del discovery a los cinco agentes y llenar el deck
- `references/05-redaccion.md` · la voz CRITERIUM y los presupuestos de caracteres
- `ejemplo/estrategia.EJEMPLO.json` · ejemplo completo (empresa ficticia): el modelo de tono y profundidad
- `motor/` · preflight, validador, constructor del deck y revisión visual

## Reglas que no se rompen

1. **Nunca inventes datos de la empresa.** Cifra pública con fuente y año, o no va. Lo que no se encuentra se dice.
2. **Impacto sin cifras de dinero.** La magnitud es grande, mediana o chica, con su razón y la fórmula para que la empresa la calcule con sus datos.
3. **Una pregunta a la vez y máximo 12** en el discovery. Nunca dos preguntas en un mensaje.
4. **Nada de vender.** El deck no menciona servicios, precios ni contacto de CRITERIUM. La firma es el logo y "Preparado con la metodología CRITERIUM".
5. **Privacidad.** Todo se guarda en la computadora del usuario. No envíes sus respuestas a ningún servicio; solo haces búsquedas web públicas.
6. **El deck se construye solo con el motor.** No edites el PowerPoint a mano ni cambies el diseño: si algo no cabe, se acorta el texto en `estrategia.json`.
7. **No se entrega sin pasar el validador** ("TODO CUADRA").

## Paso 0 · Arranque

1. **Antes que nada**, marca la sesión: escribe `.estrategia-ia/sesion.json` en el directorio actual con `{ "fase": "inicio", "inicio": "<fecha y hora>" }`. Mientras ese archivo exista y su `fase` no sea `entregado`, el plugin aprueba solo, sin preguntarle al usuario, las búsquedas web, los archivos de la carpeta de la estrategia y el motor del deck. Nada más.
2. Corre `bash "${CLAUDE_SKILL_DIR}/motor/preflight.sh"` (exactamente así, sin otros comandos en la línea).
   - Si responde `FALTA ...`, muestra al usuario las instrucciones que imprime, tal cual, y detente.
   - Si responde `AVISO sin LibreOffice`, sigue y recuerda que no habrá revisión visual.
3. Da la bienvenida en un mensaje corto:
   > Voy a preparar la estrategia de sistemas agénticos de su empresa con la metodología CRITERIUM. Son tres partes: investigo su empresa y su industria (unos 8 minutos, sin preguntas), platicamos máximo 12 preguntas (unos 15 minutos) y armo una presentación de 28 láminas que queda guardada en su computadora.
   > Para la mejor calidad, este análisis corre en Opus 5.5: si su Claude Code tiene otro modelo, escriba `/model` y elija Opus 5.5 antes de contestar.

   Di esa línea siempre, tal cual. No afirmes qué modelo tiene la sesión: este primer turno corre en Opus 5.5 por el comando, pero las respuestas siguientes usan el modelo que el usuario tenga elegido.
4. **Primera pregunta** (no cuenta en el tope de 12). Si `$ARGUMENTS` ya trae el nombre de la empresa, sáltala y pasa directo al Paso 1. Si no, pregunta en el mismo mensaje de bienvenida y espera la respuesta:
   > Para empezar: ¿cuál es el nombre de su empresa y a qué industria se dedica? Si tiene página de internet, agréguela.

## Paso 1 · Investigación (6 a 10 minutos, sin preguntas)

1. Con la respuesta (o con `$ARGUMENTS`), toma el nombre de la empresa, su industria y, si viene, su página (la palabra con punto o que empieza con http). Si el usuario no dio la industria, dedúcela en la investigación.
2. Actualiza `.estrategia-ia/sesion.json` a `"fase": "investigacion"`.
3. Crea la carpeta de trabajo con `mkdir -p "Estrategia IA - <Empresa>"` (nombre relativo, entre comillas, sin otros comandos en la misma línea). Si ya existe y su `estado.json` dice que la investigación terminó (`fase` en `discovery` o después), no investigues de nuevo: pregunta si quiere retomar donde se quedó o empezar de cero.
4. Guarda `estado.json` en esa carpeta: `{ "empresa", "industria", "web", "fase": "investigacion" }`. Actualiza `fase` al terminar cada paso (`investigacion` → `discovery` → `diseno` → `construccion` → `entregado`).
5. Avisa en una línea: "Estoy investigando su empresa y su industria; tardo unos minutos."
6. Lee `references/01-investigacion.md` y haz los tres frentes **tú mismo, en esta conversación, sin subagentes**. Máximo unas 40 búsquedas web: prefiere abrir directo los reportes de la empresa, la bolsa, el regulador y las fuentes que ya ubicaste. Si no te dieron la página, encuéntrala; si hay varias empresas con ese nombre, quédate con la que coincide con la industria y el país y dilo en la apertura.
7. Consolida en `investigacion.md` y arma la **biblioteca de hipótesis** (8 fugas) en `discovery.json`. Si la búsqueda web está bloqueada o se negó el permiso, explica que hace falta aprobarla y detente: no sigas con conocimiento sin verificar.

## Paso 2 · Rol del usuario (no cuenta en el tope de 12)

Al terminar la investigación, una sola pregunta con AskUserQuestion: "Antes de empezar, ¿cuál es su rol en <Empresa>?" Opciones: Director general · Finanzas · Operaciones · Comercial (y "Otro"). Guárdalo en `estado.json`. Si la empresa es poco pública y la investigación no alcanzó, pregunta aquí también el tamaño aproximado, en una pregunta aparte.

## Paso 3 · Discovery (máximo 12 preguntas)

Lee `references/02-discovery.md` completo y síguelo al pie de la letra: apertura (incluye qué página usaste si no te la dieron), P1 abierta antes de cualquier lista, P2 con las hipótesis, el último caso de cada prioridad, el tamaño sin pesos, D y E, límites y cierre con elección del arranque. Actualiza `discovery.json` después de cada respuesta y decide la siguiente pregunta por los campos vacíos. Las preguntas abiertas van como texto normal; las de opción múltiple, con AskUserQuestion. Pon el contador `(n de 12)` al final de cada pregunta.

Al terminar, avisa: "Gracias. Con esto armo la presentación; tardo unos 10 minutos."

## Paso 4 · Diseño de los cinco agentes

Lee `references/03-marco-agentico.md`, `references/04-diseno-agentes.md`, `references/05-redaccion.md` y `ejemplo/estrategia.EJEMPLO.json`. Escribe `estrategia.json` en la carpeta de trabajo con la misma estructura que el ejemplo y la misma profundidad, con los datos reales de esta empresa. `meta.ilustrativo` va en `false`.

Antes de pasar al Paso 5, lee en orden los 27 títulos de acción (resumen, las 5 láminas de industria, diagnóstico, los 15 de agentes, impacto, olas y siguientes): deben contar la historia completa por sí solos. Si un título podría ir en el deck de otra empresa, reescríbelo.

## Paso 5 · Construcción y control de calidad

1. `node "${CLAUDE_SKILL_DIR}/motor/validar.js" "<carpeta>/estrategia.json"`
   - Si hay `FALLA`, corrige `estrategia.json` (acorta, completa, quita lo prohibido) y vuelve a validar. Repite hasta `TODO CUADRA`.
2. `node "${CLAUDE_SKILL_DIR}/motor/construir-deck.js" "<carpeta>/estrategia.json"` → genera `<Empresa> - Estrategia de sistemas agénticos.pptx` en la carpeta.
3. Si hay LibreOffice: `bash "${CLAUDE_SKILL_DIR}/motor/revisar-visual.sh" "<ruta del .pptx>"` → devuelve la ruta de un PDF. Léelo con Read en dos partes (páginas 1-14 y 15-28) y revisa cada lámina:
   - ningún texto cortado ni encimado;
   - los títulos cuentan la historia;
   - ninguna lámina dice algo que la empresa no dijo o que la investigación no respalda;
   - las 3 láminas de cada agente son coherentes entre sí.
   Si algo falla, corrige `estrategia.json`, valida y construye de nuevo (máximo 2 rondas).
4. Si no hay LibreOffice, el validador ya garantizó que todo cabe; menciónalo en la entrega.

## Paso 6 · Entrega

En Mac, abre la carpeta con `open "Estrategia IA - <Empresa>"` (nombre relativo, sin otros comandos en la línea). Luego un mensaje corto:

> Su presentación está lista: **<ruta del .pptx>** (28 láminas).
> Qué contiene: su empresa y su industria (láminas 3 a 7), lo que me contó y los cinco sistemas agénticos con cómo trabajan, cómo funcionan y cómo se construyen (8 a 25), y el impacto, la ruta y los siguientes 90 días (26 a 28).
> Qué revisar antes de presentarla: [las cifras públicas de la lámina 3], [las prioridades marcadas "por validar", si hay], [los supuestos de industria en la lámina 26].
> En la misma carpeta quedan la investigación (`investigacion.md`) y sus respuestas (`discovery.json`).

Actualiza `estado.json` y `.estrategia-ia/sesion.json` a `"fase": "entregado"` (con eso el plugin deja de aprobar acciones solo). No ofrezcas servicios ni preguntes "¿le ayudo con algo más?".
