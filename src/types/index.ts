import { ColumnDef, Row } from "@tanstack/react-table";

type UserDetails = {
  email?: string;
  name?: string;
  createdAt?: Date;
  guestId?: string;
  isHuman: boolean;
  isPro?: boolean;
  picture?: string;
};
export type User = UserDetails | null;
export type UserState = {
  user: User | null;
  isLoggedIn: boolean;
  isLoading: boolean;
  isError: boolean;
  error: string | null;
};
export type URLData = {
  id: string;
  fullUrl: string;
  short: string;
  clicks: number;
  createdAt: Date;
  lastClicked: number;
};

export type TableProps = {
  data: URLData[];
  columns: ColumnDef<URLData>[];
  isLoading?: boolean;
  isError?: boolean;
  error?: string;
  pageCount?: number;
  pageIndex?: number;
  pageSize?: number;
  hasPreviousPage?: boolean;
  hasNextPage?: boolean;
  onPageChange?: (pageIndex: number) => void;
  onPageSizeChange?: (pageSize: number) => void;
  onSortChange?: (columnId: string, direction: "asc" | "desc") => void;
  handleNextPage: () => void;
  handlePreviousPage: () => void;
  handleTriggerFetch?: () => void;
};

export type ShortURLCellProps = {
  row: Row<URLData>;
  value: string;
  accessorKey: "fullUrl" | "short";
  header: string;
};

export type Register = {
  email: string;
  password: string;
  handleOnEmailChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleOnPasswordChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleOnSubmit: () => void;
  isSubmitDisabled: boolean;
  googleOAuthLogin?: () => void;
};

export type GoogleOAuthCodeResponse = {
  code: string;
  [key: string]: unknown;
};

export type URLFormState = {
  url: string;
  alias: string;
};

export interface ShortnerProps {
  handleShortenLink: () => void;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  formState: URLFormState;
}

export type ApiError = {
  response?: {
    data?: {
      message?: string;
      error?: string;
    };
    status?: number;
  };
  message?: string;
};
