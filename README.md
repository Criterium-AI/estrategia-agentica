# Estrategia de sistemas agénticos · CRITERIUM

Un agente para Claude Code que prepara la **estrategia de sistemas agénticos de tu empresa** y te la entrega como una presentación de PowerPoint de 28 láminas.

Funciona en tres partes:

1. **Investiga** tu empresa y su industria en internet (unos 8 minutos, sin preguntas).
2. **Platica contigo** con máximo 12 preguntas, unos 15 minutos, para encontrar dónde pierde valor tu empresa.
3. **Arma la presentación** con cinco sistemas agénticos, es decir, agentes de IA que mueven ventas, margen o capital de trabajo. De cada uno explica qué hace, cómo funciona, cómo se construye y por dónde empezar.

La presentación queda guardada en tu computadora. Tus respuestas no se envían a nadie.

---

## Qué necesitas (una sola vez)

1. **Claude Code**, en la terminal o en la aplicación de escritorio de Claude (pestaña Code).
2. **Un plan de Claude con acceso a Opus 5.5.**
3. **Node.js**: entra a [nodejs.org](https://nodejs.org), descarga la versión **LTS** (botón verde) e instálala aceptando los pasos. Tarda 5 minutos.

Opcional: [LibreOffice](https://www.libreoffice.org) permite que el agente revise visualmente cada lámina antes de entregártela. Sin LibreOffice la presentación sale igual.

## Cómo se instala (dos comandos)

Abre Claude Code y escribe, uno por uno:

```
/plugin marketplace add https://github.com/Criterium-AI/estrategia-agentica
```

```
/plugin install criterium@criterium
```

Si Claude Code te pregunta dónde instalarlo, elige **para mi usuario** (user).

## Cómo se usa

1. Abre Claude Code en la carpeta donde quieres guardar la presentación, por ejemplo Documentos.
2. Escribe `/model` y elige **Opus 5.5**.
3. Escribe el comando con el nombre de tu empresa:

```
/criterium:estrategia-ia Nombre de tu empresa
```

   Escribe siempre el nombre de la empresa en el comando. Si quieres, agrega su página: `/criterium:estrategia-ia Nombre de tu empresa tuempresa.com`.

4. Contesta las preguntas. Puedes escribir libremente o elegir entre las opciones.

Durante el análisis, Claude Code puede pedirte permiso para buscar en internet o para armar la presentación. Elige **Sí** (o **Sí, y no volver a preguntar**).

Al final encontrarás la carpeta `Estrategia IA - Nombre de tu empresa` con:
- `Nombre de tu empresa - Estrategia de sistemas agénticos.pptx`: la presentación.
- `investigacion.md`: lo que el agente encontró de tu empresa y tu industria, con fuentes.
- `discovery.json`: tus respuestas.

## Qué contiene la presentación

| Láminas | Contenido |
|---|---|
| 1–2 | Portada y resumen ejecutivo |
| 3–7 | Tu empresa, las fuerzas de tu industria, dónde se juega el valor y dónde la IA ya da resultados |
| 8–10 | Lo que escuchamos, qué es un sistema agéntico y los cinco agentes elegidos |
| 11–25 | Tres láminas por agente: cómo trabaja, cómo funciona y cómo se construye |
| 26–28 | Impacto sobre ventas, margen y capital de trabajo, por dónde empezar y los siguientes 90 días |

## Preguntas frecuentes

**¿Cuánto tarda?** Entre 35 y 45 minutos en total; tu parte son unos 15.

**¿Puedo dejarlo a la mitad?** Sí. Si vuelves a correr el comando en la misma carpeta, el agente te ofrece retomar donde se quedó.

**¿Qué pasa con mis respuestas?** Se quedan en tu computadora, en la carpeta de la presentación. El agente solo hace búsquedas públicas en internet sobre tu empresa y tu industria.

**¿Las cifras son exactas?** Las cifras públicas llevan su fuente. El impacto se expresa como magnitud (grande, mediano o chico), con la fórmula para que tu equipo lo calcule con sus propios datos. Lo que el agente no pudo confirmar aparece marcado como "por validar".

**Me salió un mensaje de que falta Node.js.** Instálalo desde [nodejs.org](https://nodejs.org) (versión LTS), cierra y vuelve a abrir Claude Code, y corre otra vez el comando.

---

Preparado con la metodología CRITERIUM. Ver [LICENSE](LICENSE).
