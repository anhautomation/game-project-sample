type BetHeaderTab = {
  url: string;
  name: string;
};

declare interface BetHeaderProps {
  url: string;
  logo: string;
  tabs: BetHeaderTab[];
}

declare interface BetSummaryProps {
  queryKey: string;
  queryUrl: string;
}

declare interface SummaryResponse {
  round: number;
  hashCode: string;
  saltCode: string;
  minAmount: number;
  maxAmount: number;
}
