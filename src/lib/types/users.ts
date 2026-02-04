// Base address interface
export interface UserAddress {
  country: string;
  cityState: string;
  roadArea: string;
  postalCode: string;
  taxId: string;
}

// Social links interface
export interface SocialLinks {
  linkedin: string;
  instagram: string;
  facebook: string;
  youtube: string;
  tiktok: string;
}

// Facebook page/business interfaces
export interface FacebookPage {
  id?: string;
  name?: string;
  access_token?: string;
  // Add other relevant fields as needed
}

export interface FacebookBusiness {
  id?: string;
  name?: string;
  // Add other relevant fields as needed
}
export interface SubscriptionPlan {
  _id: string;
  name: string;
  price: number;
  billingCycle: "month" | "year";
  allowedListings: number;
  features: string[];
}


// Main user interface
export interface User {
  _id: string;

  name: string;
  firstName: string;
  lastName: string;
  fullName: string;

  email: string;
  phoneNumber: string;

  dob: string | null;
  gender: "male" | "female" | string;

  allowedListings: number;
  pagePictureUrl: string;

  followersCount: number | null;
  fanCount: number | null;
  totalPosts: number | null;

  adAccountId: string | null;
  pageAccessToken: string | null;
  instagramAccountId: string | null;
  facebookConnectedAt: string | null;

  jobTitle: string;
  companyName: string;
  websiteUrl: string;
  industryExperience: string;

  languagesSpoken: string[];

  profileImage: string;
  multiProfileImage: string[];
  pdfFile: string;
  profilePhoto: string;
  companyLogo: string;
  bannerImage: string;

  socialLinks: SocialLinks;

  preferredToneOfVoice: string[];
  postingFrequency: string;

  yachtTypesHandled: string[];
  averagePriceRange: string | null;
  primaryRegionsServed: string[];
  listingPlatformsUsed: string[];

  customHeadline: string;
  portfolioPageSlug?: string;
  qrCodeUrl: string;

  role: "USER" | "ADMIN";

  isVerified: boolean;
  isActive: boolean;

  stripeAccountId: string | null;

  bio: string;
  address: UserAddress;

  otp: string | null;
  otpExpires: string | null;
  otpVerified: boolean;
  resetExpires: string | null;

  refreshToken: string;

  hasActiveSubscription: boolean;
  subscriptionExpireDate: string | null;

  blockedUsers: string[];
  language: string;

  facebookPages: FacebookPage[];
  facebookBusinesses: FacebookBusiness[];

  subscriptionPlanId: SubscriptionPlan | null;

  createdAt: string;
  updatedAt: string;
}


// Pagination interface
export interface PaginationInfo {
  currentPage: number;
  totalPages: number;
  totalData: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
}

// Data interface containing users and pagination
export interface UsersData {
  users: User[];
  paginationInfo: PaginationInfo;
}

// Main API response interface
export interface ApiResponse {
  status: boolean;
  message: string;
  data: UsersData;
}

// Specific interface for users API response
export interface UsersApiResponse extends ApiResponse {
  data: UsersData;
}

// For paginated queries
export interface PaginatedUsersResponse {
  status: boolean;
  message: string;
  data: {
    users: User[];
    paginationInfo: PaginationInfo;
  };
}

// For user updates
export type UserUpdate = Partial<User>;

// For creating new users
export type UserCreate = Omit<User, '_id' | 'createdAt' | 'updatedAt'> & {
  _id?: string;
  createdAt?: string;
  updatedAt?: string;
};

// For filtering users
export interface UserFilters {
  role?: User['role'];
  isVerified?: boolean;
  isActive?: boolean;
  search?: string;
  email?: string;
  phoneNumber?: string;
  // Add other filterable fields as needed
}

// For sorting users
export interface UserSortOptions {
  field: keyof User;
  order: 'asc' | 'desc';
}

// Example usage types
export interface UserListParams {
  page?: number;
  limit?: number;
  filters?: UserFilters;
  sort?: UserSortOptions;
}

// Additional useful exports
export type UserRole = User['role'];

export interface SimplifiedUser {
  _id: string;
  name: string;
  email: string;
  role: UserRole;
  profilePhoto: string;
  isActive: boolean;
}

// Export constants if needed
export const USER_ROLES = {
  USER: 'USER',
  ADMIN: 'ADMIN'
} as const;

export const DEFAULT_PAGINATION: PaginationInfo = {
  currentPage: 1,
  totalPages: 1,
  totalData: 0,
  hasNextPage: false,
  hasPrevPage: false
};