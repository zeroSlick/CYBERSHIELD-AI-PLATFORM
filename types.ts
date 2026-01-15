
export enum UserRole {
  SOC = 'SOC',
  DFIR = 'DFIR',
  SYS = 'SYS',
  INT = 'INT'
}

export interface User {
  id: string;
  username: string;
  email: string;
  role: UserRole;
  isActive: boolean;
  lastLogin: string;
  department?: string;
}

export enum Severity {
  INFORMATIONAL = 'P5 - INFO',
  LOW = 'P4 - LOW',
  MEDIUM = 'P3 - MEDIUM',
  HIGH = 'P2 - HIGH',
  CRITICAL = 'P1 - CRITICAL'
}

export enum IncidentStatus {
  OPEN = 'OPEN',
  INVESTIGATING = 'INVESTIGATING',
  CLOSED = 'CLOSED',
  RESOLVED = 'RESOLVED'
}

export interface Threat {
  id: string;
  type: string;
  severity: Severity;
  riskScore: number;
  confidence: number;
  timestamp: string;
  sourceIp: string;
  targetUser: string;
  status: 'DETECTED' | 'MITIGATED' | 'ESCALATED';
}

export interface Incident {
  id: string;
  title: string;
  severity: Severity;
  status: IncidentStatus;
  assignedAnalyst: string | null;
  createdAt: string;
  updatedAt: string;
  relatedThreatIds: string[];
}

export interface ForensicCase {
  id: string;
  caseNumber: string;
  title: string;
  incidentIds: string[];
  evidence: Evidence[];
  status: 'ACTIVE' | 'ARCHIVED';
  createdAt: string;
  investigatorId: string;
}

export interface Evidence {
  id: string;
  name: string;
  type: 'LOG' | 'EMAIL' | 'FILE' | 'NETWORK';
  sha256: string;
  verificationStatus: 'VERIFIED' | 'FAILED' | 'PENDING';
  timestamp: string;
}

export interface AuditLog {
  id: string;
  timestamp: string;
  userId: string;
  action: string;
  resource: string;
  details: string;
}
