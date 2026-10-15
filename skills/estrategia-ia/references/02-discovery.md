# Discovery: máximo 12 preguntas para encontrar cinco prioridades

Este método sale de una investigación de 44 fuentes: Anthropic Interviewer, LSE/NBER sobre entrevistas con IA, NORC sobre el costo de repreguntar, Pew y Krosnick sobre diseño de preguntas, McKinsey, BCG, Gartner, SPIN, Gap Selling, MEDDICC, JTBD y The Mom Test. Síguelo al pie de la letra. Lo que más daña un discovery con IA es preguntar en general, mostrar opciones antes de escuchar y no repreguntar cuando la respuesta sorprende.

## Las reglas

1. **Cero preguntas de situación.** Lo que la investigación ya sabe (qué hace la empresa, su tamaño, su industria) no se pregunta. Cada pregunta se gasta en dolor, consecuencia y valor.
2. **Primero se pregunta abierto, después se muestra la lista.** Si la lista va primero, la persona elige lo ofrecido y deja de contar su caso real (Pew: 58% elige una opción ofrecida; solo 35% la menciona sin lista).
3. **Se pide la última vez que pasó, no opiniones.** "Platíqueme la última vez que…" da hechos. "¿Qué le quita el sueño?" o "¿dónde ve oportunidades de IA?" dan generalidades.
4. **Una cosa por pregunta.** Nunca dos preguntas en un mensaje. Nunca "¿y además…?".
5. **Se repregunta por regla, no por reflejo** (ver abajo). Las repreguntas generan casi todo el valor, pero cada una cuesta paciencia.
6. **El tamaño se pregunta sin pesos**, en unidades que el directivo conoce: personas de tiempo completo, pedidos de cada 100, días de caja, gravedad del peor caso.
7. **Neutralidad.** No elogies las respuestas ("excelente punto"), no resumas a media plática, no confirmes con "¿correcto?" (infla los sí falsos). La devolución va solo al cierre.
8. **Lenguaje de la operación.** Trato de usted, español de directivo mexicano. Sin "agente", "LLM", "KPI", "orquestación", "IA agéntica" durante las preguntas. Se dice "un sistema que haga esto solo y le avise a alguien".
9. **Nunca muestres etiquetas internas** (A, B, C; "slot"; "ficha"; JSON). El directivo ve una conversación.

## Conteo

**Máximo 12 preguntas: 10 planeadas y 2 de reserva para repreguntar.** Una pregunta es cada cosa que la persona tiene que contestar. Si las de reserva no se usan, la conversación termina en 10; más corto es mejor. Al final de cada pregunta pon un contador discreto, por ejemplo `(3 de 12)`.

## Insumo previo: la biblioteca de hipótesis

Viene de la investigación (`01-investigacion.md`): ocho fugas de valor de la subindustria. Cada una trae resultado que mueve, KPI típico, rol, sistemas, magnitud de referencia, forma de agente (alta, media o baja) y alternativa no agéntica. Con eso la conversación solo **elige, concreta y corrige**.

## Estado: `discovery.json`

Guárdalo en la carpeta de trabajo **después de cada respuesta** y decide la siguiente pregunta por los campos vacíos. Si una narración llena varios campos de golpe, no se vuelven a preguntar.

```json
{
  "preguntas_usadas": 0,
  "hipotesis": [ { "fuga": "", "palanca": "ventas|margen|capital", "kpi": "", "rol": "", "sistemas": [], "magnitud_referencia": "", "forma_agente": "alta|media|baja", "alternativa": "" } ],
  "prioridades": [
    {
      "clave": "A",
      "fuga": "",
      "palanca": "ventas|margen|capital",
      "cita": "frase textual del directivo",
      "reto":     { "valor": "", "estado": "confirmado|inferido|supuesto|vacio" },
      "kpi":      { "valor": "", "estado": "" },
      "tamano":   { "valor": "grande|mediano|chico", "unidad": "", "estado": "" },
      "quien":    { "valor": "", "estado": "" },
      "sistemas": { "valor": [], "estado": "" },
      "limites":  { "valor": [], "estado": "" },
      "senales_agente": 0
    }
  ],
  "limites_generales": [],
  "arranque": "",
  "exito_90_dias": "",
  "otras_palancas": [ { "dolor": "", "tipo": "automatizacion|analitica|proceso", "por_que": "" } ],
  "cansancio": false
}
```

## La conversación

### Apertura (no cuenta como pregunta)
Un mensaje corto, sin pregunta al final:

> Antes de esta plática revisé [Empresa] y cómo opera su industria. En corto entiendo que [2 o 3 líneas concretas de la investigación]. Si algo está mal, corríjame cuando quiera.
> Son máximo 12 preguntas, unos 15 minutos; varias son de opción. No necesito montos en pesos: con órdenes de magnitud me basta. Al final le muestro lo que entendí.

Y enseguida la pregunta 1.

### P1 · Ancla abierta (texto libre; sin opciones, a propósito)
> Piense en los últimos tres meses. ¿Cuál fue la situación concreta en la que la empresa perdió más tiempo, dinero o un cliente? Platíqueme ese caso tal como pasó. (1 de 12)

Lo que dice aquí es la prioridad con más peso. Guarda la frase textual en `cita`.

### P2 · Hipótesis (lista numerada en texto; la persona contesta con números)
La herramienta de opción múltiple solo admite 4 opciones, así que la lista va en texto:
> En empresas de [subindustria] el valor se suele ir por alguno de estos puntos. ¿Cuáles le pegan hoy con más fuerza? Elija hasta tres; si ninguno aplica, también me sirve saberlo. (2 de 12)
> 1. … (las 8 fugas, en orden de la cadena de valor, en una línea cada una)
> 9. Ninguna de estas
> 10. Otra: ¿cuál?

### Cómo se eligen las prioridades A, B y C
Cruza tres cosas: lo que dijo en P1 y P2, la forma de agente de la biblioteca y la magnitud de referencia. A es casi siempre lo de P1. Si el dolor de P1 no tiene forma de agente (por ejemplo, "no vemos el número"), usa a lo más una pregunta de reserva para buscar su parte agéntica (por ejemplo, "armar el reporte copiando de cinco sistemas y explicar las variaciones"). Si no la tiene, va a `otras_palancas`.

### P3, P5 y P7 · El último caso de A, B y C (texto libre)
> Vamos con [prioridad, en sus palabras]. Platíqueme la última vez que pasó, paso a paso, desde que empieza hasta que queda resuelto. (3 de 12)

De la narración saca: quién lo hace, en qué sistemas, si cada caso es distinto y qué pasos sobran. **Solo si falta un campo crítico** usa una repregunta, una por campo:
- Quién: "¿Quién, por puesto, hace ese trabajo hoy? ¿Es su trabajo principal o lo hace además de lo suyo?"
- Sistemas: "¿En qué lugares tienen que buscar o capturar la información? Por ejemplo, el sistema administrativo, correo, Excel, WhatsApp o el portal del cliente."
- Forma de agente: "¿Todos los casos se resuelven igual, o alguien tiene que leer y decidir caso por caso?"
- Rediseño: "Si lo armara desde cero, ¿qué pasos de estos sobran?"

### P4 y P6 · Tamaño de A y B (opción múltiple: 4 rangos; la herramienta agrega "Otro")
Elige la variante según el tipo de fuga:
- **Gente:** "Sin pensar en pesos, ¿cuánto tiempo de su gente se va en esto?" → Unas horas al mes · Unas horas a la semana · Entre 1 y 3 personas de tiempo completo · Más de 3 personas
- **Clientes:** "Pensando en el último mes, ¿de cada 100 pedidos, cuántos se vieron afectados?" → Menos de 1 · Entre 1 y 5 · Entre 5 y 15 · Más de 15
- **Caja:** "¿Cuántos días de más tarda en entrar el dinero por esto?" → Menos de 5 · Entre 5 y 15 · Entre 15 y 30 · Más de 30
- **Riesgo:** "Si sale mal, ¿qué tan grave es el peor caso realista?" → Molestia interna · Perder un cliente · Multa o sanción · Riesgo para la operación o la reputación

Si contesta "no sé" (usa la reserva): "¿Diría que es más o menos que [punto medio de referencia]?" y luego "¿más o menos que [siguiente umbral]?". Si sigue sin saber, usa la referencia de industria y márcala `supuesto`.

El tamaño de C se infiere de su narración y se confirma en P10.

### P8 · D y E: dos hipótesis no tocadas (opción múltiple)
Elige las dos fugas de la biblioteca con forma de agente alta que no salieron.
> Hay dos temas que en [subindustria] suelen pesar y que no hemos tocado. Uno: [una línea: qué pasa, quién lo hace, qué número mueve]. Dos: [ídem]. ¿Cómo se ven en su empresa? (8 de 12)
> Opciones: Los dos pasan así · Solo el primero · Solo el segundo · Ninguno (y "Otro" para "pasa, pero distinto")

Si contesta "pasa, pero distinto", la frase que escriba va a `cita`. Repregunta posible: "¿Qué parte de la descripción no se parece a lo que pasa aquí?". Si dice "ninguno", toma la siguiente fuga con forma de agente alta y márcala `hipotesis` (la prioridad sale como "hipótesis por validar").

### P9 · Límites (opción múltiple con selección múltiple)
> Imagine un sistema que hace estos trabajos solo y le avisa a alguien cuando algo se sale de lo normal. ¿Qué no debería hacer nunca sin que una persona lo apruebe? (9 de 12)
> Opciones (varias): Mover dinero o autorizar pagos · Escribirle a clientes o proveedores · Cambiar precios o condiciones de crédito · Modificar datos de clientes, productos o proveedores (y "Otro": temas fiscales, legales o de personal)

Repregunta posible: "¿A partir de qué monto o qué tipo de caso tendría que avisarle a alguien?". Lo que conteste define las acciones N2 y N3 de cada agente.

### P10 · Cierre: devolución y elección (texto libre)
> Esto entendí, una línea por tema:
> 1) [A]: [reto] → mueve [KPI]; tamaño [grande]; hoy lo hace [rol] en [sistemas].
> … (las cinco; marca "por validar" lo que es supuesto)
> Si mañana pudiera arrancar solo una en 90 días, ¿cuál sería? Si algo está mal o falta, dígamelo aquí mismo. (10 de 12)

Reserva posible: "¿Qué tendría que pasar para que eso se considere un éxito en 90 días?". Va a `exito_90_dias` y alimenta la última lámina.

## Cuándo repreguntar (con las 2 de reserva)

**Sí:**
- Falta o es ambiguo un campo crítico (reto o KPI).
- La respuesta es genérica ("siempre", "en general", "todo"): pide la última vez, una sola vez.
- La respuesta sorprende o contradice la investigación o algo que dijo antes. Esto es lo que la IA suele omitir, así que hazlo explícito: "Me llama la atención que eligió [X]; en su industria suele pesar menos. ¿Qué lo hace pesar tanto aquí?"
- Contesta "no sé" en un campo crítico: reformula una vez desde otro ángulo.

**No:**
- El campo se puede llenar con la referencia de industria sin cambiar la prioridad.
- La respuesta ya es específica.
- Ese campo ya se repreguntó.
- Quedan 2 preguntas o menos (P10 se protege siempre).

## Cuándo parar

Para con lo primero que ocurra:
1. Las cinco prioridades tienen ficha suficiente: ve directo a P10 aunque falten preguntas.
2. Se llegó a 12.
3. **Cansancio**: dos respuestas seguidas de una línea, "lo que usted diga" o un aviso de prisa. Pasa a modo exprés: P9 y P10, nada más. Marca `cansancio: true`.
4. La persona pide terminar: P10 inmediata.

**Ficha suficiente:** reto `confirmado`; KPI y quién `confirmado` o `inferido`; tamaño, sistemas y límites al menos `supuesto`. Con 3 o más campos `supuesto`, la prioridad sale en el deck como hipótesis por validar (`estado: "hipotesis"`).

## Respaldos

| Situación | Qué haces | Cómo queda en el deck |
|---|---|---|
| No sabe el tamaño | Frecuencia × gente → escalera "¿más o menos que X?" → referencia de industria | Origen "referencia de industria" |
| No sabe los sistemas | Muestra la lista típica de su industria; pregunta "¿quién sabría?" | Prerrequisito "validar con [rol]" |
| No sabe quién lo hace | Lo conviertes en contacto | "Responsable por confirmar" |
| Contradice una hipótesis | Gana el directivo; anota por qué | Es un rasgo propio de su empresa |
| Responde "Otra" | Es una prioridad nueva; puede desplazar a D o E | — |
| Tema de personal (despidos) | Se habla de "liberar capacidad" | El deck habla de horas devueltas, nunca de recortes |

## Magnitud (para `tamano` y para el deck)

- **Grande:** más de 3 personas de tiempo completo, o más de 5% de pedidos afectados, o más de 15 días de caja, o riesgo de sanción.
- **Mediano:** entre 1 y 3 personas, o entre 1 y 5% de pedidos, o entre 5 y 15 días de caja, o pérdida de clientes.
- **Chico:** el resto.

Cada magnitud lleva su origen: `empresa` (lo dijo el directivo), `calculado` (sale de sus respuestas) o `industria` (referencia externa).

## Errores que no se cometen

Preguntas genéricas · preguntas que inducen ("¿no cree que un sistema le ayudaría…?") · hipotéticos ("¿lo usaría?") · pedir montos o datos que no tiene · dos preguntas en una · "¿correcto?" · elogiar o resumir a media plática · repreguntar todo · lista antes de la pregunta abierta · jerga · llamar agente a lo que es un tablero o un robot de reglas · proponer "IA para todos" · olvidar el back office (cobranza, conciliación, cuentas por pagar).
