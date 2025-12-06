export type UserType = "brand" | "creator";

export type CampaignStatus = "draft" | "active" | "completed";

export type PaymentType = "fixed" | "barter" | "commission";

export type DeliverableType = "reels" | "stories" | "tiktok" | "shorts" | "photo" | "others";

export interface Campaign {
  id: string;
  name: string;
  objective: string;
  budget: number;
  remainingBudget: number;
  niche: string;
  deliverables: DeliverableType[];
  deadline: Date;
  paymentType: PaymentType;
  commissionPercentage?: number;
  status: CampaignStatus;
  approvedCreators: number;
  totalCandidates: number;
  createdAt: Date;
}

export interface Creator {
  id: string;
  name: string;
  avatar: string;
  followers: number;
  engagementRate: number;
  niche: string;
  bio: string;
}

export interface Proposal {
  id: string;
  campaignId?: string;
  campaignName?: string;
  creatorId: string;
  creatorName: string;
  creatorAvatar: string;
  message: string;
  creativeIdea: string;
  deliverables: DeliverableType[];
  proposedValue: number;
  portfolioUrl?: string;
  status: "pending" | "accepted" | "rejected" | "negotiating";
  createdAt: Date;
  type: "brand" | "creator";
}

export interface DashboardStats {
  totalCampaigns: number;
  proposalsSent: number;
  proposalsReceived: number;
  ongoingNegotiations: number;
  approvals: number;
  completions: number;
}
