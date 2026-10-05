export interface Project {
  id: string;
  title: string;
  subtitle: string;
  category: 'Real-Time & ADAS' | 'Analytics & Performance' | 'Full Stack Architecture';
  period: string;
  company: string;
  summary: string;
  image: string;
  tags: string[];
  metrics: { label: string; value: string }[];
  bulletPoints: string[];
  architectureDetails: {
    overview: string;
    keyChallenges: string[];
    technicalSolutions: string[];
    stack: string[];
  };
}

export interface WorkExperience {
  id: string;
  role: string;
  company: string;
  period: string;
  location: string;
  type: string;
  summary: string;
  achievements: string[];
  technologies: string[];
  keyMetrics: { label: string; value: string }[];
}

export interface SkillCategory {
  title: string;
  description: string;
  skills: {
    name: string;
    level: string;
    highlight?: boolean;
    useCase: string;
  }[];
}

export interface TelemetryDataPoint {
  timestamp: number;
  speed: number;
  rpm: number;
  latencyMs: number;
  radarDistanceMeters: number;
  batteryHealth: number;
  geofenceStatus: 'Secure' | 'Warning' | 'Breach';
  activeAlerts: string[];
}
