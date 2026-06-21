// Tipo compartido para preguntas de quizzes y exámenes.
export interface ExamQuestion {
  /** Enunciado de la pregunta. */
  q: string;
  /** Opciones de respuesta. */
  options: string[];
  /** Índice (0-based) de la opción correcta. */
  answer: number;
  /** Explicación que se muestra al corregir. */
  explain?: string;
}
