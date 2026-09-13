export const opportunityStates = [
  'draft','submitted','verification','compliance_review','approved','published','suspended','archived',
] as const;

export type OpportunityState = typeof opportunityStates[number];

const opportunityTransitions: Record<OpportunityState, readonly OpportunityState[]> = {
  draft: ['submitted'],
  submitted: ['verification'],
  verification: ['compliance_review','suspended'],
  compliance_review: ['approved','suspended'],
  approved: ['published','suspended'],
  published: ['suspended','archived'],
  suspended: ['verification','archived'],
  archived: [],
};

export function canTransitionOpportunity(from: OpportunityState, to: OpportunityState): boolean {
  return opportunityTransitions[from].includes(to);
}

export const transactionStates = [
  'interest','qualified','nda_pending','nda_signed','data_room','diligence','offer','negotiation','accepted','contracted','closing','completed','rejected','withdrawn',
] as const;

export type TransactionState = typeof transactionStates[number];

const transactionTransitions: Record<TransactionState, readonly TransactionState[]> = {
  interest: ['qualified','rejected','withdrawn'],
  qualified: ['nda_pending','rejected','withdrawn'],
  nda_pending: ['nda_signed','withdrawn'],
  nda_signed: ['data_room','withdrawn'],
  data_room: ['diligence','withdrawn'],
  diligence: ['offer','withdrawn'],
  offer: ['negotiation','accepted','rejected','withdrawn'],
  negotiation: ['offer','accepted','rejected','withdrawn'],
  accepted: ['contracted','withdrawn'],
  contracted: ['closing','withdrawn'],
  closing: ['completed','withdrawn'],
  completed: [],
  rejected: [],
  withdrawn: [],
};

export function canTransitionTransaction(from: TransactionState, to: TransactionState): boolean {
  return transactionTransitions[from].includes(to);
}

export class InvalidTransitionError extends Error {
  constructor(public readonly entity: string, public readonly from: string, public readonly to: string) {
    super(`Invalid ${entity} transition: ${from} -> ${to}`);
    this.name = 'InvalidTransitionError';
  }
}
