import type { IconName } from "./icons";
import type { PathSlug } from "./paths";
import type { ExamQuestion } from "./questions";

export interface StudyResource {
  name: string;
  platform: string;
  type: "video" | "doc" | "course" | "guide";
  url: string;
  free: boolean;
  desc: string;
}

export interface DomainLabMapping {
  domainName: string;
  labIds: string[];
}

export interface Certification {
  slug: string;
  name: string;
  /** Código del examen, ej: CLF-C02. */
  code: string;
  vendor: string;
  /** Iniciales para el badge, ej: AWS / C+. */
  badge: string;
  /** Arte oficial público del badge, si existe. */
  badgeImage?: string;
  level: string;
  icon: IconName;
  /** Color de marca del vendor. */
  accent: string;
  summary: string;
  /** Consejos estratégicos para el examen. */
  prepTips: string[];
  /** Recursos recomendados con protagonismo. */
  studyResources: StudyResource[];
  /** Mapeo de labs por dominio. */
  domainLabs: DomainLabMapping[];
  /** Datos logísticos del examen real (aprox., verificá la guía oficial). */
  meta: {
    /** Cantidad de preguntas del examen real. */
    questions: number;
    /** Duración en minutos. */
    durationMin: number;
    /** Puntaje para aprobar (ej: "700/1000"). */
    passingScore: string;
    /** Costo aproximado en USD. */
    cost: string;
    /** Validez de la certificación en años. */
    validityYears: number;
    /** Formato de las preguntas. */
    format: string;
  };
  /** Lo que sabés hacer al certificarte. */
  outcomes: string[];
  /** Dominios del examen con su peso. */
  domains: { name: string; weight: number }[];
  /** Rutas de Open Security Labs que preparan para esta certi. */
  relatedPaths: PathSlug[];
  /** Examen de práctica (preguntas propias). */
  exam: ExamQuestion[];
}

import { awsCloudPractitioner } from "./certifications/aws-cloud-practitioner";
import { comptiaSecurityPlus } from "./certifications/comptia-security-plus";
import { comptiaNetworkPlus } from "./certifications/comptia-network-plus";
import { comptiaLinuxPlus } from "./certifications/comptia-linux-plus";
import { awsSolutionsArchitectAssociate } from "./certifications/aws-solutions-architect-associate";
import { hashicorpTerraformAssociate } from "./certifications/hashicorp-terraform-associate";
import { certifiedKubernetesAdministrator } from "./certifications/certified-kubernetes-administrator";
import { comptiaCysaPlus } from "./certifications/comptia-cysa-plus";
import { elearnsecurityJuniorPenetrationTester } from "./certifications/elearnsecurity-junior-penetration-tester";

export const certifications: Certification[] = [
  awsCloudPractitioner,
  comptiaSecurityPlus,
  comptiaNetworkPlus,
  comptiaLinuxPlus,
  awsSolutionsArchitectAssociate,
  hashicorpTerraformAssociate,
  certifiedKubernetesAdministrator,
  comptiaCysaPlus,
  elearnsecurityJuniorPenetrationTester,
];

export function getCertification(slug: string): Certification | undefined {
  return certifications.find((c) => c.slug === slug);
}
