# Investigación: empresa, subindustria y dónde la IA ya mueve resultados

La investigación tiene dos usos: llenar las láminas 3 a 7 del deck y preparar la **biblioteca de hipótesis** con la que el discovery arranca. Sin biblioteca no hay discovery corto. Dura 6 a 10 minutos, ocurre en el primer turno (el que lanza el comando) y no le hace ninguna pregunta al usuario.

## Reglas

- **Nunca inventar datos de la empresa.** Toda cifra de la empresa lleva fuente y año. Lo que no se encuentra se dice ("dato no público") y se usa una referencia de la subindustria, marcada como tal.
- **Vigencia:** prioriza fuentes de los últimos 18 meses. Si usas algo más viejo, pon el año.
- **Jerarquía de fuentes:** (1) reportes de la empresa, reguladores, estadística oficial; (2) consultoras y academia (McKinsey, BCG, Bain, Gartner, HBR, MIT); (3) prensa de negocios; (4) proveedores de tecnología, solo como señal y siempre marcados como "dato del proveedor".
- **Casos de industria reales:** empresa con nombre, qué hace el agente o la IA, resultado con número y fecha, y fuente. Si un caso no tiene fuente verificable, no entra.
- **Subindustria, no industria genérica.** "Distribución mayorista de material eléctrico para contratistas", no "retail". La subindustria define los casos de uso y las fugas de valor.

## Los tres frentes (tú mismo, en el primer turno)

Haz los tres frentes en esta conversación, uno tras otro, sin subagentes: los permisos de búsqueda del comando cubren el turno en que se lanzó y no está garantizado que alcancen a subagentes. Presupuesto: unas 40 búsquedas web en total (hay un tope por sesión); abre directo los documentos clave (reporte anual o trimestral, presentación a inversionistas, informe de sostenibilidad, eventos relevantes en la bolsa) en lugar de buscar cada dato por separado.

### Frente A · La empresa
Encargo: perfil verificable de la empresa.
- Qué vende, a quién, cómo gana dinero, cómo opera (canales, plantas, sucursales, logística).
- Tamaño: ventas, colaboradores, sucursales o plantas, geografía. Solo cifras públicas con fuente y año.
- Posición competitiva: con quién compite y en qué gana o pierde.
- Noticias de los últimos 18 meses: expansión, adquisiciones, problemas operativos, inversiones en tecnología o IA.
- Sistemas que se pueden inferir (vacantes que piden SAP, Oracle, Salesforce; portales de clientes o proveedores; WhatsApp de ventas).
- Si la empresa es poco pública: dilo, y describe el perfil típico de una empresa de su tamaño y subindustria.

### Frente B · Industria y subindustria
Encargo: las fuerzas que hoy mueven ventas, margen y capital de trabajo en la subindustria, en el país de la empresa.
- 4 a 5 fuerzas con dato y fuente: demanda, precios, costo, regulación, competencia, cadena de suministro, talento, crédito.
- Para cada fuerza: qué resultado presiona (ventas, margen o capital de trabajo) y qué implica para una empresa como esta.
- Cadena de valor de la subindustria en 6 a 8 subfunciones (por ejemplo: cotización, crédito y cobranza, compras, logística, servicio, precios), con dónde se pierde valor típicamente en cada una.
- Líneas base útiles cuando existan: días de cartera, días de inventario, margen bruto típico, rotación, costo de servir.

### Frente C · Dónde la IA ya mueve la aguja
Encargo: casos reales de IA y de agentes en la subindustria o en industrias vecinas con el mismo proceso.
- 8 a 12 casos con empresa, subfunción, qué hace la IA o el agente, resultado medido con número, fecha y fuente.
- Distingue: agente (actúa en varios pasos y sistemas), IA generativa (lee o redacta), modelo clásico (predice u optimiza). Marca cuál es cada caso.
- Para cada subfunción de la cadena de valor: qué tan probado está el uso de IA (de emergente a probado, escala 1 a 5).
- Marca los datos de proveedor como tales.

## Consolidación: `investigacion.md`

Escribe el archivo en la carpeta de trabajo con estas secciones:
1. Perfil de la empresa (con fuentes).
2. Subindustria y fuerzas (4 a 5, con dato, palanca e implicación).
3. Cadena de valor: 6 a 8 subfunciones con intensidad 0 a 3 en ventas, margen y capital de trabajo, y dónde se pierde valor hoy.
4. Casos de IA en la industria (8 a 12), con tipo, resultado, fecha y fuente.
5. Biblioteca de hipótesis (abajo).
6. Lo que no se encontró.

## Biblioteca de hipótesis (insumo del discovery)

Ocho fugas de valor de esta subindustria, en lenguaje llano, ordenadas por cadena de valor (no por importancia). Cada una con:

| Campo | Ejemplo (distribución de material eléctrico) |
|---|---|
| `fuga` (en palabras del directivo) | "Cotizaciones grandes que tardan días en salir" |
| `palanca` | ventas |
| `kpi` típico | Horas de respuesta por cotización; conversión |
| `rol` que hoy hace el trabajo | Vendedor |
| `sistemas` típicos | Correo, WhatsApp, ERP, catálogo de marcas |
| `magnitud_referencia` con fuente | "Distribuidores que responden en el día ganan más pedidos (fuente, año)" |
| `forma_agente` | alta / media / baja (con las seis señales del marco) |
| `alternativa` no agéntica | Portal de autoservicio con precios publicados |

Incluye al menos dos fugas de back office (cobranza, conciliación, cuentas por pagar, fiscal): el valor medible de los agentes suele estar ahí y es menos visible.

Guarda la biblioteca en `discovery.json` → `hipotesis` (ver `02-discovery.md`).

## Cómo se usa en el deck

| Lámina | Sale de |
|---|---|
| 3 · La empresa | Perfil: descripción, modelo (4 bloques), 3 a 4 cifras con fuente, posición |
| 4 · Fuerzas | 4 a 5 fuerzas |
| 5 · Mapa de valor | Cadena de valor con intensidades; marca qué subfunción atiende cada agente (A1 a A5) |
| 6 · Casos de la industria | 4 a 6 casos con más relevancia para esta empresa; uno destacado |
| 7 · Matriz | 6 a 10 casos de uso por impacto potencial para esta empresa (1 a 5) y madurez en la industria (1 a 5); marca los que se volvieron prioridad |
